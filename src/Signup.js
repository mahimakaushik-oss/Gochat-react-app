import React, {useEffect, useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import {getAuth, createUserWithEmailAndPassword} from "../src/Config/";
import {useAuthState} from 'react-firebase-hooks/auth';
import {auth, 
        registerWithEmailAndPassword,
        signInWithGoogle,
        } from "./Config/Config.js";

import { CometChat } from '@cometchat-pro/chat';
import { AUTH_KEY } from './Config/Config.js';

const Signup = () => {

    
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [fullname, setFullname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user, loading, error] = useAuthState(auth);

    const handleSignup = () =>{
        if (!username) alert("Please enter name");
        registerWithEmailAndPassword(username,fullname, email, password); 
    };

    const username1 = new CometChat.User(username);
    username1.setName(fullname);
    const userReg = () => {
        try{
        CometChat.createUser(username1, AUTH_KEY).then(
            username1 => {
                alert("user created", username1);
            }
            // , error =>{
            //     alert("error", error);
            // }
        )
        }
     catch(err) {
        console.error(err);
        alert(err.message);
      }
    }


    // useEffect(() => {
    //     if (loading) return;
    //     if (user) navigate("/signup");
    // }, [user, loading]);


  return (
    <>
       
        <div className = " singup-main ">
        
            <div className= " sign-frm login-form">
            <span className = "head-form">SignUp</span>
                <div >
                    <input type = "text" className='login-parts' value = {username} onChange = {(e) => setUsername(e.target.value)} name = "username" placeholder ="  Enter Username" />
                    <input type = "text" className='login-parts' value = {fullname} onChange = {(e) => setFullname(e.target.value)} name = "Fullname" placeholder ="  Enter Fullname" />
                    <input type = "text" className ="login-parts" name = "mail" value = {email} onChange = {(e) => setEmail(e.target.value)} placeholder='   Enter Email'/>
                    <input type = "password" className ="login-parts login-pwd" name = "password" value = {password} onChange = {(e) => setPassword(e.target.value)} placeholder='   Enter Password'/> 
                    <br></br>
                    <br></br>
                    <button  className = "login-parts" onClick={ () => {handleSignup(); userReg();}}>Register</button>
                    <button  className = "login-parts" onClick={signInWithGoogle}>Register with google</button>
                    </div>
                    <span className = "new-sign">Already have account?
                    <Link to ="/login" className="reg-link">  login</Link></span>
                </div>
            </div>
            
            
    </>
  );
}

export default Signup;