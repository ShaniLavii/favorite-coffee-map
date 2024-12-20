import React, { useEffect } from "react";

const Header = ({ onAdd, onThemeChange }) => {
  // Handler to toggle dark mode
  const handleThemeToggle = (event) => {
    const isDarkMode = event.target.checked;
    onThemeChange(isDarkMode);
  };

  useEffect(() => {
    // Check for saved theme preference in localStorage (optional)
    const isDarkMode = localStorage.getItem("theme") === "dark";
    const themeToggleInput = document.getElementById("themeToggle");

    if (isDarkMode) {
      document.body.classList.add("dark-mode");
      themeToggleInput.checked = true;
    }

    // Add event listener
    themeToggleInput.addEventListener("change", handleThemeToggle);

    // Cleanup listener on component unmount
    return () => {
      themeToggleInput.removeEventListener("change", handleThemeToggle);
    };
  }, []);

  return (
    <div id="header">
      <label
        htmlFor="themeToggle"
        className="themeToggle st-sunMoonThemeToggleBtn"
      >
        <input type="checkbox" id="themeToggle" className="themeToggleInput" />
        <svg
          width="18"
          height="18"
          viewBox="0 0 20 20"
          fill="#dbc1ac"
          stroke="none"
        >
          <mask id="moon-mask">
            <rect x="0" y="0" width="20" height="20" fill="white"></rect>
            <circle cx="11" cy="3" r="8" fill="black"></circle>
          </mask>
          <circle
            className="sunMoon"
            cx="10"
            cy="10"
            r="8"
            mask="url(#moon-mask)"
          ></circle>
          <g>
            <circle className="sunRay sunRay1" cx="18" cy="10" r="1.5"></circle>
            <circle
              className="sunRay sunRay2"
              cx="14"
              cy="16.928"
              r="1.5"
            ></circle>
            <circle
              className="sunRay sunRay3"
              cx="6"
              cy="16.928"
              r="1.5"
            ></circle>
            <circle className="sunRay sunRay4" cx="2" cy="10" r="1.5"></circle>
            <circle
              className="sunRay sunRay5"
              cx="6"
              cy="3.1718"
              r="1.5"
            ></circle>
            <circle
              className="sunRay sunRay6"
              cx="14"
              cy="3.1718"
              r="1.5"
            ></circle>
          </g>
        </svg>
      </label>
      <button className="add" id="add-coffee-shop" onClick={onAdd}>
        <span data-text-initial="Add Coffee Shop" className="tooltip"></span>
        <span>
          <svg
            xmlSpace="preserve"
            style={{ enableBackground: "new 0 0 512 512" }}
            viewBox="0 0 24 24"
            y="0"
            x="0"
            height="14"
            width="14"
            xmlns="http://www.w3.org/2000/svg"
            className="plus-icon"
          >
            <g>
              <path
                fill="currentColor"
                d="M19 11h-6V5a1 1 0 0 0-2 0v6H5a1 1 0 0 0 0 2h6v6a1 1 0 0 0 2 0v-6h6a1 1 0 0 0 0-2z"
              ></path>
            </g>
          </svg>
        </span>
      </button>
      <h1>Favorite Coffee Shops Map</h1>
    </div>
  );
};

export default Header;
