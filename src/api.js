import { toast } from "react-toast"; // Import toast for notifications

export const submitCoffeeShopRequest = async (
  formData,
  originalData,
  featureId
) => {
  try {
    // Prepare the email body
    const emailBody = createEmailBody(formData, originalData, featureId);
    console.log(emailBody); // Log the email body for debugging
    console.log(featureId);

    // Send the complete data (including formData, emailBody, and featureId) to the backend API
    const response = await fetch(
      "http://localhost:3000/api/submit-coffeeshop-request",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ emailBody, featureId }), // Send all necessary data
      }
    );

    if (response.ok) {
      toast.success("Your request has been submitted and is pending approval.");
    } else {
      toast.error(
        "There was an issue with submitting your request. Please try again."
      );
    }
  } catch (error) {
    toast.error("An error occurred. Please try again later.");
  }
};

// Function to create the email body with submitted data and differences
const createEmailBody = (formData, originalData, featureId) => {
  const changes = Object.keys(formData).reduce((acc, key) => {
    if (originalData && originalData[key] !== formData[key]) {
      acc.push(`${key}: ${originalData[key]} -> ${formData[key]}`);
    }
    return acc;
  }, []);

  const changeSummary =
    changes.length > 0 ? `Changes:\n${changes.join("\n")}` : "No changes made.";

  console.log(formData);
  console.log(changeSummary);

  return `
    Submitted Data:
    Name: ${formData.name}
    Address: ${formData.address}
    Website: ${formData.website}
    Price Range: ${formData.price_range}
    Rating: ${formData.rating}
    Inside Sitting: ${formData.inside_sitting}
    Outside Sitting: ${formData.outside_sitting}
    Description: ${formData.description}
    Image: ${formData.image}
    
    ${changeSummary}

    Accept: (http://localhost:3000/api/accept-request?id=${featureId}&type=${
    originalData ? "edit" : "new"
  })
    Reject: (http://localhost:3000/api/reject-request?id=${featureId})
  `;
};
