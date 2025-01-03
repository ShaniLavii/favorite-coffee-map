import React, { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Tooltip,
  useMap,
} from "react-leaflet";
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

// Regular size icon for non-active markers
const regularIcon = new L.Icon({
  iconUrl: "/static/images/icons/map-icon.png",
  iconSize: [32, 32], // Regular size
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

// Larger size icon for active markers
const activeIcon = new L.Icon({
  iconUrl: "/static/images/icons/map-icon.png",
  iconSize: [48, 48], // Larger size for selected marker
  iconAnchor: [24, 48],
  popupAnchor: [0, -48],
});

// TileLayer component that dynamically changes based on dark mode
const DynamicTileLayer = ({ isDarkMode }) => {
  const map = useMap(); // Get access to the map instance

  const tileLayerUrl = isDarkMode
    ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
    : "https://services.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}";

  useEffect(() => {
    // When the isDarkMode changes, update the tile layer URL
    map.eachLayer((layer) => {
      if (layer instanceof L.TileLayer) {
        layer.setUrl(tileLayerUrl);
      }
    });
  }, [isDarkMode, map]);

  return <TileLayer url={tileLayerUrl} />;
};

const Map = ({ coffeeShops, onMarkerClick, isDarkMode }) => {
  // const [coffeeShops, setCoffeeShops] = useState([]);
  const [activeMarkerIndex, setActiveMarkerIndex] = useState(null);
  const [hoveredMarkerIndex, setHoveredMarkerIndex] = useState(null); // Track hovered marker

  // useEffect(() => {
  //   const fetchCoffeeShops = async () => {
  //     try {
  //       const response = await axios.get(
  //         `https://coffee-map-backend.vercel.app/geojson`
  //       );
  //       setCoffeeShops(response.data.features);
  //     } catch (error) {
  //       console.error("Error fetching GeoJSON data:", error);
  //     }
  //   };

  //   fetchCoffeeShops();
  // }, []);

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
  };

  const handlePopupClose = () => {
    // Reset active marker index when popup is closed
    setActiveMarkerIndex(null);
  };

  console.log(hoveredMarkerIndex);

  return (
    <MapContainer center={[32.0628645, 34.776885]} zoom={13} className="map">
      {/* Use the DynamicTileLayer to update the tile layer based on dark mode */}
      <DynamicTileLayer isDarkMode={isDarkMode} />
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
            mouseover: () => setHoveredMarkerIndex(index), // Show tooltip on hover
            mouseout: () => setHoveredMarkerIndex(null), // Hide tooltip when hover ends
          }}
        >
          {/* Conditionally show tooltip based on hover */}
          <Tooltip
            direction="top"
            offset={[0, -32]}
            visible={hoveredMarkerIndex === index}
          >
            <span>{shop.properties.name}</span>
          </Tooltip>
          <Popup onClose={handlePopupClose}>
            <h2>{shop.properties.name}</h2>
            <p>{shop.properties.description}</p>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default Map;
