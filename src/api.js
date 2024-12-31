import { toast } from "react-toast"; // Import toast for notifications

export const submitCoffeeShopRequest = async (
  formData,
  originalData,
  featureId
) => {
  try {
    // Prepare the JSON payload
    const payload = createRequestPayload(formData, originalData, featureId);

    // Send the complete data (including formData, originalData, changes, and featureId) to the backend API
    const response = await fetch(
      // "http://localhost:3000/api/submit-coffeeshop-request",
      `${process.env.REACT_APP_BE_HOST}/api/submit-coffeeshop-request`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload), // Send structured JSON
      }
    );

    if (response.ok) {
      toast.success("Your request has been submitted and is pending approval.");
    } else {
      const errorData = await response.json();
      toast.error(
        `There was an issue submitting your request: ${errorData.error}`
      );
    }
  } catch (error) {
    toast.error("An error occurred. Please try again later.");
  }
};

// Function to create the JSON payload for the backend
const createRequestPayload = (formData, originalData, featureId) => {
  const changes = Object.keys(formData).reduce((acc, key) => {
    if (originalData && originalData[key] !== formData[key]) {
      acc[key] = {
        original: originalData[key],
        updated: formData[key],
      };
    }
    return acc;
  }, {});

  return {
    formData, // Submitted data
    originalData, // Original data (for reference)
    featureId, // Unique identifier
    changes, // Changes summary
  };
};
