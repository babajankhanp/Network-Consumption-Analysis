import React, { useState } from "react";
import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import { Map as MapIcon, Globe2, Layers } from "lucide-react";
import "leaflet/dist/leaflet.css";
import UsageScale from "../UsageScale";
import "./UsageMaps.css";

const data = [
  {
    id: 1,
    region: "Mumbai",
    coordinates: [19.076, 72.8777],
    usage: 4500,
    network: "5G",
  },
  {
    id: 2,
    region: "New York",
    coordinates: [40.7128, -74.006],
    usage: 7500,
    network: "5G",
  },
  {
    id: 3,
    region: "Bangalore",
    coordinates: [12.9716, 77.5946],
    usage: 1200,
    network: "4G",
  },
  {
    id: 4,
    region: "Delhi",
    coordinates: [28.6139, 77.209],
    usage: 600,
    network: "4G",
  },
  {
    id: 5,
    region: "London",
    coordinates: [51.5074, -0.1278],
    usage: 3000,
    network: "5G",
  },
  {
    id: 6,
    region: "Paris",
    coordinates: [48.8566, 2.3522],
    usage: 2000,
    network: "5G",
  },
  {
    id: 7,
    region: "Zurich",
    coordinates: [47.3769, 8.5417],
    usage: 800,
    network: "4G",
  },
  {
    id: 8,
    region: "San Francisco",
    coordinates: [37.7749, -122.4194],
    usage: 6700,
    network: "5G",
  },
];

const mapStyles = {
  default: {
    url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
  satellite: {
    url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    attribution:
      "Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community",
  },
  dark: {
    url: "https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png",
    attribution:
      '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
  },
};

const ViewButton = ({ icon: Icon, label, active, onClick }) => (
  <button onClick={onClick} className={`view-button ${active ? "active" : ""}`}>
    <Icon size={18} />
    <span>{label}</span>
  </button>
);

const UsageMaps = () => {
  const [mapStyle, setMapStyle] = useState("dark");

  const getColor = (usage) => {
    if (usage < 500) return "#c6e5f2";
    if (usage < 1000) return "#91d1f0";
    if (usage < 5000) return "#4a90e2";
    return "#0d3b66";
  };

  const getMarkerRadius = (usage) => {
    if (usage < 500) return 3;
    if (usage < 1000) return 5;
    if (usage < 5000) return 8;
    return 10;
  };

  return (
    <div className="app">
      <div className="container">
        <div className="card">
          <h1 className="title">Network Usage Map</h1>
          <div className="controls">
            <div className="map-style-controls">
              <ViewButton
                icon={MapIcon}
                label="Standard"
                active={mapStyle === "default"}
                onClick={() => setMapStyle("default")}
              />
              <ViewButton
                icon={Globe2}
                label="Satellite"
                active={mapStyle === "satellite"}
                onClick={() => setMapStyle("satellite")}
              />
              <ViewButton
                icon={Layers}
                label="Dark"
                active={mapStyle === "dark"}
                onClick={() => setMapStyle("dark")}
              />
            </div>
          </div>
          <div className="map-container">
            <MapContainer
              center={[20.5937, 78.9629]}
              zoom={3}
              className="leaflet-map"
              scrollWheelZoom={true}
            >
              <TileLayer
                url={mapStyles[mapStyle].url}
                attribution={mapStyles[mapStyle].attribution}
              />
              {data.map((region) => (
                <CircleMarker
                  key={region.id}
                  center={region.coordinates}
                  radius={getMarkerRadius(region.usage)}
                  pathOptions={{
                    color: getColor(region.usage),
                    fillColor: getColor(region.usage),
                    fillOpacity: 0.8,
                    cursor: "pointer",

                  }}
                  eventHandlers={{
                    click: (e) => {
                      e.target.openPopup();
                    },
                  }}
                  interactive={true}
                >
                  <Popup>
                    <div className="popup">
                      <h3>{region.region}</h3>
                      <p>Network: {region.network}</p>
                      <p>Usage: {region.usage}</p>
                    </div>
                  </Popup>
                </CircleMarker>
              ))}
            </MapContainer>
          </div>
          <UsageScale />
        </div>
      </div>
    </div>
  );
};

export default UsageMaps;
