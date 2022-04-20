import React, {useEffect, useState} from 'react';
// import '../src/style.css';
import { Link } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';

import { useNavigate } from 'react-router';
import { auth, db, logout } from "../src/Config/Config";
import { query, collection, getDocs, where } from "firebase/firestore";
import {CometChatUI} from "../src/cometchat-pro-react-ui-kit/CometChatWorkspace/src";
import { CometChat } from '@cometchat-pro/chat';

const Navbar = () => {
  const [user, loading, error] = useAuthState(auth);
  const [username,setUsername ] = useState("");
  const navigate = useNavigate();

  const fetchUserName = async () => {
    try{
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();
      setUsername(data.username);
    }
    catch (err) {
        console.log("An error occured while fetching user data");
    }
  };

  const usern = user?.username;
  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");
    fetchUserName();
  }, [user, loading]);

  return (
    <>
        <div className ="navbar">
            <ul>
                <li className="l1"><a href = "#home"><Link to = "/">Home</Link></a></li>
                <li className="l2"><a href = "#dashboard"><Link to = "/dashboard">Dashboard</Link></a></li>
                <li className="l3"><a href = "#logoname">GoChat</a></li>
                {/* <li className="l5"><a href = "#about">About</a></li> */}
                {!user&&<>
                  <li className="l4"><a href = "#logout"><Link to = "/login">Login</Link></a></li>
                </>}
                 
                 {user&&<>
                  <li className ="new-sign"><a href = "#username">{username}</a></li>
         {/* <div>{user?.email}</div> */}
                   <li className='l6 usernamep'>{user?.username}</li>
                   <li className = "l4"
                   onClick={ () => {logout(); }}><a href ="#logout">
                   Logout
                   </a></li>
                 </>}
                
            </ul>
            
        </div>
        
    </>
  )
}

export default Navbar;