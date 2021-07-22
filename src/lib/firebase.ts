import Firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBy9E20bP8J3cUPJ3ToqcLZxc289z6Bn6U",
  authDomain: "todolist-7e8ab.firebaseapp.com",
  databaseURL: "https://todolist-7e8ab-default-rtdb.firebaseio.com",
  projectId: "todolist-7e8ab",
  storageBucket: "todolist-7e8ab.appspot.com",
  messagingSenderId: "794149330635",
  appId: "1:794149330635:web:d6002c6580484a0de0054e",
  measurementId: "G-7PG110CMEN",
};

export const firebase = Firebase.initializeApp(firebaseConfig);
