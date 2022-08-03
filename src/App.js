import './App.css';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css';
import 'leaflet-defaulticon-compatibility';

import React, { useState, useEffect, useRef } from 'react';

import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';


function App() {
  const groupRef = useRef();
  const [map, setMap] = useState(null);
  const [knowLocation, setKnownLocation] = useState([51.505, -0.09]);
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
            }
          )
      });
    }
  }, [map, groupRef]);

  return (
    <div className="App">
      <header>
        <h3>Fontaines - Paris</h3>
      </header>
      <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false} ref={setMap}>
        <>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Circle center={knowLocation} pathOptions={redOptions} radius={20} />

          {
            records.map((record, idx) =>
              <Marker key={`marker-${idx}`} position={[record.geometry.coordinates[1], record.geometry.coordinates[0]]}>
                <Popup>
                  <span>
                    <p><a href={`https://www.google.com/maps/dir/?api=1&travelmode=walking&layer=traffic&destination=${record.geometry.coordinates[1]},${record.geometry.coordinates[0]}`} target="_blank" rel="noopener noreferrer">{`${record.recordid}`}</a></p>
                    <p>{`${record.geometry.coordinates[1]} ${record.geometry.coordinates[0]}`}</p>
                    <p>{`${(record.fields.no_voirie_pair === undefined ? "" : record.fields.no_voirie_pair)} ${record.fields.voie} ${record.fields.commune}`}</p>
                  </span>
                </Popup>
              </Marker>
            )
          }
        </>
      </MapContainer>
    </div>
  );
}

export default App;
