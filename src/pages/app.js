import '../styles/app.css';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css';
import 'leaflet-defaulticon-compatibility';

import React, { useState, useEffect, useRef } from 'react';

import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import { Link } from 'react-router-dom';
import Footer from '../components/footer';


function App() {
  const DEFAULT_CENTER = [48.858470, 2.338075];
  const groupRef = useRef();
  const [map, setMap] = useState(null);
  const [knowLocation, setKnownLocation] = useState(DEFAULT_CENTER);
  const [records, setRecords] = useState([]);

  const redOptions = { color: 'red' };

  useEffect(() => {
    if (groupRef && map) {
      navigator.geolocation.getCurrentPosition((position) => {
        console.log(position.coords);
        map.setView([position.coords.latitude, position.coords.longitude], 16);

        // Add location marker
        setKnownLocation([position.coords.latitude, position.coords.longitude]);

        var url = `https://opendata.paris.fr/api/records/1.0/search/?dataset=fontaines-a-boire&q=&rows=100&facet=type_objet&facet=modele&facet=commune&facet=dispo&geofilter.distance=${position.coords.latitude}%2C+${position.coords.longitude}%2C+1000`;
        fetch(url)
          .then(res => res.json())
          .then(
            (result) => {
              console.log(result);
              // Add fountains markers
              setRecords(result.records);
            },
            (error) => {
              console.log(error);
              alert("Unable to fetch water spots using Paris Data API.");
            }
          )
      });
    }
  }, [map, groupRef]);

  return (
    <>
      <header className="header">
        <h5>🚰 Eau à Paris ⛲</h5>
      </header>
      <main>
        <MapContainer center={DEFAULT_CENTER} zoom={13} scrollWheelZoom={false} ref={setMap}>
          <>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Circle center={knowLocation} pathOptions={redOptions} radius={20} />

            {
              records
                .filter(record => record.fields.dispo === "OUI")
                .map((record, idx) =>
                  <Marker key={`marker-${idx}`} position={[record.geometry.coordinates[1], record.geometry.coordinates[0]]}>
                    <Popup>
                      <span>
                        <p>
                          {`${record.fields.modele}`}
                        </p>
                        <p>
                          <a
                            href={`https://www.google.com/maps/dir/?api=1&travelmode=walking&layer=traffic&destination=${record.geometry.coordinates[1]},${record.geometry.coordinates[0]}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {`${(record.fields.no_voirie_pair === undefined ? "" : record.fields.no_voirie_pair)} ${record.fields.voie} ${record.fields.commune}`}
                          </a>
                        </p>
                      </span>
                    </Popup>
                  </Marker>
                )
            }
          </>
        </MapContainer>
      </main>
      <Footer/>
    </>
  );
}

export default App;
