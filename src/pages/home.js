import React from "react";
import { Link } from "react-router-dom";

import './home.css';

function Home() {
    return (
        <div>
            <header className="home-header">
                <h1>Eau de Paris</h1>
                <img src={process.env.PUBLIC_URL + "/logo192.png"} alt="logo"/>
                <h2>Fontaines</h2>
            </header>
            <div className="home-main">
                <Link to="/app">Hydrate!</Link>
            </div>
            <footer className="home-footer">
                <Link to="/about">A propos</Link>
            </footer>
        </div>
    );
}

export default Home;