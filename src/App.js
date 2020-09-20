import React from 'react';
import { BrowserRouter as Router, Route} from "react-router-dom"; 
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css"

import HeaderBar from "./components/HeaderBar.component";
import LogIn from "./components/LogIn.component";
import SingUp from "./components/SingUp.component";

function App() {
  return (
    <Router>
      <HeaderBar />
      <br/>
      <Route path="/log-in" component={LogIn} />
      <Route path="/sing-up" component={SingUp} />
    </Router>
  );
 };

export default App;
