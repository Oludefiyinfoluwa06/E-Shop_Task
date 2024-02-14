import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';
import Search from './Search';

const Navbar = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const username = user.username;

    return (
        <nav>
            <label>Welcome, {username}</label>
            <ul>
                <li><Search /></li>
                <li><Link to='/home'>Home</Link></li>
                <li><Link to='/me'>Profile</Link></li>
                <li><Link to='/cart'>Cart</Link></li>
            </ul>
        </nav>
    );
}

export default Navbar;