import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

export default function Home() {
  const email = localStorage.getItem("email");
  const account = localStorage.getItem("account");

  const navigate = useNavigate();
  return (
    <div>
      <Navbar />
      <h2>Welcome to CTF</h2>
      <h3>Your account: {account} </h3>
      <h3>Your email: {email} </h3>
      <button
        style={button}
        onClick={() => {
          localStorage.removeItem("email");
          localStorage.removeItem("account");
          localStorage.removeItem("username")
          window.location.reload();
        }}
      >
        {" "}
        Log out
      </button>
    </div>
  );
}
const button = {
  width: 100,
  padding: 10,
  borderRadius: 5,
  margin: 10,
  cursor: "pointer",
  fontSize: 17,
  color: "white",
  backgroundColor: "#007bff",
  border: "none",
};
