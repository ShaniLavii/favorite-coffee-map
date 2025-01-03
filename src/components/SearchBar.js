import React, { useState } from "react";

const SearchBar = ({ coffeeShops, onSelectShop }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredShops, setFilteredShops] = useState([]);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    // Filter coffee shops based on the search term
    if (value.trim()) {
      const filtered = coffeeShops.filter((shop) => {
        // Convert all property values to strings and check for a match
        return Object.values(shop.properties).some((property) =>
          property.toString().toLowerCase().includes(value.toLowerCase())
        );
      });
      setFilteredShops(filtered);
    } else {
      setFilteredShops([]);
    }
  };

  const handleShopSelect = (shop) => {
    setSearchTerm(""); // Clear the search input
    setFilteredShops([]); // Hide the dropdown
    onSelectShop(shop); // Trigger the selection callback
  };

  return (
    <div className="search-bar">
      <label className="label">
        <span className="icon">
          <svg
            height="20px"
            width="20px"
            version="1.1"
            id="Capa_1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 275.353 275.353"
            xmlSpace="preserve"
            fill="#895b30"
            className="w-6 h-6 text-gray-800 dark:text-white"
          >
            <g>
              <path
                style={{ fill: "#895b30" }}
                d="M229.784,199.712c27.269,0,45.568-29.692,45.568-57.419c0-20.117-12.418-22.843-24.562-22.843 c-3.468,0-7.21,0.234-11.167,0.479c-3.195,0.176-6.507,0.332-9.848,0.41l0.039-0.889H1.514c0,42.959,24.132,80.321,59.686,99.49 C24.787,221.333,0,226.043,0,231.445c0,7.865,51.782,14.196,115.659,14.196s115.649-6.331,115.649-14.196 c0-5.432-24.904-10.132-61.454-12.516c10.63-5.725,20.263-13.004,28.529-21.641 C208.026,199.712,219.448,199.712,229.784,199.712z M229.364,128.272c3.683-0.088,7.289-0.244,10.737-0.469 c3.83-0.205,7.464-0.42,10.698-0.42c11.509,0,16.658,2.159,16.658,14.909c0,23.419-15.466,49.515-37.664,49.515 c-9.751,0-18.3-0.205-25.285-1.358C218.559,173.196,227.537,151.731,229.364,128.272z M98.982,97.203 c-0.557-0.547-13.414-13.922,0.156-30.327c16.58-20,0.01-37-0.156-37.166l-3.595,3.595c0.557,0.537,13.414,13.932-0.166,30.327 c-16.58,20.029-0.01,37.039,0.166,37.195L98.982,97.203z M118.737,97.203c-0.557-0.547-13.414-13.922,0.166-30.327 c16.56-20,0-37-0.166-37.166l-3.605,3.595c0.557,0.537,13.414,13.932-0.156,30.327c-16.56,20.039-0.01,37.039,0.166,37.205 L118.737,97.203z M140.251,97.203c-0.557-0.547-13.414-13.922,0.156-30.327c16.57-20,0-37-0.156-37.166l-3.615,3.595 c0.547,0.537,13.424,13.932-0.166,30.327c-16.56,20.039,0,37.039,0.176,37.205L140.251,97.203z"
              ></path>
            </g>
          </svg>
        </span>
        <input
          type="text"
          className="input"
          placeholder="Search coffee shops..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </label>
      {filteredShops.length > 0 && (
        <ul className="dropdown">
          {filteredShops.map((shop) => (
            <li key={shop.properties.id} onClick={() => handleShopSelect(shop)}>
              {shop.properties.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
