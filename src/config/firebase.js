import firebase from "firebase/app";
import "firebase/database";

//import { FirebaseConfig } from "../config/keys";
const FirebaseConfig = {
  apiKey: "AIzaSyA7Edvrc0vHwlYmsP-68LrlD0Kcl6B87oY",
  authDomain: "kahootz-game.firebaseio.com",
  databaseURL: "https://kahootz-game.firebaseio.com"
};
firebase.initializeApp(FirebaseConfig);

const databaseRef = firebase.database().ref();

export const gamesRef = databaseRef.child("games");
// export const imagesRef = databaseRef.child("images");

export const newFirebaseId = databaseRef.push().key;
