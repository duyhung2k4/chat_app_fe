import React from "react";
import "./styles.css";
import { NavLink } from "react-router-dom";

const NotFound: React.FC = () => {
    return (
        <div className="container">
            <div className="section">
                <h1 className="error text">404</h1>
                <div className="page">Ooops!!! The page you are looking for is not found</div>
                <NavLink className="back-home text" to="/">Back to home</NavLink>
            </div>
        </div>
    )
}

export default NotFound;