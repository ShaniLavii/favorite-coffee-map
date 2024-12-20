import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Map from "./components/Map";
import Popup from "./components/Popup";
import Modal from "./components/Modal";
import Sidebar from "./components/Sidebar";
import { ToastContainer } from "react-toast"; // Importing only ToastContainer
import { submitCoffeeShopRequest } from "./api"; // Import your API function
import { toast } from "react-toast"; // Import toast for notifications

const App = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState(null);
  const [formData, setFormData] = useState({});
  const [originalFormData, setOriginalFormData] = useState({}); // Store the initial data
  const [isChanged, setIsChanged] = useState(false); // Track if changes were made
  const [lastSubmissionTime, setLastSubmissionTime] = useState(0); // Track last submission time
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleEditClick = () => {
    setModalOpen(true);
    setOriginalFormData(formData); // Set original data when editing
  };

  const handleMarkerClick = (feature) => setSelectedFeature(feature);
  const handlePopupClose = () => setSelectedFeature(null);
  const handleSidebarClose = () => setSelectedFeature(null);

  const handleModalClose = () => {
    setModalOpen(false);
    setIsChanged(false); // Reset change tracker on close
  };

  const handleAddClick = () => {
    setModalOpen(true);
    setSelectedFeature(null); // Clear selected feature
    setFormData({});
    setOriginalFormData({}); // Reset original form data for adding a new item
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

    // Check if submission is allowed based on time
    if (currentTime - lastSubmissionTime < 30000) {
      toast.error("You can only submit a request once per minute.");
      return;
    }

    // Check if this is an edit request and if changes were made
    if (selectedFeature && !isChanged) {
      toast.error("No changes were made to submit an edit request.");
      return;
    }

    // For adding a new coffee shop, check if all fields are filled
    if (!selectedFeature && !areFieldsFilled(data)) {
      toast.error("Please fill in all fields before submitting.");
      return;
    }

    // Submit the request
    await submitCoffeeShopRequest(data);
    setLastSubmissionTime(currentTime); // Update last submission time
  };

  useEffect(() => {
    // Compare formData with originalFormData to check if changes were made
    const isFormDataChanged =
      JSON.stringify(formData) !== JSON.stringify(originalFormData);
    console.log(isFormDataChanged);
    setIsChanged(isFormDataChanged);
  }, [formData, originalFormData]);

  useEffect(() => {
    // Check for saved theme preference in localStorage
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
    // Update the theme in localStorage and the body class
    localStorage.setItem("theme", isDark ? "dark" : "light");
    document.body.classList.toggle("dark-mode", isDark);
    setIsDarkMode(isDark);
  };

  return (
    <div className="App">
      <ToastContainer position="top-right" delay={6000} />

      <Header onAdd={handleAddClick} onThemeChange={handleThemeChange} />
      <Map onMarkerClick={handleMarkerClick} isDarkMode={isDarkMode} />
      <Popup feature={selectedFeature} onClose={handlePopupClose} />
      <Modal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSubmit={handleFormSubmit}
        OriginalformData={formData}
        setFormData={setFormData} // Pass down setFormData to Modal
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
