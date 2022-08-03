import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import '../styles/home.css';

function Home() {
    const [locationPending, setLocationPending] = useState(true);
    const [locationEnabled, setLocationEnabled] = useState(false);
    useEffect(() => {
        var options = {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0
        };
        navigator.geolocation.getCurrentPosition(
            (position) => {
                // Success
                setLocationPending(false);
                setLocationEnabled(true);

                console.log(position);
            },
            (positionError) => {
                // Error
                setLocationPending(false);
                setLocationEnabled(false);

                console.log(positionError);
            },
            options
        )
    }, []);

    return (
        <div>
            <header className="home-header">
                <h1>Eau de Paris</h1>
                <img src={process.env.PUBLIC_URL + "/logo192.png"} className="imagelogo" alt="logo"/>
                <h2>Open water spots</h2>
            </header>
            <main className="home-main">
                { locationPending ? <p className="infomessage">Checking browser location availability...</p> : null }
                { !locationPending && !locationEnabled ? <p className="infomessage">Please enable browse location to use this page.</p> : null }
                { !locationPending && locationEnabled ? <Link to="/app"><button className="actionButton">🚰<br/>Take me to the water...<br/>💦</button></Link> : null }
            </main>
            <footer className="home-footer">
                <Link to="/about">About</Link>
            </footer>
        </div>
    );
}

export default Home;