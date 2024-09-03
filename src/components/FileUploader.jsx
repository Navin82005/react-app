import { useRef } from "react";
import { FileInput, Label } from "flowbite-react";
import CloudIcon from "../assets/icons/CloudIcon";

const FileUploader = ({ onFileChange }) => {
  const fileInputRef = useRef(null);

  // Handler to manage file input change
  const handleFileChange = (event) => {
    const files = Array.from(event.target.files); // Convert FileList to Array
    if (files.length > 3) {
      alert("You can only upload a maximum of 3 files.");
      fileInputRef.current.value = ""; // Reset file input if more than 3 files
      return;
    }
    onFileChange(files); // Pass the selected files to the parent component
  };

  // Handler to trigger file input click
  const handleClick = () => {
    fileInputRef.current?.click(); // Safely access the input ref and trigger click
  };

  return (
    <div
      style={{
        display: "flex",
        width: "50%",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Label
        htmlFor="dropzone-file"
        style={{
          display: "flex",
          height: "16rem",
          width: "100%",
          cursor: "pointer",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "0.375rem",
          border: "2px dashed",
          borderColor: "#d1d5db",
          backgroundColor: "#f9fafb",
          transition: "background-color 0.3s",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = "#f3f4f6";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = "#f9fafb";
        }}
        onClick={handleClick} // Use a dedicated click handler
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            paddingBottom: "1.5rem",
            paddingTop: "1.25rem",
          }}
        >
          <CloudIcon />
          <p
            style={{
              marginBottom: "0.5rem",
              fontSize: "0.875rem",
              color: "#6b7280",
            }}
          >
            <span style={{ fontWeight: "600" }}>Click to upload</span> or drag
            and drop
          </p>
          <p style={{ fontSize: "0.75rem", color: "#6b7280" }}>
            SVG, PNG, JPG, or GIF up to 1MB.
          </p>
        </div>
        <FileInput
          id="dropzone-file"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileChange} // Handler for file change
          multiple
          accept="image/svg+xml, image/png, image/jpeg, image/gif"
        />
      </Label>
    </div>
  );
};

export default FileUploader;
