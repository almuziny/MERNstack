import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route} from "react-router-dom";
import Axios from "axios";

import './App.css';
import "bootstrap/dist/css/bootstrap.min.css"

import HeaderBar from "./components/HeaderBar.component";
import LogIn from "./components/LogIn.component";
import SingUp from "./components/SingUp.component";
import UploadProduct from "./components/UploadProduct.component";

import UserContext from "./context/UserContext";


function App() {
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  });

  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem("auth-token");
      if (token === null) {
        localStorage.setItem("auth-token", "");
        token = "";
      }
      const tokenRes = await Axios.post(
        "http://localhost:5000/account/tokenIsValid",
        null,
        { headers: { "x-auth-token": token } }
      );
      if (tokenRes.data) {
        const userRes = await Axios.get("http://localhost:5000/account/getUser", {
          headers: { "x-auth-token": token },
        });
        setUserData({
          token,
          user: userRes.data,
        });
      }
    };

    checkLoggedIn();
  }, []);
  
  
  return (
    <Router>
      <UserContext.Provider value={{ userData, setUserData }}>
      <HeaderBar />
      <br/>
      <UploadProduct />
      <Route exact path="/" />
      <Route path="/log-in" component={LogIn} />
      <Route path="/sing-up" component={SingUp} />
      </UserContext.Provider>
    </Router>
  );
 };

export default App;
