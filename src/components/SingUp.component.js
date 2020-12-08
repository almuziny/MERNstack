import React, { useState, useContext }  from 'react';
import { useHistory } from "react-router-dom";
import UserContext from "../context/UserContext";
//import { Link } from 'react-router-dom';
import axios from 'axios';

export default function LoSignUp()  {
  const [Email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [passwordCheck, setPasswordCheck] = useState();
  const [username, setUsername] = useState();
  const [error, setError] = useState();

  const { setUserData } = useContext(UserContext);
  const history = useHistory();

    
  const submit = async (e) => {
    e.preventDefault();

    try {
      const newUser = { Email, password, passwordCheck, username };
      await axios.post("http://localhost:5000/account/sign-up", newUser);
      const loginRes = await axios.post("http://localhost:5000/account/log-in", {
        Email,
        password,
      });
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
                        <label for="exampleInputEmail1">Email address</label>
                        <input 
                          type="email" 
                          class="form-control" 
                          id="exampleInputEmail1" 
                          aria-describedby="emailHelp"
                          onChange={(e) => setEmail(e.target.value)} 
                        />
                        <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>

                    <div class="form-group">
                        <label for="exampleInputUsername">User name</label>
                        <input 
                          type="input" 
                          class="form-control" 
                          id="exampleInputEmail1" 
                          onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div class="form-group">
                        <label for="exampleInputPassword1">Password</label>
                        <input 
                          type="password" 
                          class="form-control" 
                          id="exampleInputPassword1" 
                          onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div class="form-group">
                        <label for="exampleInputPassword2">PasswordCheck</label>
                        <input 
                          type="password" 
                          class="form-control" 
                          id="exampleInputPassword1"
                          onChange={(e) => setPasswordCheck(e.target.value)}
                        />
                    </div>

                    <button type="submit" class="btn btn-primary">Submit</button>
                </form>
            </div>
        )

}