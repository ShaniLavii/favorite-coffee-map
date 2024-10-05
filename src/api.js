import { toast } from "react-toast"; // Import toast for notifications

export const submitCoffeeShopRequest = async (formData, originalData) => {
  try {
    // Prepare the email body
    const emailBody = createEmailBody(formData, originalData);

    // Send formData and emailBody to backend API
    const response = await fetch(
      "http://localhost:3001/api/submit-coffeeshop-request",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ formData, emailBody }), // Send both form data and email body
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
const createEmailBody = (formData, originalData) => {
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

    Accept: [Accept Link](http://localhost:3001/api/accept-request?id=${
      formData.id
    }&type=${originalData ? "edit" : "new"})
    Reject: [Reject Link](http://localhost:3001/api/reject-request?id=${
      formData.id
    })
  `;
};
