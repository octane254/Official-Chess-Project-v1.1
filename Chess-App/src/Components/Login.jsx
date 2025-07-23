import { useState } from "react";
import "../Css/Login.css";
import chessImage from "../assets/wp (1).png";

function Login({ onStart }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleStart = () => {
    if (name.trim() === "") {
      alert("Please enter your name");
      return;
    }
    if (email.trim() === "") {
      alert("Please enter your email");
      return;
    }
    onStart({ name: name.trim(), email: email.trim() });
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <img src={chessImage} alt="Chess" />
        <div className="login-title">Mchezo wa Sataranji</div>
        <label className="login-label" htmlFor="name">Jina</label>
        <input
          id="name"
          className="login-input"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Andika jina lako"
        />
        <label className="login-label" htmlFor="email">Barua Pepe</label>
        <input
          id="email"
          className="login-input"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Andika Barua Pepe lako"
        />
        <button className="login-button" onClick={handleStart}>
          CHEZA !  
        </button>
      </div>
    </div>
  );
}

export default Login;
