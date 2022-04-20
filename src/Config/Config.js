// import firebase from 'firebase/compat/app';
// import 'firebase/compat/auth'
// import 'firebase/compat/firestore'
// import 'firebase/compat/storage'

import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCkVyXuqs4yaFTrl1j0vRgtex0yk8A-J4A",
  authDomain: "chat-app-993f8.firebaseapp.com",
  databaseURL: "https://chat-app-993f8-default-rtdb.firebaseio.com",
  projectId: "chat-app-993f8",
  storageBucket: "chat-app-993f8.appspot.com",
  messagingSenderId: "1059462957385",
  appId: "1:1059462957385:web:6455ccb956267473563298",
  measurementId: "G-8N3JLD33TW",
  appId: "206962cfbce2d25f",
  capiKey: "7dd63479bb7e99587492c1f61216e971ae4e98dc",
  WidgetId: "a697e999-93da-4d16-881b-0f035f09de0e",
  appRegion:"us",
  authKey: "267cc073b54a596d53f40a7e13f6a4b58e8f604a",

};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const googleProvider = new GoogleAuthProvider();

const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        username: user.displayName,
        authProvider: "google",
        email: user.email,
      });
    }
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const logInWithEmailAndPassword = async ( email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const registerWithEmailAndPassword = async (username, fullname, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      username,
      fullname,
      authProvider: "local",
      email,
    });
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset link sent!");
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const logout = () => {
  try{
  signOut(auth);
  console.log("logout successfull!")
  }
  catch {
    console.log("logout failed")
  }
};

const APP_ID = "2073599d4404aad2"
const APP_REGION = "us"
const AUTH_KEY = "eb413aeea51e0d272e1e47714dcd58ffc1f18b3d"
export {
  auth,
  db,
  signInWithGoogle,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  logout,
  APP_ID,
  APP_REGION,
  AUTH_KEY
};
