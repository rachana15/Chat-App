import React, { useEffect } from "react";
import firebase from "firebase";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import Message from "./components/Message";
import { selectUser, login, logout } from "./features/userSlice";
import Login from "./components/Login";
import { auth } from "firebase";

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  useEffect(() => {
    firebase.auth().onAuthStateChanged(function(authUser) {
      if (authUser) {
        //user loggd in
        dispatch(
          login({
            uid: authUser.uid,
            photo: authUser.photoURL,
            email: authUser.email,
            displayName: authUser.displayName
          })
        );
      } else {
        //user logged out
        dispatch(logout());
      }
    });
  }, []);
  return <div className="App">{user ? <Message /> : <Login />}</div>;
}

export default App;
