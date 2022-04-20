import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, db, logout } from "../src/Config/Config";
import { query, collection, getDocs, where } from "firebase/firestore";
import {CometChatUI} from "../src/cometchat-pro-react-ui-kit/CometChatWorkspace/src";
import { CometChat } from '@cometchat-pro/chat';

function Dashboard() {
  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const fetchUserName = async () => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();
      setName(data.name);
    } catch (err) {
      console.error(err);
      alert("An error occured while fetching user data");
    }
  };

  // const logoutuser = async () => {
  //   CometChat.logout().then(user=>{
  //       setUser(null)
  //       setLoggedIn(false)
  //       navigate("/");
  //   });  
  // }
  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");
    fetchUserName();
  }, [user, loading]);
  return (
    <div className="login-main display-chat">
       <div className=" dashbrd bs-brd">
          <br></br>
          <br></br>
         {/* <div className ="new-sign">{name}</div>
         <div>{user?.email}</div> */}
         {/* <button className="logout-btn" onClick={ () => {logout(); }}>
          Logout
         </button> */}
         <div className = "dashbrd-chat">
         <CometChatUI/>
        </div>
     </div>
     </div>
  );
}
export default Dashboard;