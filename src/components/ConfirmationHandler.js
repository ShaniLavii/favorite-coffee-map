import React, { useEffect, useState } from "react";
import { toast } from "react-toast";

const ConfirmationHandler = () => {
  const [confirmationMessage, setConfirmationMessage] = useState("");

  useEffect(() => {
    const handleRequest = async () => {
      // Get the full URL and extract parameters from the path and query string
      const urlParams = new URLSearchParams(window.location.search);
      const pathname = window.location.pathname; // Get the URL path

      // Extract the action ('accept' or 'reject') from the path
      const action = pathname.split("/").pop(); // Extract last part of path, either 'accept' or 'reject'
      const id = urlParams.get("id");
      const encodedChanges = urlParams.get("changes"); // Encoded form data

      console.log(action, id, encodedChanges);

      if (action && id) {
        const changes = encodedChanges
          ? JSON.parse(decodeURIComponent(encodedChanges))
          : null;

        // Add 'type' to the payload, since it's part of the URL query parameters
        const payload = { id, changes, type: urlParams.get("type") };
        const endpoint =
          action === "accept" ? "api/accept-request" : "api/reject-request";

        try {
          //   const response = await fetch(`http://localhost:3000/${endpoint}`, {
          const response = await fetch(
            `https://coffee-map-backend.vercel.app/${endpoint}`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(payload), // Send structured JSON
            }
          );

          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }

          const responseData = await response.json();
          const actionMessage = action === "accept" ? "accepted" : "rejected";
          toast.success(`Request ${actionMessage} successfully.`);
          setConfirmationMessage(`Request ${actionMessage} successfully.`);
        } catch (error) {
          console.error("Error processing the request:", error);
          toast.error("An error occurred while processing your request.");
          setConfirmationMessage(
            "An error occurred while processing your request."
          );
        }
      }
    };

    handleRequest();
  }, []);

  return <div>{confirmationMessage && <p>{confirmationMessage}</p>}</div>;
};

export default ConfirmationHandler;
