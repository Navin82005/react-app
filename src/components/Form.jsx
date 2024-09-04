import React, { Fragment, useState } from "react";
import FileUploader from "./FileUploader";
import { insertServiceData } from "../services/insert_service_data";
import { ClimbingBoxPreLoader } from "./PreLoader";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Form = () => {
  const labelStyle = {
    fontSize: "16px",
    fontWeight: 600,
    marginBottom: "8px",
    display: "block",
  };
  const subLabelStyle = {
    fontSize: "16px",
    fontWeight: 500,
    marginBottom: "8px",
    display: "block",
    color: "#4F4B68",
  };
  const inputStyle = {
    display: "block",
    fontSize: "16px",
    fontWeight: "500",
    width: "100%",
    padding: "10px",
  };

  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    capacity: "",
    price: 0,
    amenities: [],
    safetyFeatures: [],
    meals: [],
    photo: [], // Initialize as an array
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked, value } = e.target;
    setFormData((prevData) => {
      if (checked) {
        return { ...prevData, [name]: [...prevData[name], value] };
      } else {
        return {
          ...prevData,
          [name]: prevData[name].filter((item) => item !== value),
        };
      }
    });
  };

  const handleFileChange = (files) => {
    setFormData((prevData) => ({
      ...prevData,
      photo: Array.from(files), // Convert FileList to an array
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Adjust the structure if needed for Firebase storage
    const dataToSubmit = {
      ...formData,
      photo: formData.photo, // Ensure this is correctly formatted if needed
    };

    let success = false;
    try {
      await insertServiceData("boatService", dataToSubmit);
      success = true;
    } catch (error) {
      console.error("Error submitting form data:", error);
      success = false;
    } finally {
      setIsLoading(false);
      if (success) {
        toast.success('Data inserted successfully!', {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
          // transition: Bounce,
        });
      } else {
        toast.error('Data insertion failed!', {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
          // transition: Bounce,
        });
      }
    }
  };

  return (
    <Fragment>
      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
        theme="light"
      // transition:Bounce
      />
      {isLoading && <ClimbingBoxPreLoader />}
      <form onSubmit={handleSubmit} style={{ padding: "20px" }}>
        <h2 style={{ marginTop: "-15px" }}>Add Boat</h2>
        <div style={{ marginBottom: "20px" }}>
          <label style={labelStyle}>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Enter the name of the boat"
            style={{
              fontFamily: "montserrat",
              display: "block",
              fontSize: "16px",
              fontWeight: "500",
              width: "70%",
              padding: "10px",
              border: "1px solid #D1D0DD",
              borderRadius: "8px",
            }}
          />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label style={labelStyle}>Capacity</label>
          <input
            type="number"
            name="capacity"
            value={formData.capacity}
            onChange={handleInputChange}
            placeholder="Enter number of seats on the boat"
            style={{
              fontFamily: "montserrat",
              display: "block",
              fontSize: "16px",
              fontWeight: "500",
              width: "40%",
              padding: "10px",
              border: "1px solid #D1D0DD",
              borderRadius: "8px",
            }}
          />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label style={labelStyle}>Amount per head</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            placeholder="Enter amount"
            style={{
              fontFamily: "montserrat",
              display: "block",
              fontSize: "16px",
              fontWeight: "500",
              width: "70%",
              padding: "10px",
              border: "1px solid #D1D0DD",
              borderRadius: "8px",
            }}
          />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label style={labelStyle}>Photo</label>
          <FileUploader onFileChange={handleFileChange} />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label style={labelStyle}>Amenities</label>
          <label style={subLabelStyle}>
            Select the amenities available on your boat to enhance passenger
            comfort and experience.
          </label>
          <div>
            {[
              "Clean Restrooms",
              "Comfortable Sitting arrangements",
              "Onboarding Dining",
              "Wi-Fi Access",
              "Entertainment System",
              "Air Conditioning/Climate Control",
            ].map((amenity) => (
              <label key={amenity} style={inputStyle}>
                <input
                  type="checkbox"
                  name="amenities"
                  value={amenity}
                  onChange={handleCheckboxChange}
                />{" "}
                {amenity}
              </label>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label style={labelStyle}>Safety Features</label>
          <label style={subLabelStyle}>
            Select the safety features available on your boat to enhance passenger safety.
          </label>
          <div>
            {[
              "Live food provided to all passengers", // Confirm this is a safety feature
              "Emergency Kit onboard",
              "Fire Extinguishers",
            ].map((feature) => (
              <label key={feature} style={inputStyle}>
                <input
                  type="checkbox"
                  name="safetyFeatures"
                  value={feature}
                  onChange={handleCheckboxChange}
                />{" "}
                {feature}
              </label>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label style={labelStyle}>Meals</label>
          <label style={subLabelStyle}>
            Select the available meals on your boat.
          </label>
          <div>
            {["Veg/Non veg", "Pure Veg"].map((meal) => (
              <label key={meal} style={inputStyle}>
                <input
                  type="checkbox"
                  name="meals"
                  value={meal}
                  onChange={handleCheckboxChange}
                />{" "}
                {meal}
              </label>
            ))}
          </div>
        </div>

        <button
          type="submit"
          style={{
            backgroundColor: "#1E79E1",
            color: "#fff",
            borderRadius: "8px",
            padding: "10px 20px",
            fontSize: "16px",
            border: "none",
            cursor: "pointer",
          }}
        >
          Save
        </button>
      </form>
    </Fragment>
  );
};

export default Form;
