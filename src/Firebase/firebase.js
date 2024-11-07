import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCLYLbIxdT60MhVT_cVh8THbGggGzDN4Tc",
  authDomain: "ticket-master-40fe2.firebaseapp.com",
  projectId: "ticket-master-40fe2",
  storageBucket: "ticket-master-40fe2.firebasestorage.app",
  messagingSenderId: "555057561958",
  appId: "1:555057561958:web:a7dece5f1274e2e731c8a7",
  measurementId: "G-107HJKKSK4"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app)


export { app, auth }; 