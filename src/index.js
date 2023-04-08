import React from 'react';
import  { render, hydrate } from 'react-dom';
import { Workbox } from "workbox-window";

import App from './App';
import {
  BrowserRouter as Router,
} from "react-router-dom";


import {getApps,initializeApp} from 'firebase/app'
import {getAnalytics} from 'firebase/analytics'
import { AuthProvider } from "./components/signUp/authMethods/authentication";
// import * as serviceWorker from './serviceWorker';

import ScrollToTop from './pages/customAnimation/scrollToTop';
import {  getFirestore,  } from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyChASA7zgr-MewOuIu6DZ5cpz9qv4qywqs",
  authDomain: "vast-fuze-89905.firebaseapp.com",
  databaseURL: "https://vast-fuze-89905.firebaseio.com",
  projectId: "vast-fuze-89905",
  storageBucket: "vast-fuze-89905.appspot.com",
  messagingSenderId: "1049611304727",
  appId: "1:1049611304727:web:4d5771338fdf376d73c152",
  measurementId: "G-3DPSR9S8Z9"
};

if(getApps().length === 0){
 
  initializeApp(firebaseConfig);
  getAnalytics();

  


getFirestore(initializeApp(firebaseConfig));
 
  
}




const rootElement = document.getElementById("root");
if (rootElement.hasChildNodes()) {
  hydrate(<React.StrictMode>
    <Router basename='/'>
      <AuthProvider>
        <ScrollToTop />
        <App />
      </AuthProvider>
    </Router>
  </React.StrictMode>, rootElement);
} else {
  render(<React.StrictMode> 


    <Router basename='/'>
      <AuthProvider>
        <ScrollToTop />
        <App />
      </AuthProvider>
    </Router>
  </React.StrictMode>, rootElement);
}
if (module.hot) { // enables hot module replacement if plugin is installed
  module.hot.accept();
 }

 if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
      const wb = new Workbox("/sw.js");
    
wb.register();
  });

}


