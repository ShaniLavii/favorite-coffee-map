// src/components/Sidebar.js
import React from "react";
import RatingStars from "./RatingStars";
import "../styles/sidebar.css";

const Sidebar = ({ feature, onClose, handleOpenModal, setFormData }) => {
  if (!feature) {
    return null;
  }

  const edit = () => {
    setFormData(feature.properties);
    handleOpenModal();
  };

  return (
    <div className="sidebar">
      <div className="sidebar-relative-container">
        <div className="button-container">
          <button className="close-sidebar" onClick={onClose}>
            &times;
          </button>
        </div>
        {feature.properties.image && (
          <img
            src={feature.properties.image}
            alt={feature.properties.name}
            className="sidebar-image"
          />
        )}
        <div className="sidebar-content">
          <h2 className="sidebar-title">{feature.properties.name}</h2>
          <div className="sidebar-rating">
            <RatingStars rating={feature.properties.rating} />
            <span className="sidebar-rating-value">
              {feature.properties.rating}
            </span>
          </div>
          <div className="sidebar-info">
            <div className="sidebar-info-item">
              <span className="sidebar-info-label">Address:</span>
              <span>{feature.properties.address}</span>
            </div>
            <div className="sidebar-info-item">
              <span className="sidebar-info-label">Website:</span>
              <a
                href={feature.properties.website}
                target="_blank"
                rel="noopener noreferrer"
              >
                {feature.properties.website}
              </a>
            </div>
            <div className="sidebar-info-item">
              <span className="sidebar-info-label">Price Range:</span>
              <span>{feature.properties.price_range}</span>
            </div>
            <div className="sidebar-info-item">
              <span className="sidebar-info-label">Inside Sitting:</span>
              <span>{feature.properties.inside_sitting ? "Yes" : "No"}</span>
            </div>
            <div className="sidebar-info-item">
              <span className="sidebar-info-label">Outside Sitting:</span>
              <span>{feature.properties.outside_sitting ? "Yes" : "No"}</span>
            </div>
            <div className="sidebar-info-item">
              <span className="sidebar-info-label">Description:</span>
              <br />
              <span>
                {feature.properties.description || "No description available."}
              </span>
            </div>
            <button className="edit-button" onClick={edit}>
              <svg
                className="svg-icon"
                fill="none"
                height="24"
                viewBox="0 0 30 30"
                width="14"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g stroke="black" strokeLinecap="round" strokeWidth="2">
                  <path d="m20 20h-16"></path>
                  <path
                    clipRule="evenodd"
                    d="m14.5858 4.41422c.781-.78105 2.0474-.78105 2.8284 0 .7811.78105.7811 2.04738 0 2.82843l-8.28322 8.28325-3.03046.202.20203-3.0304z"
                    fillRule="evenodd"
                  ></path>
                </g>
              </svg>
              <span className="edit-lable">Request to Edit</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
