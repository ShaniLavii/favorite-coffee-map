import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Map from "./components/Map";
import Popup from "./components/Popup";
import Modal from "./components/Modal";
import Sidebar from "./components/Sidebar";
import { ToastContainer } from "react-toast"; // Importing only ToastContainer
import { submitCoffeeShopRequest } from "./api"; // Import your API function
import { toast } from "react-toast"; // Import toast for notifications
import ConfirmationHandler from "./components/ConfirmationHandler"; // Import the new component
import axios from "axios";

const App = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState(null);
  const [formData, setFormData] = useState({});
  const [originalFormData, setOriginalFormData] = useState({});
  const [isChanged, setIsChanged] = useState(false);
  const [lastSubmissionTime, setLastSubmissionTime] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [coffeeShops, setCoffeeShops] = useState([]);

  const handleEditClick = () => {
    setModalOpen(true);
    setOriginalFormData(formData);
  };

  const handleMarkerClick = (feature) => setSelectedFeature(feature);
  const handlePopupClose = () => setSelectedFeature(null);
  const handleSidebarClose = () => setSelectedFeature(null);
  const handleSearchSelect = (shop) => {
    // TODO: close the search bar
    setSelectedFeature(shop);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setIsChanged(false);
  };

  const handleAddClick = () => {
    setModalOpen(true);
    setSelectedFeature(null);
    setFormData({});
    setOriginalFormData({});
    setIsChanged(false);
  };

  const areFieldsFilled = (data) => {
    return (
      data.name.trim() !== "" &&
      data.address.trim() !== "" &&
      data.website.trim() !== ""
    );
  };

  const handleFormSubmit = async (data) => {
    const currentTime = Date.now();

    if (currentTime - lastSubmissionTime < 30000) {
      toast.error("You can only submit a request once per minute.");
      return;
    }

    if (selectedFeature && !isChanged) {
      toast.error("No changes were made to submit an edit request.");
      return;
    }

    if (!selectedFeature && !areFieldsFilled(data)) {
      toast.error("Please fill in all fields before submitting.");
      return;
    }

    await submitCoffeeShopRequest(
      data,
      selectedFeature?.properties,
      selectedFeature?.properties?.id
    );
    setLastSubmissionTime(currentTime);
  };

  useEffect(() => {
    const isFormDataChanged =
      JSON.stringify(formData) !== JSON.stringify(originalFormData);
    setIsChanged(isFormDataChanged);
  }, [formData, originalFormData]);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setIsDarkMode(true);
      document.body.classList.add("dark-mode");
    } else {
      setIsDarkMode(false);
      document.body.classList.remove("dark-mode");
    }
  }, []);

  const handleThemeChange = (isDark) => {
    localStorage.setItem("theme", isDark ? "dark" : "light");
    document.body.classList.toggle("dark-mode", isDark);
    setIsDarkMode(isDark);
  };

  useEffect(() => {
    const fetchCoffeeShops = async () => {
      try {
        const response = await axios.get(
          `https://coffee-map-backend.vercel.app/geojson`
        );
        setCoffeeShops(response.data.features);
      } catch (error) {
        console.error("Error fetching GeoJSON data:", error);
      }
    };

    fetchCoffeeShops();
  }, []);

  return (
    <div className="App">
      <ToastContainer position="top-right" delay={6000} />
      <ConfirmationHandler /> {/* Add the new component */}
      <Header
        coffeeShops={coffeeShops}
        handleSearchSelect={handleSearchSelect}
        onAdd={handleAddClick}
        onThemeChange={handleThemeChange}
      />
      <Map
        coffeeShops={coffeeShops}
        onMarkerClick={handleMarkerClick}
        isDarkMode={isDarkMode}
      />
      <Popup feature={selectedFeature} onClose={handlePopupClose} />
      <Modal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSubmit={handleFormSubmit}
        OriginalformData={formData}
        setFormData={setFormData}
      />
      <Sidebar
        feature={selectedFeature}
        onClose={handleSidebarClose}
        handleOpenModal={handleEditClick}
        setFormData={setFormData}
      />
    </div>
  );
};

export default App;
