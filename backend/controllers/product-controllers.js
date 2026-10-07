import Product from "../models/products.js";
import cloudinary from "../middlewares/cloudinary.js";

// https://res.cloudinary.com/<cloud>/image/upload/v123/productos/abc.jpg -> "productos/abc"
// Devuelve null si la imagen no está en Cloudinary (ej: productos viejos de /uploads)
export const getCloudinaryPublicId = (url = "") => {
  if (!url.includes("res.cloudinary.com")) return null;
  const match = url.match(/\/upload\/(?:v\d+\/)?(.+)\.[^./]+$/);
  return match ? match[1] : null;
};

export const getAllProducts = async (req,res) => {
  try{
    const products = await Product.find()
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
    if (!product) {
      return res.status(404).json({ message: "Producto no encontrado" })
    }
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
      product: product,
    });


  } catch (error) {
    console.error("Error al subir producto:", error);
    res.status(500).json({ message: "Error al agregar producto", error });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { productId } = req.params;

    const product = await Product.findByIdAndDelete(productId);

    if (!product) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    // Si falla Cloudinary el producto igual queda borrado: la imagen huérfana no rompe nada
    const publicId = getCloudinaryPublicId(product.image);
    if (publicId) {
      try {
        await cloudinary.uploader.destroy(publicId);
      } catch (error) {
        console.error(`Error al eliminar la imagen ${publicId} de Cloudinary:`, error);
      }
    }

    return res.status(200).json({ message: "Producto eliminado exitosamente", product });
  } catch (error) {
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};