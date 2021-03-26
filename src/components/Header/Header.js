import React from 'react';
import { Link } from 'react-router-dom';
import logo from "../../images/logo.png";
import "./Header.css";

const Header = () => {
    return (
        <div className="header">
            <Link to={"/"} className="headerLogo"> 
                <img src={logo} alt="" />
            </Link>
            <nav>
                <Link className="navLink" to={"/shop"}>Shop</Link>
                <Link className="navLink" to={"/review"}>Order Review</Link>
                <Link className="navLink" to={"/mange-inventory"}>Manage Inventory</Link>
            </nav>
        </div>
    );
};

export default Header;