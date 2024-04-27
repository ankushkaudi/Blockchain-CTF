import React, { useEffect, useState } from "react";
import axios from "axios";
import Modal from "./Modal";
import Navbar from "./Navbar";
import "./Challenges.css";

function Challenges() {
  const [formData, setFormData] = useState({
    challengeName: "",
    challengeDescription: "",
    flag: "",
    file: null,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [challenges, setChallenges] = useState([]);

  useEffect(() => {
    fetchChallenges();
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
    formDataToSend.append("flag", formData.flag);
    formDataToSend.append("file", formData.file);

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
      // Close the modal after submission
      closeModal();
    } catch (err) {
      console.error(err);
    }
  };

  function downloadFile(url) {
    // Create a temporary anchor element
    const anchor = document.createElement('a');
    anchor.style.display = 'none';
    document.body.appendChild(anchor);
  
    // Set the href attribute to the file URL
    anchor.href = url;
  
    // Set the download attribute to force download
    anchor.setAttribute('download', '');
  
    // Trigger a click event on the anchor element
    anchor.click();
  
    // Cleanup: remove the temporary anchor element
    document.body.removeChild(anchor);
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
      <button className="Add-Challenge-Button" onClick={openModal}>
        Add Challenge
      </button>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <div>
          <h2>Add Challenge</h2>
        </div>
        <form onSubmit={handleSubmit} className="challenge-form">
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
          <div className="submit-buttons">
            <button type="submit" className="btn btn-primary">
              Submit Challenge
            </button>
            <button className="btn btn-primary">
              Submit Flag
            </button>
          </div>
        </form>
      </Modal>

      <div className="show-challenges">
        {challenges.map((challenge, index) => (
          <div key={index} className="challenge">
            <h3>{challenge.name}</h3>
            <p>{challenge.description}</p>
            {
              challenge.file_path && (
                <button onClick={() => {downloadFile(`http://localhost:5000/${challenge.file_path}`); }}>Download File</button>
              )
            }
             <button onClick={() => deleteChallenge(challenge.id)}>Delete Challenge</button>
            <input type="text" className="input-flag" placeholder="Enter Flag"></input>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Challenges;
