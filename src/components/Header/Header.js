import React from 'react';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { userContext } from '../../App';
import logo from "../../images/logo.png";
import "./Header.css";

const Header = () => {
    const [loggedinUser, setLoggedinUser] = useContext(userContext);
    return (
        <div className="header">
            <Link to={"/"} className="headerLogo"> 
                <img src={logo} alt="" />
            </Link>
            <nav>
                <Link className="navLink" to={"/shop"}>Shop</Link>
                <Link className="navLink" to={"/review"}>Order Review</Link>
                <Link className="navLink" to={"/mange-inventory"}>Manage Inventory</Link>
                <button className="float-right btn-sm" onClick={() => setLoggedinUser({})}>Signout</button>
            </nav>
        </div>
    );
};

export default Header;