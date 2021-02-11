import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyBFNE9XEdWjyBjIEJyliGboOZ1yW6lbfXY",
  authDomain: "messenger-d0f45.firebaseapp.com",
  databaseURL: "https://messenger-d0f45.firebaseio.com",
  projectId: "messenger-d0f45",
  storageBucket: "messenger-d0f45.appspot.com",
  messagingSenderId: "782749177312",
  appId: "1:782749177312:web:3662787f9eb646770c4785",
});

const db = firebaseApp.firestore();

export default db;
