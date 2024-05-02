import React, { useEffect, useState } from "react";
import axios from "axios";
import Modal from "./Modal";
import Navbar from "./Navbar";
import "./Challenges.css";
import { loadBlockchainData, loadWeb3 } from "../Web3helpers";

function Challenges() {
  const [formData, setFormData] = useState({
    challengeName: "",
    challengeDescription: "",
    flag: "",
    file: null,
    points: 0
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [challenges, setChallenges] = useState([]);
  const [accounts, setAccounts] = React.useState(null);
  const [auth, setAuth] = React.useState(null);
  const [addChalAccess, setAddChalAccess] = useState("");
  const [flagSubmit, setFlagSubmit] = useState("");

  const loadChallenges = async () => {
    let { auth, accounts } = await loadBlockchainData();
    setAccounts(accounts);
    setAuth(auth);
  };

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    setAddChalAccess(storedUsername);
  })

  useEffect(() => {
    fetchChallenges();
    loadWeb3();
    loadChallenges();
  }, []);

  const fetchChallenges = async () => {
    try {
      const response = await axios.get('http://localhost:5000/challenges');
      setChallenges(response.data);
    }
    catch (error) {
      console.error("Error Fetching Challenges", error)
    }
  }

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    console.log(formData);
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      file: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("challengeName", formData.challengeName);
    formDataToSend.append(
      "challengeDescription",
      formData.challengeDescription
    );
    formDataToSend.append("file", formData.file);
    formDataToSend.append("points", formData.points)

    try {
      const res = await axios.post(
        "http://localhost:5000/submit",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(res.data);
      closeModal();
    } catch (error) {
      console.error(error);
    }
  };

  function downloadFile(url) {
    const anchor = document.createElement('a');
    anchor.style.display = 'none';
    document.body.appendChild(anchor);
    anchor.href = url;
    anchor.setAttribute('download', '');
    anchor.click();
    document.body.removeChild(anchor);
  }

  const handleFlagSubmit = async () => {
    try {
      // Ensure that all required fields are filled
      if (!formData.challengeName || !formData.flag || !formData.points) {
        console.error("Please fill all details");
        return;
      }
  
      // Send transaction to store challenge information on blockchain
      await auth.methods.saveFlag(
        formData.challengeName,
        formData.flag,
        formData.points
      ).send({ from: accounts });
  
      console.log("Challenge data stored on blockchain successfully");
  
      // Optionally, clear the form fields after successful submission
      setFormData({
        challengeName: "",
        challengeDescription: "",
        flag: "",
        file: null,
        points: 0
      });
    } catch (error) {
      console.error("Error storing challenge data on blockchain:", error);
    }
  };

  const handleFlagSubmission = async (challengeName) => {
    try {
      const res = await auth.methods.challenges(challengeName).call();
      console.log("Response from blockchain " + res);
      console.log("Flag from blockchain " + res.flag);
      console.log("Submitted flag " + flagSubmit);

      if (res.flag === flagSubmit){
        console.log(true + "Flag matched");
      } else {
        console.log(false + "Flag not matched");
      }
    } catch (error) {
      console.log(error);
    }
  }

  const deleteChallenge = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/challenge/${id}`);
      // After successful deletion, fetch the updated list of challenges
      fetchChallenges();
    } catch (error) {
      console.error("Error deleting challenge", error);
    }
  };

  return (
    <div>
      <Navbar />
      {addChalAccess == "user1" && 
      <button className="Add-Challenge-Button" onClick={openModal}>
        Add Challenge
      </button>}
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <div>
          <h2>Add Challenge</h2>
        </div>
        <form className="challenge-form">
          <div className="form-group">
            <label htmlFor="challengeName">Challenge Name</label>
            <input
              type="text"
              id="challengeName"
              name="challengeName"
              placeholder="Enter Challenge Name"
              value={formData.challengeName}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="challengeDescription">Challenge Description</label>
            <textarea
              id="challengeDescription"
              name="challengeDescription"
              placeholder="Enter Challenge Description"
              value={formData.challengeDescription}
              onChange={handleChange}
              className="form-control"
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="file">Upload File</label>
            <input
              type="file"
              id="file"
              name="file"
              onChange={handleFileChange}
              className="form-control-file"
            />
          </div>
          <div className="form-group">
            <label htmlFor="flag">Flag</label>
            <input
              type="text"
              id="flag"
              name="flag"
              placeholder="Enter Flag"
              value={formData.flag}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="points">Points</label>
            <input
              type="number"
              id="points"
              name="points"
              placeholder="Enter points"
              value={formData.points}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="submit-buttons">
            <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
              Submit Challenge
            </button>
            <button className="btn btn-primary" onClick={handleFlagSubmit}>
              Submit Flag
            </button>
          </div>
        </form>
      </Modal>

      <div className="show-challenges">
        {challenges.map((challenge, index) => (
          <div key={index} className="challenge">
            <h3>{challenge.name}</h3>
            <h3>{challenge.points}</h3>
            <p>{challenge.description}</p>
            {
              challenge.file_path && (
                <button onClick={() => {downloadFile(`http://localhost:5000/${challenge.file_path}`); }}>Download File</button>
              )
            }
             {addChalAccess == "user1" && <button onClick={() => deleteChallenge(challenge.id)}>Delete Challenge</button>}
            <input type="text" className="input-flag" placeholder="Enter Flag" onChange={(event) => (setFlagSubmit(event.target.value))}></input>
            <button onClick={() => handleFlagSubmission(challenge.name)}>Submit</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Challenges;
