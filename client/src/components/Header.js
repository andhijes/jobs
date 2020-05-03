import React, { useState, useEffect, useCallback } from 'react'
import {
    Link, useHistory 
  } from "react-router-dom";

export default function Header() {
    const LOCAL_STORAGE_KEY = 'auth.user'
    const [isLogin,setIsLogin]=useState(false);

    useEffect(() => {
        let authUser = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (authUser !== null) {
            setIsLogin(true)
        }
      }, [isLogin]);

    let logout = useCallback(() => {
        localStorage.clear();
        window.location = "/";
    }, []);

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4 navbar-fixed-top">
                <Link to="/" className="navbar-brand">Dhijes API</Link>
                <div className="collapse navbar-collapse">
                    {isLogin ?
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <Link to="/dashboard" className="nav-link">Dashboard</Link>
                            </li>
                        </ul>
                        : null
                    }

                    <ul className="nav navbar-nav ml-auto">
                        {isLogin ? 
                        <li className="nav-item" onClick={logout}>
                            <Link to="#" className="nav-link">Sign Out</Link>
                        </li>
                        :
                        <>
                            <li className="nav-item">
                                <Link to="/signin" className="nav-link">Sign In</Link>
                            </li> 
                            <li className="nav-item">
                                <Link to="/signup" className="nav-link">Sign Up</Link>
                            </li>
                        </>
                        }
                        
                    </ul>
                </div>
            </nav>
        </>
        
    )
}
