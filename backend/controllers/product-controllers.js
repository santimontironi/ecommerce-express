import Product from "../models/products.js";
import cloudinary from "../middlewares/cloudinary.js";

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
    const { name, description, price } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "No se recibió ninguna imagen" });
    }

    // Convertir el buffer a base64
    const fileBase64 = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;

    // Subir a Cloudinary directamente desde memoria
    const result = await cloudinary.uploader.upload(fileBase64, {
      folder: "productos",
    });

    const nuevoProducto = {
      name,
      description,
      price: Number(price),
      image: result.secure_url,
    };

    const product = new Product(nuevoProducto);
    await product.save();

    res.status(201).json({
      message: "✅ Producto agregado correctamente",
      product: nuevoProducto,
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