import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

export const uploadToCloudinary = async (filePath) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: "nunoImagenes",
    });
    
    // Elimina el archivo local una vez subido
    fs.unlinkSync(filePath);

    return result.secure_url; // URL pública de la imagen
  } catch (error) {
    console.error("Error subiendo a Cloudinary:", error);
    throw error;
  }
};