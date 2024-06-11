import React from 'react';
import { Link } from 'react-router-dom'; 
import "./Header.css";

export default function Header() {
    return (
        <nav className="navbar bg-light">
            <div className="container-fluid">
                <Link to="/" className="navbar-brand">Debatedor</Link>
                <form className="d-flex" role="search">
                    <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                    <button className="btn btn-outline-success" type="submit">Search</button>
                </form>
            </div>
        </nav>
    );
}
