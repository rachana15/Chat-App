import React from "react";
import "../style/css/Message.css";
import Sidebar from "./Sidebar";
import Chat from "./Chat";
function Message() {
  return (
    <div className="message">
      <Sidebar />
      <Chat />
    </div>
  );
}

export default Message;
