import React from 'react';
import logo from './images/images.jpg';
import './App.css';
import {Router, Switch, Link, useNavigate, withRouter, Routes, Route  } from 'react-router-dom';
import { createBrowserHistory } from "history";
import { useState, useEffect  } from "react";
import HomePage from './pages/home/home.page';
import LoginPage from './pages/login/login.page';
import RegisterPage from './pages/register/register.page';
import ProfilePage from './pages/profile/profile.page';
import DetailPage from './pages/detail/detail.page';

import UserService from './services/user.service';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import{
  faUser,
  faUserPlus,
  faSignInAlt,
  faHome,
  faSignOutAlt
} from '@fortawesome/free-solid-svg-icons';
import {User} from './models/user';





const App= (props)  =>  {


  const history =  useNavigate();
  
  const [currentUser, setUser] = useState("")
  const [errorMessage, setError] = useState("")



  useEffect(() => {
    UserService.currentUser.subscribe(data => {
      setUser(data);
    
    });

    },[])




  const logout = ()=> {

    UserService.logOut()
    history('/home');

   
  }







  
   
    return (

        <div>
          {currentUser &&
            <nav className="navbar navbar-expand navbar-dark bg-dark">
              <a className="navbar-brand" href="https/reactjs.org">
                <img src={logo}  alt="logo"/>
                React
              </a>
              <div className="navbar-nav mr-auto">
                <Link to="/home" className="nav-item nav-link">
                  <FontAwesomeIcon icon={faHome}/> Home
                </Link>
              </div>
              <div className="navbar-nav ml-auto">
                <Link to="/profile" className="nav-item nav-link">
                  <FontAwesomeIcon icon={faUser}/> {currentUser.name}
                </Link>
                <a onClick={logout} className="nav-item nav-link">
                  <FontAwesomeIcon icon={faSignOutAlt}/> LogOut
                </a>
              </div>
            </nav>
          }
          {!currentUser &&
            <nav className="navbar navbar-expand navbar-dark bg-dark">
              <a className="navbar-brand" href="https/reactjs.org">
                <img src={logo} alt="logo"/>
                React
              </a>
              <div className="navbar-nav mr-auto">
                <Link to="/home" className="nav-item nav-link">
                  <FontAwesomeIcon icon={faHome}/> Home
                </Link>
              </div>
              <div className="navbar-nav ml-auto">
                <Link to="/register" className="nav-item nav-link">
                  <FontAwesomeIcon icon={faUserPlus}/> Register
                </Link>
                <Link to="/login" className="nav-item nav-link">
                  <FontAwesomeIcon icon={faSignInAlt}/> Login
                </Link>
              </div>
            </nav>
          }
          <div className="container">


    
    <Routes  >
    
              <Route exact path="/" element={<HomePage history={history}/>} />
              <Route exact path="/home" element={<HomePage history={history}/>} />
              <Route exact path="/login" element={<LoginPage history={history}/>} />
              <Route exact path="/register" element={<RegisterPage history={history}/>} />
              <Route exact path="/profile" element={<ProfilePage history={history}/>} />
              <Route exact path="/detail/:id" element={<DetailPage history={history}/>} />
   
      </Routes>
   

    
          </div>

        </div>

    );
  
}

export default App
