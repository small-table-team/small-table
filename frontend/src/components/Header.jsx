import React from 'react';
import './header.css';

const Header = () => {
    return (
        <header className="basic-header">
            <h1>My Application</h1>
            <nav>
                <ul>
                    <li><a href="#home">Home</a></li>
                    <li><a href="#about">About</a></li>
                    <li><a href="#contact">Contact</a></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;