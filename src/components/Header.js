import React from 'react';
import '../styles/Header.css';

const Header = ({ title, content }) => {
    return (
        <header>
            <h1>{title}</h1>
            <p>{content}</p>
        </header>
    );
}

export default Header;