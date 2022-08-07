import React from "react";
import Footer from "../components/footer";

import '../styles/about.css';

function About() {
    return (
        <>
            <header className="about-header">
                <h1>About</h1>
            </header>
            <main className="about-main">
                <section>
                    <h2>How</h2>
                    <p>
                        Get the potable water fountains around you in a radius of 1km in the Paris area.
                    </p>
                    <p>
                        Your location is required for the service to work correctly.
                        <br/>
                        In case you cannot or do not want to enable the location service you should try using the full map of potable water foutains available<a href="https://fontaine.eaudeparis.fr/" rel="noopener noreferrer" target="_blank">here</a>.
                    </p>
                </section>
                <section>
                    <h2>Why</h2>
                    <p>
                        This site is developed as a self assignment to learn using Leaflet with React and deploying on Vercel.
                    </p>
                    <p>
                        The full code is on my <a href="https://github.com/mjbourgeon/fontaines-eaudeparis" rel="noopener noreferrer" target="_blank">Github</a>.
                        <br/>
                        This repository is not actively maintained. Please fork to contribute.
                    </p>
                </section>
                <section>
                    <h2>Attributions</h2>
                    <h3>Data</h3>
                    <p>
                        <a href="https://opendata.paris.fr/explore/dataset/fontaines-a-boire/information/?disjunctive.type_objet&disjunctive.modele&disjunctive.commune&disjunctive.dispo" title="Paris Data" rel="noreferrer noopener" target="_blank">Fontaines à boire - Paris Data</a>
                    </p>
                    <h3>Tools</h3>
                    <p>
                        <a href="https://reactjs.org/" rel="noopener noreferrer" target="_blank">React</a>
                    </p>
                    <p>
                        <a href="https://leafletjs.com/" rel="noopener noreferrer" target="_blank">Leaflet</a>
                    </p>
                    <p>
                        <a href="https://react-leaflet.js.org/" rel="noopener noreferrer" target="_blank">React-Leaflet</a>
                    </p>
                    <h3>Images</h3>
                    <p>
                        <a href="https://www.flaticon.com/free-icons/raindrop" title="raindrop icons" rel="noreferrer noopener" target="_blank">Raindrop icons created by Icongeek26 - Flaticon</a>
                    </p>
                </section>
            </main>
            <Footer/>
        </>
    );
}

export default About;