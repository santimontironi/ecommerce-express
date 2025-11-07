import Product from "../models/products.js";

import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const getAllProducts = async (req,res) => {
  try{
    const products = await Product.find({active:true})
    return res.status(200).json({products})
  }
  catch(error){
    return res.status(500).json({ message: "Error interno del servidor" });
  }
}

export const getProductById = async (req,res) => {
  try{
    const {productId} = req.params
    const product = await Product.findById(productId)
    return res.status(200).json({product})
  }
  catch(error){
    return res.status(500).json({ message: "Error interno del servidor", error: error.message });
  }
}

export const addProduct = async (req, res) => {
  try {
    const { nombre, descripcion, precio } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "No se recibió ninguna imagen" });
    }

    // Subimos a Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "productos",
    });

    // Eliminamos archivo local
    fs.unlinkSync(req.file.path);

    // Guardamos URL segura
    const nuevoProducto = {
      nombre,
      descripcion,
      precio,
      imagen: result.secure_url,
    };

    // Ejemplo: await db.query('INSERT INTO productos SET ?', nuevoProducto);

    res.status(201).json({
      message: "✅ Producto agregado correctamente",
      producto: nuevoProducto,
    });
  } catch (error) {
    console.error("Error al subir producto:", error);
    res.status(500).json({ message: "Error al agregar producto", error });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { productId } = req.params;

    const product = await Product.findByIdAndUpdate(
      productId,
      { active: false }
    );

    if (!product) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    return res.status(200).json({ message: "Producto desactivado exitosamente", product });
  } catch (error) {
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};