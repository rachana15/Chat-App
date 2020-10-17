import React, { useState, useEffect } from "react";
import "../style/css/Sidebar.css";
import { Avatar, IconButton } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import RateReviewOutlinedIcon from "@material-ui/icons/RateReviewOutlined";
import SidebarChat from "./SidebarChat";
import { selectUser } from "../features/userSlice";
import { useSelector } from "react-redux";
import db, { auth } from "../firebase";
import firebase from "firebase";

function Sidebar() {
  const user = useSelector(selectUser);
  const [chats, setChats] = useState([]);
  console.log(chats);
  useEffect(() => {
    db.collection("chats")
    .onSnapshot(snapshot =>
      setChats(
        snapshot.docs.map(doc => ({
          id: doc.id,
          data: doc.data()
        }))
      )
    );
  }, []);
  const addChat = () => {
    var chatName = prompt("Enter a Chat Name: ");
    console.log(chatName);
    if (chatName) {
      db.collection("chats").add({
        chatName: chatName
      });
    }
  };
  console.log(chats);
  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <Avatar
          onClick={() => auth.signOut()}
          src={user.photo}
          className="sidebar__avatar"
        />
        <div className="sidebar__input">
          <SearchIcon />
          <input placeholder="search" />
        </div>
        <IconButton
          varient="outlined"
          className="sidebar__inputButton"
          onClick={addChat}
        >
          <RateReviewOutlinedIcon />
        </IconButton>
      </div>
      <div className="sidebar__chat">
        {chats.map(({ id, data: { chatName } }) => (
          <SidebarChat key={id} id={id} chatName={chatName} />
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
