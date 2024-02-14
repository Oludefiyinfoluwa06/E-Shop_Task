import React from 'react';
import '../styles/Header.css';
import Categories from './Categories';

const Header = () => {
    return (
        <header>
            <h1>Shop in style</h1>
            <Categories />
        </header>
    );
}

export default Header;