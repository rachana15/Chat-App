import React, { useEffect, useState } from "react";
import "../style/css/SidebarChat.css";
import { Avatar } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { setChat } from "../features/chatSlice";
import db from "../firebase";
import FlipMove from "react-flip-move";
import * as timeago from "timeago.js";

function SidebarChat({ id, chatName }) {
  const dispatch = useDispatch();
  const [chatInfo, setChatInfo] = useState([]);
  useEffect(() => {
    db.collection("chats")
      .doc(id)
      .collection("messages")
      .orderBy("timestamp", "desc")
      .onSnapshot(snapshot =>
        setChatInfo(snapshot.docs.map(doc => doc.data()))
      );
  }, [id]);
  return (
    <div
      onClick={() => {
        dispatch(
          setChat({
            chatId: id,
            chatName: chatName
          })
        );
      }}
      className="sidebarChat"
    >
      <Avatar className="sidebarChat__Avatar" />
      <div className="sidebarChat__info">
        <h3>{chatName}</h3>
        <p>{chatInfo[0]?.message}</p>
        <small>
          {timeago.format(
            new Date(chatInfo[0]?.timestamp?.toDate()).toLocaleString()
          )}
        </small>
      </div>
    </div>
  );
}

export default SidebarChat;
