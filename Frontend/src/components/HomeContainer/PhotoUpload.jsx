import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { uploadImage } from "@redux/uploadSlice";
import Typography from "../utility/Typography/Typography";
import Button from "../utility/Button/Button";
import { MdCloudUpload } from "react-icons/md";

const PhotoUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError("File size should be less than 5MB");
        setSelectedFile(null);
      } else if (!["image/png", "image/jpeg", "image/jpg"].includes(file.type)) {
        setError("File type should be PNG, JPG, or JPEG");
        setSelectedFile(null);
      } else {
        setError("");
        setSelectedFile(file);
      }
    }
  };

  const handleUpload = () => {
    if (selectedFile) {
      dispatch(uploadImage(selectedFile));
    }
  };

  return (
    <article className="w-full h-full bg-white rounded-lg shadow-sm flex flex-col gap-y-2 p-4">
      <div className="p-2">
        <Typography variant="h2" weight="strong" color="primaryHeading">
          Upload Image
        </Typography>
      </div>
      <div className="flex flex-col items-center gap-y-2">
        <div className="w-full h-48 border-2 border-dotted flex flex-col items-center justify-center cursor-pointer" onClick={() => document.getElementById("fileInput").click()}>
          {selectedFile ? (
            <img src={URL.createObjectURL(selectedFile)} alt="Selected" className="w-full h-full object-cover" />
          ) : (
            <>
              <MdCloudUpload size={48} />
              <Typography variant="body1" weight="medium" color="primary">
                Upload Image
              </Typography>
            </>
          )}
          <input type="file" id="fileInput" className="hidden" onChange={handleFileChange} />
        </div>
        {error && (
          <Typography variant="body2" weight="medium" color="error">
            {error}
          </Typography>
        )}
        <div className="flex gap-x-2 mt-4">
          <Button type="button" elType="secondary" onClick={() => setSelectedFile(null)}>
            Cancel
          </Button>
          <Button type="button" elType="primary" onClick={handleUpload}>
            Confirm
          </Button>
        </div>
      </div>
    </article>
  );
};

export default PhotoUpload;