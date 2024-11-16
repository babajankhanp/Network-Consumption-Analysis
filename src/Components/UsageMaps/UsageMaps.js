import React, { useState } from "react";
import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import { Map as MapIcon, Globe2, Layers } from "lucide-react";
import "leaflet/dist/leaflet.css";
import UsageScale from "../UsageScale";
import "./UsageMaps.css";

import { initialData, citiesList, usageOptions } from "../utils/staticData";

const mapStyles = {
	default: {
		url: `https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`,
		attribution:
			'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	},
	satellite: {
		url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
		attribution:
			"Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community",
	},
	dark: {
		url: `https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png?api_key=${process.env.REACT_APP_STADIA_API_KEY || ""}`,
		attribution:
			'&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a>, &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
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
	const [cities, setCities] = useState(initialData);
	const [showCityForm, setShowCityForm] = useState(false);
	const [newCity, setNewCity] = useState({
		region: "",
		network: "",
		usage: 0,
	});

	const handleAddCity = () => {
		const selectedCity = citiesList.find(
			(city) => city.region === newCity.region
		);
		if (selectedCity) {
			const newCityData = {
				id: cities.length + 1,
				region: selectedCity.region,
				coordinates: selectedCity.coordinates,
				usage: parseInt(newCity.usage),
				network: newCity.network,
			};
			setCities([...cities, newCityData]);
			setShowCityForm(false);
			setNewCity({ region: "", network: "", usage: "" });
		}
	};

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
						<button
							onClick={() => setShowCityForm(!showCityForm)}
							className="add-city-button"
						>
							{showCityForm ? "Cancel" : "Add City"}
						</button>
					</div>

					{showCityForm && (
						<div className={`city-form ${showCityForm ? "show" : ""}`}>
							<h3>Add a New City</h3>
							<div className="add-form-items">
								<select
									value={newCity.region}
									onChange={(e) =>
										setNewCity({ ...newCity, region: e.target.value })
									}
								>
									<option value="">Select a City</option>
									{citiesList.map((city) => (
										<option key={city.id} value={city.region}>
											{city.region}
										</option>
									))}
								</select>
								<select
									value={newCity.network}
									onChange={(e) =>
										setNewCity({ ...newCity, network: e.target.value })
									}
								>
									<option value="">Select Network</option>
									<option value="5G">5G</option>
									<option value="4G">4G</option>
								</select>
								<select
									value={newCity.usage}
									onChange={(e) =>
										setNewCity({ ...newCity, usage: e.target.value })
									}
								>
									<option value="">Select Usage</option>
									{usageOptions.map((usageValue) => (
										<option key={usageValue.value} value={usageValue.value}>
											{usageValue.label}
										</option>
									))}
								</select>
								<button onClick={handleAddCity}>Add City</button>
							</div>
						</div>
					)}

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
							{cities.map((region) => (
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
