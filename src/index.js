import React from 'react';
import ReactDOM from 'react-dom';
import './style.css';
import App from '../src/App';
import { APP_ID, APP_REGION, AUTH_KEY }  from './Config/Config';
import { CometChat } from '@cometchat-pro/chat';
import reportWebVitals from './reportWebVitals';
import { constants } from 'buffer';
// import {BrowserRouter} from 'react-router-dom';

const appSetting = new CometChat.AppSettingsBuilder()
                    .subscribePresenceForAllUsers()
                    .setRegion(APP_REGION)
                    .autoEstablishSocketConnection(true)
                    .build();
CometChat.init(APP_ID, appSetting).then(
  () => {
    console.log("Initialization completed successfully");
    
    ReactDOM.render(
      <App />
      ,
    document.getElementById('root')
  );
  },
   error => {
    console.log("Initialization failed with error:", error);
  }
);



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
