import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, NavDropdown, Badge } from 'react-bootstrap';
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
                <div className="upper-bar">
                    <div className="container">
                                {userData.user ? (
                                    <Link onClick={logout}>Log out</Link>
                                ) : (
                                    <>
                                        <Link to="/log-in" >log in  </Link>     
                                        <Link to="/sing-up">Sing in</Link>
                                    </>
                                )}                             
                    </div>
                </div>

                
                <Navbar collapseOnSelect className="bg-light1" expand="lg"  >
                    <Navbar.Brand href="/">
                        <span>Reader</span>
                        <span>Destination</span>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link href="/UploadProduct">Upload Product</Nav.Link>
                            <Nav.Link href="/productpage">Product Page</Nav.Link>
                        </Nav>
                        <Nav>
                            <Nav.Link  href="/Cart">
                                cart
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        );
  }