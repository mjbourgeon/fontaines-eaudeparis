import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
    return (
        <div>
            <h1>404</h1>
            <p>No water found.</p>
            <p>Try starting back from <Link to="/">there</Link>.</p>
        </div>
    );
}

export default NotFound;