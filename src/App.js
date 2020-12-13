import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route} from "react-router-dom";
import Axios from "axios";

import './App.css';
import "bootstrap/dist/css/bootstrap.min.css"

import HomePage from "./components/HomePage.component";
import HeaderBar from "./components/HeaderBar.component";
import LogIn from "./components/LogIn.component";
import SingUp from "./components/SingUp.component";
import UploadProduct from "./components/UploadProduct.component";
import ProductPage from "./components/ProductPage.component";
import DetailProductPage from './components/DetailProductPage/DetailProductPage.component';
import DiscussionsIndex from './components/Discussions/DiscussionsIndex.component';
import UserContext from "./context/UserContext";
import CartPage from "./components/CartPage/CartPage.component";
import Footer from "./components/Footer.component";

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
      <React.StrictMode>
      <Route exact path="/" component={HomePage}/>
      <Route path="/Productpage" component={ProductPage}/>
      <Route path="/UploadProduct" component={UploadProduct}/>
      <Route path="/log-in" component={LogIn}/>
      <Route path="/sing-up" component={SingUp}/>
      <Route path="/product/:productId" component={DetailProductPage} />
      <Route path="/Discussions" component={DiscussionsIndex} />
      <Route path="/Cart" component={CartPage} />
      </React.StrictMode>
      <br/>
      <br/>
      <Footer />
      </UserContext.Provider>
    </Router>
  );
 };

export default App;
