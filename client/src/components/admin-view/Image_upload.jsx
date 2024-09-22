import React, { useEffect, useRef } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { CloudUpload, FileImage, X } from "lucide-react";
import { Button } from "../ui/button";
import axios from "axios";
const ProductImageUpload = ({
  imageFile,
  uploadedImageUrl,
  setImageFile,
  setUploadedImageUrl,
}) => {
  const inputRef = useRef(null);
  const handleImageFileChange = (e) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) setImageFile(selectedFile);
  };
  function handleDragOver(e) {
    e.preventDefault();
  }
  function handleDrop(e) {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile) setImageFile(droppedFile);
  }
  function handleRemoveImage() {
    setImageFile(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }
  const uploadImageToCloudinary = async () => {
    const data = new FormData();
    data.append("my_file", imageFile);
    const response = await axios.post(
      "http://localhost:4000/api/admin/products/upload-image",
      data
    );
    console.log(response.data, "upload data response");
    if (response?.data?.success) setUploadedImageUrl(response.data);
  };
  useEffect(() => {
    if (imageFile !== null) uploadImageToCloudinary();
  }, [imageFile]);
  return (
    <div className="w-full max-w-md mx-auto mt-4">
      <Label
        className="text-lg font-semibold mb-2 block"
        onChange={handleImageFileChange}
      >
        Upload Image
      </Label>
      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className="border-2 border-dashed rounded-lg p-4"
      >
        <Input
          ref={inputRef}
          id="image-upload"
          type="file"
          className="hidden"
          onChange={handleImageFileChange}
        />
        {!imageFile ? (
          <Label
            htmlFor="image-upload"
            className="flex flex-col items-center justify-center h-32 cursor-pointer"
          >
            <CloudUpload className="w-10 h-10 text-muted-foreground mb-2 " />
            <span>Drag and drop or click to upload an image</span>
          </Label>
        ) : (
          <div className="flex items-center justify-between ">
            <div className="flex items-center ">
              <FileImage className="w-7 text-primary mr-2 h-8" />
            </div>
            <p className="text-sm font-medium">{imageFile.name}</p>
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-foreground"
              onClick={handleRemoveImage}
            >
              <X className="w-4 h-4" />
              <span className="sr-only">Remove File</span>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductImageUpload;
