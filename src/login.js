import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {auth, logInWithEmailAndPassword, signInWithGoogle} from "../src/Config/Config.js";
import { useAuthState } from 'react-firebase-hooks/auth';
import { CometChat } from '@cometchat-pro/chat';
import { AUTH_KEY } from '../src/Config/Config.js';
const Login = () => {

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const[user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  // const uid = user
  const userLogin = () => {
    try{
    
          CometChat.login(username, AUTH_KEY).then(
            user => {
              console.log("Login Successful:", {user});
            }, error => {
              console.log("login failed with exception:", {error});
            }
          );
        
  }
  catch(err) {
    console.error(err);
    alert(err.message);
  }
}

  useEffect(() => {
    if (loading) return;
    if (user) navigate("/dashboard");
}, [user, loading]);

  return (
    <>
        <div className = "login-main">
            <div className= "login-form">
            <span className = "head-form">Login</span>
  
            <input type = "text" className ="login-parts" name = "username" value = {username} onChange ={(e) => setUsername(e.target.value)} placeholder='   Enter Username'/>
                    <input type = "text" className ="login-parts" name = "mail" value = {email} onChange ={(e) => setEmail(e.target.value)} placeholder='   Enter Email'/>
                    <input type = "password" className ="login-parts login-pwd" name = "password" value = {password} onChange ={(e) => setPassword(e.target.value)} placeholder='   Enter Password'/> 
                    <br></br>
                    <br></br>
                    <button  className = "login-parts" onClick={() => {logInWithEmailAndPassword(email, password); userLogin();}}>Login</button>
                    <button  className = "login-parts" onClick={signInWithGoogle}>Login with Google</button>
                    <div>
                      <Link to = "/reset" className ="reg-link frgt-pwd">Forgot Password?</Link>
                    </div>
                    <span className="new-sign">New to GoChat? 
                    <Link  to = "/signup" className = "reg-link"> Register</Link></span>
             </div>
        </div>
    </>
  )
}

export default Login;