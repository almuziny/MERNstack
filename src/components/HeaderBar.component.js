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

                <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                    <Navbar.Brand href="/">React-Bootstrap</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto">
                        <Nav.Link href="/UploadProduct">Upload Product</Nav.Link>
                        <Nav.Link href="/productpage">Product Page</Nav.Link>
                        <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                            <NavDropdown.Item href="/Discussions/page1">Discussions</NavDropdown.Item>
                            <NavDropdown.Item href="/Discussions/page2">Another action</NavDropdown.Item>
                            <NavDropdown.Item href="/Discussions/page3">Something</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                        </NavDropdown>
                        </Nav>
                        <Nav>
                        <Nav.Link href="#deets">More deets</Nav.Link>
                        <Nav.Link  href="/Cart">
                            cart
                            <Badge style={{ color: "red"}} >3</Badge>
                        </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>

{/*
                <nav className="navbar navbar-expand-lg navbar-light bg-light1">
                    <div className="container">
                        <a className="navbar-brand" href="a">
                            <span>Reader</span>
                            <span>Destination</span>
                        </a>
                        <button
                            className="navbar-toggler"
                            type="button"
                            data-toggle="collapse"
                            data-target="#main-nav"
                            aria-controls="navbarSupportedContent"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                        >
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <div className="collapse navbar-collapse" id="main-nav">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item active">
                                <a className="nav-link" href="/"
                                    >Home <span className="sr-only">(current)</span></a
                                >
                            </li>
                            <li className="nav-item">
                                <Link to="/UploadProduct" className="nav-link">UploadProduct  </Link>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/productpage">productpage</a>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" href="/">The scientific books </Link>
                            </li>
                            
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" data-toggle="dropdown" href="/" role="button" aria-haspopup="true" aria-expanded="false">Dropdown</a>
                                <div className="dropdown-menu">
                                <a className="dropdown-item" href="/">Action</a>
                                <a className="dropdown-item" href="/">Another action</a>
                                <a className="dropdown-item" href="/">Something else here</a>
                                <div className="dropdown-divider"></div>
                                <a className="dropdown-item" href="/">Separated link</a>
                                </div>
                            </li>
                            <li className="nav-item">
                            <Link className="nav-link" to="/Discussions">Discussions</Link>
                            </li>
                        </ul>
                        </div>
                    </div>
                </nav>
*/}
            </div>
      );
  }