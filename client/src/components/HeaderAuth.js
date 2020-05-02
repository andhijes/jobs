import React from 'react'
import {
    Link, useHistory 
  } from "react-router-dom";

export default function HeaderAuth() {
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
                <Link to="/" className="navbar-brand">Jobs</Link>
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link to="/dashboard" className="nav-link">Dashboard</Link>
                        </li>
                    </ul>

                    <ul className="nav navbar-nav ml-auto">
                        <li className="nav-item">
                            <Link to="/signout" className="nav-link">Sign Out</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    )
}
