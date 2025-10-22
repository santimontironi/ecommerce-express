import Product from "../models/products.js"

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