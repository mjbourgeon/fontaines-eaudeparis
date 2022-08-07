import React from "react";
import { Link, useLocation } from "react-router-dom";

function Footer() {
    const { pathname } = useLocation();

    return (
        <footer>
            { pathname !== '/about' ? <Link to="/about">About</Link> : null }
            { pathname !== '/about' && pathname != '/' ? "\u00A0|\u00A0" : null }
            { pathname !== '/' ? <Link to="/">Back to home</Link>  : null }
        </footer>
    )
}

export default Footer;
