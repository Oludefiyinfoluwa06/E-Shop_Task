import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';
import Search from './Search';

const Navbar = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const username = user.username;
    const profilePic = user.image

    return (
        <nav>
            <div>
                <img src={profilePic} alt="Profile" />
                <label>Welcome, {username}</label>
            </div>
            <ul>
                <li><Search /></li>
                <li><Link to='/home'>Home</Link></li>
                <li><Link to='categories'>Categories</Link></li>
                <li><Link to='me'>Profile</Link></li>
                <li><Link to='cart'>Cart</Link></li>
            </ul>
        </nav>
    );
}

export default Navbar;