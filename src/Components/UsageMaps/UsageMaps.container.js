import React, { useState, useEffect } from "react";
import "leaflet/dist/leaflet.css";
import "./UsageMaps.css";
import { initialData, citiesList } from "../utils/staticData";

const UsageMaps = () => {
  const [mapStyle, setMapStyle] = useState("dark");
  const [cities, setCities] = useState(initialData || []);
  const [showCityForm, setShowCityForm] = useState(false);
  const [newCity, setNewCity] = useState({ region: "", network: "", usage: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

 const handleAddCity = () => {
		setLoading(true);
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
			setTimeout(() => {
				setCities([...cities, newCityData]);
				setShowCityForm(false);
				setNewCity({ region: "", network: "", usage: "" });
				setLoading(false);
			}, 1000);
		} else {
			setLoading(false);
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
    <UsageMaps
      loading={loading}
      getMarkerRadius={getMarkerRadius}
      getColor={getColor}
      handleAddCity={handleAddCity}
      setMapStyle={setMapStyle}
      mapStyle={mapStyle}
      showCityForm={showCityForm}
      newCity={newCity}
      setNewCity={setNewCity}
      cities={cities}
      setShowCityForm={setShowCityForm}
     />
  );
};

export default UsageMaps;
