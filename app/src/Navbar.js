import React from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <Link to="/">Job Odyssey</Link>
            </div>
            <ul className="navbar-menu">
                <li><Link to="/sirketler">Şirketler</Link></li>
                <li><Link to="/ilanlar">İlanlar</Link></li>
            </ul>
            <div className="navbar-buttons">
                <Link to="/kayit-ol">
                    <button className="btn blue">Kayıt Ol</button>
                </Link>
                <button className="btn red">Şirketler İçin</button>
                <select className="language-select">
                    <option value="tr">TR</option>
                    <option value="en">EN</option>
                </select>
            </div>
        </nav>
    );
};

export default Navbar;
