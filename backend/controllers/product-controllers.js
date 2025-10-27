import Product from "../models/products.js";

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
    return res.status(500).json({ message: "Error interno del servidor" });
  }
}

export const addProduct = async (req, res) => {
  try {
    const { name, description, price, stock } = req.body
    const image  = req.file?.filename

    const product = new Product({
      image,
      name,
      description,
      price,
      stock
    })

    await product.save()
  }
  catch (error) {
    return res.json({ message: 'Error al agregar un producto', error: error.message })
  }
}

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