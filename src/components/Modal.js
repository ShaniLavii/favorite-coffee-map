import React, { useState, useEffect } from "react";
// import ImageUpload from "./ImageUpload";
import { toast } from "react-toast";

const Modal = ({ isOpen, onClose, onSubmit, OriginalformData }) => {
  const edit = !!(OriginalformData && OriginalformData.name);
  const toBoolean = (value) => {
    return value === "true" || value === true;
  };

  const initialFormData = {
    name: OriginalformData?.name || "",
    address: OriginalformData?.address || "",
    website: OriginalformData?.website || "",
    price_range: OriginalformData?.price_range || "$",
    rating: parseFloat(OriginalformData?.rating) || 1,
    inside_sitting: toBoolean(OriginalformData?.inside_sitting || false),
    outside_sitting: toBoolean(OriginalformData?.outside_sitting || false),
    description: OriginalformData?.description || "",
    image: OriginalformData?.image || "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [errorMessage, setErrorMessage] = useState("");

  const priceLabels = ["$", "$$", "$$$", "$$$$", "$$$$$"];

  useEffect(() => {
    setFormData(initialFormData);
    setErrorMessage(""); // Reset error message when form data changes
  }, [OriginalformData]);

  const handleChangeRating = (newRating) => {
    setFormData({ ...formData, rating: newRating });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if at least one relevant field is filled when adding a new coffee shop
    const isAddingNewShop = !edit;
    const isAllFieldsFilled =
      formData.name.trim() !== "" &&
      formData.address.trim() !== "" &&
      formData.website.trim() !== "";

    if (isAddingNewShop && !isAllFieldsFilled) {
      toast.error(
        "Please fill in at least the Name, Address and Website fields before submitting."
      ); // Show error message
      return;
    }

    // Submit form data
    onSubmit(formData);

    // Reset the form data to original values after submission
    if (edit) {
      setFormData(initialFormData);
    }

    onClose();
  };

  const isChecked = (star) => {
    return star <= Math.round(formData.rating);
  };

  if (!isOpen) return null;

  return (
    <div id="modal" className="modal">
      <div className="modal_content">
        <span className="close" id="close-modal" onClick={onClose}>
          &times;
        </span>
        <h2 className="modal-title">
          <img
            className="coffee-image"
            src="/static/images/icons/latte.png"
            alt="Coffee"
          />
          {edit ? "Edit Coffee Shop Details" : "Add New Coffee Shop"}
        </h2>

        {/* Display error message if there is one */}
        {errorMessage && <div className="error-toast">{errorMessage}</div>}

        <form id="add-shop-form" onSubmit={handleSubmit}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />

          <label htmlFor="address">Address:</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />

          <label htmlFor="website">Website:</label>
          <input
            type="url"
            id="website"
            name="website"
            value={formData.website}
            onChange={handleChange}
          />

          <div className="price-range-container">
            <input
              type="range"
              id="price_range"
              name="price_range"
              min="1"
              max="5"
              step="1"
              value={formData.price_range}
              onChange={handleChange}
              className="price-slider"
            />
            <div className="price-labels">
              {priceLabels.map((label, index) => (
                <span
                  key={index}
                  className={`price-label ${
                    formData.price_range == index + 1 ? "active" : ""
                  }`}
                >
                  {label}
                </span>
              ))}
            </div>
          </div>

          <div className="rating-container">
            <label htmlFor="rating" className="rating-label">
              <span id="rating-value">{formData.rating}</span>
            </label>

            <div className="rating">
              {[1, 2, 3, 4, 5].map((star) => (
                <div
                  key={star}
                  className={`star-container ${
                    formData.rating >= star ? "selected" : ""
                  }`}
                  onClick={() => handleChangeRating(star)} // Updates the rating
                  title={`${star} star${star > 1 ? "s" : ""}`}
                >
                  <svg
                    viewBox="0 0 576 512"
                    height="1em"
                    xmlns="http://www.w3.org/2000/svg"
                    className="star-solid"
                  >
                    <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"></path>
                  </svg>
                </div>
              ))}
            </div>
          </div>

          <div className="checkbox-wrapper-46">
            <input
              id="inside_sitting"
              name="inside_sitting"
              type="checkbox"
              checked={formData.inside_sitting}
              onChange={handleChange}
              className="inp-cbx"
            />
            <label htmlFor="inside_sitting" className="cbx">
              <span>
                <svg viewBox="0 0 12 10" height="10px" width="12px">
                  <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                </svg>
              </span>
              <span>Inside Sitting</span>
            </label>
          </div>

          <div className="checkbox-wrapper-46">
            <input
              id="outside_sitting"
              name="outside_sitting"
              type="checkbox"
              checked={formData.outside_sitting}
              onChange={handleChange}
              className="inp-cbx"
            />
            <label htmlFor="outside_sitting" className="cbx">
              <span>
                <svg viewBox="0 0 12 10" height="10px" width="12px">
                  <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                </svg>
              </span>
              <span>Outside Sitting</span>
            </label>
          </div>

          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
          ></textarea>

          <label htmlFor="image">Image URL:</label>
          {/* <ImageUpload formData={formData} setFormData={setFormData} /> */}

          <div className="button_container">
            <a
              className="button type--A"
              href="#"
              onClick={(e) => handleSubmit(e)}
            >
              <div className="button__line"></div>
              <div className="button__line"></div>
              <span className="button__text">Submit</span>
              <div className="button__drow1"></div>
              <div className="button__drow2"></div>
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
