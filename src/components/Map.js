// src/components/Map.js
import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import axios from "axios";

// Fix leaflet's default icon path issue with Webpack
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png").default,
  iconUrl: require("leaflet/dist/images/marker-icon.png").default,
  shadowUrl: require("leaflet/dist/images/marker-shadow.png").default,
});

const regularIcon = new L.Icon({
  iconUrl: "/static/images/icons/coffee-cup.png",
  iconSize: [32, 32], // Regular size
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const activeIcon = new L.Icon({
  iconUrl: "/static/images/icons/coffee-cup.png",
  iconSize: [48, 48], // Larger size for selected marker
  iconAnchor: [24, 48],
  popupAnchor: [0, -48],
});

const Map = ({ onMarkerClick }) => {
  const [coffeeShops, setCoffeeShops] = useState([]);
  const [activeMarkerIndex, setActiveMarkerIndex] = useState(null);
  const [tooltipOpen, setTooltipOpen] = useState(null);

  useEffect(() => {
    const fetchCoffeeShops = async () => {
      try {
        const response = await axios.get(
          "https://tlv-coffee-map-backend.vercel.app/geojson"
        );
        setCoffeeShops(response.data.features);
      } catch (error) {
        console.error("Error fetching GeoJSON data:", error);
      }
    };

    fetchCoffeeShops();
  }, []);

  const handleMarkerClick = (shop, index, map) => {
    // Trigger the parent component's click handler
    onMarkerClick(shop);

    // Zoom to the clicked marker's location
    map.setView(
      [shop.geometry.coordinates[1], shop.geometry.coordinates[0]],
      16
    ); // Adjust zoom level as needed

    // Set the active marker index
    setActiveMarkerIndex(index);

    // Close the tooltip
    setTooltipOpen(null);
  };

  const handlePopupClose = () => {
    // Reset active marker index when popup is closed
    setActiveMarkerIndex(null);
  };

  return (
    <MapContainer center={[32.0628645, 34.776885]} zoom={13} className="map">
      <TileLayer
        url="https://services.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {coffeeShops.map((shop, index) => (
        <Marker
          key={index}
          position={[
            shop.geometry.coordinates[1],
            shop.geometry.coordinates[0],
          ]}
          icon={index === activeMarkerIndex ? activeIcon : regularIcon}
          eventHandlers={{
            click: (e) => handleMarkerClick(shop, index, e.target._map),
          }}
        >
          {/* Show tooltip only on hover */}
          <Tooltip direction="top" offset={[0, -32]} permanent={false}>
            <span>{shop.properties.name}</span>
          </Tooltip>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default Map;
