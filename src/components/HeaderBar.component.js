import React, { useContext }  from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import UserContext from "../context/UserContext";

export default function HeaderBar() {

    
        const { userData, setUserData } = useContext(UserContext);

        const logout = () => {
            setUserData({
              token: undefined,
              user: undefined,
            });
            localStorage.setItem("auth-token", "");
          };

        return (
            <div>
                <div class="upper-bar">
                    <div class="container">
                        <div class="row">
                            <div class="col-sm">
                                {userData.user ? (
                                    <Link onClick={logout}>Log out</Link>
                                ) : (
                                    <>
                                        <Link to="/log-in" >log in  </Link>     
                                        <Link to="/sing-up">Sing in</Link>
                                    </>
                                )}
                                <pre>
                                   
                                </pre>
                                <form class="form-inline my-2 my-lg-0">
                                    <input
                                        class="form-control mr-sm-2"
                                        type="search"
                                        placeholder="Search for book"
                                        aria-label="Search"
                                    ></input>
                                    <button class="btn btn-outline-success1 my-2 my-sm-0" type="submit">
                                        Search
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

                <nav class="navbar navbar-expand-lg navbar-light bg-light1">
                    <div class="container">
                        <a class="navbar-brand" href="a">
                            <span>Reader</span>
                            <span>Destination</span>
                        </a>
                        <button
                            class="navbar-toggler"
                            type="button"
                            data-toggle="collapse"
                            data-target="#main-nav"
                            aria-controls="navbarSupportedContent"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                        >
                            <span class="navbar-toggler-icon"></span>
                        </button>

                        <div class="collapse navbar-collapse" id="main-nav">
                        <ul class="navbar-nav ml-auto">
                            <li class="nav-item active">
                                <a class="nav-link" href="/"
                                    >Home <span class="sr-only">(current)</span></a
                                >
                            </li>
                            <li class="nav-item">
                                <Link to="/UploadProduct" class="nav-link">UploadProduct  </Link>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="/productpage">productpage</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="/">The scientific books</a>
                            </li>

                            <li class="nav-item">
                            <a class="nav-link" href="/">Discussions</a>
                            </li>
                        </ul>
                        </div>
                    </div>
                </nav>
            </div>
      );
  }