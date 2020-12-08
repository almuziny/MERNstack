import React, { useState, useContext }  from 'react';
import { useHistory } from "react-router-dom";
import '../App.css';
import axios from 'axios';
import UserContext from "../context/UserContext";

export default function LogIn() {
    console.log("1 run plase");
    const [Email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState();

    const { setUserData } = useContext(UserContext);
    const history = useHistory();

    const submit = async (e) => {
        e.preventDefault();
        try {
          const loginUser = { Email, password };
          const loginRes = await axios.post(
            "http://localhost:5000/account/log-in",
            loginUser
          );
          setUserData({
            token: loginRes.data.token,
            user: loginRes.data.user,
          });
          localStorage.setItem("auth-token", loginRes.data.token);
          history.push("/");
        } catch (err) {
          err.response.data.msg && setError(err.response.data.msg);
          console.log(error);
        }
      };
    


        return (
            <div class="box">
                <form onSubmit={submit}>
                    <div class="form-group">
                        <label htmlFor="exampleInputEmail1" >Email address</label>
                        <input 
                            type="Email" 
                            class="form-control" 
                            id="exampleInputEmail1" aria-describedby="EmailHelp"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <small id="EmailHelp" class="form-text text-muted">We'll never share your Email with anyone else.</small>
                    </div>

                    <div class="form-group">
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input 
                            type="password" 
                            class="form-control" 
                            id="exampleInputPassword1" 
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    
                    <button
                      type="submit" 
                      value="Log in"
                      class="btn btn-primary"
                    >
                      log in
                    </button>
                </form>
            </div>
        )  
}