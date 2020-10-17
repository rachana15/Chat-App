// import firebase from "firebase";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDbozLE_zrtwpTpT8yMOsawGTlyXTOSC0w",
  authDomain: "chat-app-7e607.firebaseapp.com",
  databaseURL: "https://chat-app-7e607.firebaseio.com",
  projectId: "chat-app-7e607",
  storageBucket: "chat-app-7e607.appspot.com",
  messagingSenderId: "334552605849",
  appId: "1:334552605849:web:2e2dc6f78319969b818408"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
