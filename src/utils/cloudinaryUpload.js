// src/utils/cloudinaryUpload.js
import axios from "axios";

/**
 * Get a Cloudinary signature for authenticated uploads.
 * param {string} folder - Cloudinary folder name where the image will be stored.
 * returns {Promise<Object>} Signature data from backend.
 */
export const getCloudinarySignature = async (folder = "uploads") => {
  try {
    const res = await axios.get(`http://localhost:5000/api/cloudinary/signature?folder=${folder}`);
    return res.data; // { timestamp, signature, cloudName, apiKey }
  } catch (error) {
    console.error("Error fetching Cloudinary signature:", error);
    throw new Error("Failed to get Cloudinary signature");
  }
};

/**
 * Upload multiple images to Cloudinary.
 * param {File[]} imageFiles - Array of image files.
 * param {Object} signatureData - Data from getCloudinarySignature().
 * param {string} [folder="uploads"] - Optional folder name.
 * returns {Promise<Array>} Array of uploaded image details (public_id & url).
 */
export const uploadImagesToCloudinary = async (imageFiles, signatureData, folder = "uploads") => {
  const { timestamp, signature, cloudName, apiKey } = signatureData;
  const uploadedImages = [];

  for (const image of imageFiles) {
    const formData = new FormData();
    formData.append("file", image);
    formData.append("api_key", apiKey);
    formData.append("timestamp", timestamp);
    formData.append("signature", signature);
    formData.append("folder", folder);

    try {
      const uploadRes = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        formData
      );

      uploadedImages.push({
        public_id: uploadRes.data.public_id,
        url: uploadRes.data.secure_url,
      });
    } catch (error) {
      console.error("Error uploading to Cloudinary:", error);
      throw new Error("Image upload failed");
    }
  }

  return uploadedImages;
};

/**
 * Helper function to upload a single image.
 */
export const uploadSingleImageToCloudinary = async (file, folder = "uploads") => {
  const signatureData = await getCloudinarySignature(folder);
  const uploaded = await uploadImagesToCloudinary([file], signatureData, folder);
  return uploaded[0]; // returns one image { public_id, url }
};
