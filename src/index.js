import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {
  BrowserRouter as Router,
} from "react-router-dom";
import firebase from "firebase/app";
import 'firebase/analytics'
import { AuthProvider } from "./components/signUp/authMethods/authentication";
import * as serviceWorker from './serviceWorker';

import ScrollToTop from './pages/customAnimation/scrollToTop';

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


if (!firebase.apps.length) {

  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
}

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <AuthProvider>
        <ScrollToTop />
        <App />
      </AuthProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
serviceWorker.register();