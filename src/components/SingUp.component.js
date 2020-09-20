import React, { Component}  from 'react';
//import { Link } from 'react-router-dom';
import axios from 'axios';

export default class LoSignUp extends Component {
    constructor(props) {
        super(props);
    
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeEamil = this.onChangeEamil.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    
        this.state = {
            Email: '',
            username: '',
            password: '',
        }
      }

      onChangeEamil(e) {
        this.setState({
          Email: e.target.value
        })
      }
    
      onChangeUsername(e) {
        this.setState({
          username: e.target.value
        })
      }
    
      onChangePassword(e) {
        this.setState({
          password: e.target.value
        })
      }
    
      onSubmit(e) {
        e.preventDefault();
    
        const account = {
            Email: this.state.Email,
            username: this.state.username,
            password: this.state.password
        }
    
        console.log(account);
    
        axios.post('http://localhost:5000/account/sign-up', account)
          .then(res => console.log(res.data));
    
        //window.location = '/';
      }

    render() {
        return (

            <div class="box">
                <form onSubmit={this.onSubmit}>
                
                    <div class="form-group">
                        <label for="exampleInputEmail1">Email address</label>
                        <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={this.state.Email}
                        onChange={this.onChangeEamil} ></input>
                        <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                    <div class="form-group">
                        <label for="exampleInputUsername">User name</label>
                        <input type="input" class="form-control" id="exampleInputEmail1" value={this.state.username}
                        onChange={this.onChangeUsername}></input>
                    </div>
                    <div class="form-group">
                        <label for="exampleInputPassword1">Password</label>
                        <input type="password" class="form-control" id="exampleInputPassword1" value={this.state.password}
                        onChange={this.onChangePassword}></input>
                    </div>
                    <button type="submit" class="btn btn-primary">Submit</button>
                </form>
            </div>
        )
    }    
}