import React, { useState, useEffect } from "react";
import "../style/css/Chat.css";
import { IconButton } from "@material-ui/core";
import MicIcon from "@material-ui/icons/Mic";
import Text from "./Text";
import { selectChatName, selectChatId } from "../features/chatSlice";
import { useSelector } from "react-redux";
import db from "../firebase";
import firebase from "firebase";
import { selectUser } from "../features/userSlice";
import FlipMove from "react-flip-move";

function Chat() {
  const [input, setInput] = useState("");
  const channelName = useSelector(selectChatName);
  const chatId = useSelector(selectChatId);
  const [messages, setMessages] = useState([]);
  const user = useSelector(selectUser);

  const sendMessage = e => {
    e.preventDefault();
    db.collection("chats")
      .doc(chatId)
      .collection("messages")
      .add({
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        message: input,
        uid: user.uid,
        photo: user.photo,
        email: user.email,
        displayName: user.displayName
      });
    setInput("");
  };
  useEffect(() => {
    if (chatId) {
      db.collection("chats")
        .doc(chatId)
        .collection("messages")
        .orderBy("timestamp", "desc")
        .onSnapshot(snapshot =>
          setMessages(
            snapshot.docs.map(doc => ({
              id: chatId,
              data: doc.data()
            }))
          )
        );
    }
  }, [chatId]);

  return (
    <div className="chat">
      <div className="chat__header">
        <h4>
          Channel Name: <span className="chat__name">{channelName}</span>
        </h4>
        <strong>Details</strong>
      </div>
      <div className="chat__messages">
        <FlipMove>
          {messages.map(({ id, data }) => (
            <Text key={id} contents={data} />
          ))}
        </FlipMove>
      </div>
      <div className="chat__input">
        <form>
          <input
            type="text"
            placeholder="Send Message"
            value={input}
            onChange={e => setInput(e.target.value)}
          />
          <button className="buttons__hidden" onClick={sendMessage}>
            Search
          </button>
        </form>
        <IconButton>
          <MicIcon />
        </IconButton>
      </div>
    </div>
  );
}

export default Chat;
