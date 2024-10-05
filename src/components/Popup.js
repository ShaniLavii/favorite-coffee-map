import React from "react";

const Popup = ({ feature, onClose }) => {
  if (!feature) return null;

  return (
    <div id="popup" className="popup">
      <span id="close-popup" className="close" onClick={onClose}>
        &times;
      </span>
      <div id="popup-content">
        <h3>{feature.properties.name}</h3>
        <div>
          <strong>Address:</strong> {feature.properties.address}
        </div>
        <div>
          <strong>Website:</strong>{" "}
          <a
            href={feature.properties.website}
            target="_blank"
            rel="noopener noreferrer"
          >
            {feature.properties.website}
          </a>
        </div>
        <div>
          <strong>Price Range:</strong> {feature.properties.price_range}
        </div>
        <div>
          <strong>Rating:</strong> {feature.properties.rating}
        </div>
        <div>
          <strong>Inside Sitting:</strong>{" "}
          {feature.properties.inside_sitting ? "Yes" : "No"}
        </div>
        <div>
          <strong>Outside Sitting:</strong>{" "}
          {feature.properties.outside_sitting ? "Yes" : "No"}
        </div>
        <div>
          <strong>Description:</strong>{" "}
          {feature.properties.description || "No description available."}
        </div>
        <img
          src={feature.properties.image}
          alt={feature.properties.name}
          style={{ width: "100%" }}
        />
      </div>
    </div>
  );
};

export default Popup;
