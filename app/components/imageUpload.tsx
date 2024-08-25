import imageCompression from "browser-image-compression";
import React, { ChangeEvent, useState } from "react";

const ImageUpload: React.FC = () => {
  const [images, setImages] = useState<string[]>([]);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const fileUrls = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      );
      setImages((prevImages) => [...prevImages, ...fileUrls]);
    }
  };

  const handleRemoveImage = (index: number) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const upload = async () => {
    // copress the images and show the stats
    const options = {
      maxSizeMB: 0.25,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };
    const compressedImages = await Promise.all(
      images.map(async (fileObjURL) => {
        const compressedFile = await imageCompression(fileObjURL, options);
        return compressedFile;
      }),
    );

    console.log(compressedImages);
  };

  return (
    <>
      <button
        className="bg-white border-white mb-4 rounded-sm text-black p-3"
        onClick={upload}
      >
        Upload the things
      </button>
      <div className="p-4 max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Upload Exam papers</h1>
        <div className="mb-4">
          <ChooseImageLabel />
          <div className="flex items-center justify-center w-full">
            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-400">
              <DownArrow />
              <span className="text-gray-600 mt-2">
                Drag & drop or click to upload
              </span>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageChange}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
            </label>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((img, index) => (
            <div
              key={index}
              className="relative w-full h-48 bg-gray-200 flex items-center justify-center rounded-lg overflow-hidden"
            >
              <img
                src={img}
                alt={`Uploaded #${index}`}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => handleRemoveImage(index)}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                aria-label="Remove image"
              >
                <DeleteIcon />
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

function DeleteIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-4 h-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  );
}

function DownArrow() {
  return (
    <svg
      className="w-12 h-12 text-gray-400"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M19 9l-7 7-7-7"
      >
      </path>
    </svg>
  );
}

function ChooseImageLabel() {
  return (
    <label className="block text-sm font-medium text-gray-700 mb-2">
      Choose images:
    </label>
  );
}

export default ImageUpload;
