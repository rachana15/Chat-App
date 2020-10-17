import React from "react";
import { Button } from "@material-ui/core";
import { auth, provider } from "../firebase";
import "../style/css/Login.css";

function Login() {
  const signIn = () => {
    auth.signInWithPopup(provider).catch(error => {
      alert(error.message);
    });
  };
  return (
    <div className="login">
      <div className="login__logo">
        <img
          src="https://www.pngitem.com/pimgs/m/81-818138_voice-bubble-png-bubble-chat-talk-conversation-line.png"
          alt=""
        />
        <h1>Chat App</h1>
      </div>
      <Button onClick={signIn}>Sign In</Button>
    </div>
  );
}

export default Login;
