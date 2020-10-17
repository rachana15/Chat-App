import React, { forwardRef } from "react";
import "../style/css/Text.css";
import { Avatar } from "@material-ui/core";
import { selectUser } from "../features/userSlice";
import { useSelector } from "react-redux";

const Text = forwardRef(
  (
    { id, contents: { timestamp, uid, photo, message, email, displayName } },
    ref
  ) => {
    const user = useSelector(selectUser);
    return (
      <div
        ref={ref}
        className={`text ${user.email === email && "text__sender"}`}
      >
        <Avatar src={photo} className="text__photo" />
        <p>{message}</p>
        <small>{new Date(timestamp?.toDate()).toLocaleString()}</small>
      </div>
    );
  }
);

export default Text;
