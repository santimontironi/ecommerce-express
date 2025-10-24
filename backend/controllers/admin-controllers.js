import Admin from "../models/admin.js"
import Product from "../models/products.js"
import bcrypt from "bcrypt"
import dotenv from "dotenv"
import jwt from 'jsonwebtoken'

const createAdmin = async () => {
  try {

    const username = dotenv.config().parsed.ADMIN_USERNAME;
    const password = dotenv.config().parsed.ADMIN_PASSWORD;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const admin = new Admin({ username, password: hashedPassword });
    await admin.save();

    console.log("Administrador creado!");

  } catch (error) {
    console.error(error);
  }
};

export const loginAdmin = async (req, res) => {
  try {

    const { username, password } = req.body;
    const admin = await Admin.findOne({ username });

    if (!admin) {
      return res.status(401).json({ message: "Credenciales incorrectas" });
    }

    const isPasswordValid = await bcrypt.compare(password, admin.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Credenciales incorrectas" });
    }

    const token = jwt.sign(
      { id: admin._id }, //payload, datos del usuario
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    )

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', //es true cuando estamos en https, en desarollo es http
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", //lax es para que se envie el cookie en el mismo dominio (localhost), y none es para que sea en diferentes
      maxAge: 86400000
    });

    return res.status(200).json({ message: "Inicio de sesión exitoso", admin });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const dashboardAdmin = async (req,res) => {
  try{
    const adminId = req.adminId
    const admin = await Admin.findById(adminId)

    return res.status(200).json({authenticated: true, admin})
  }
  catch(error){
    return res.status(500).json({ message: "Error interno del servidor" });
  }
}

export const getAllProducts = async (req,res) => {
  try{
    const products = await Product.find({active:true})
    return res.status(200).json({products})
  }
  catch(error){
    return res.status(500).json({ message: "Error interno del servidor" });
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

export const logoutAdmin = async (req, res) => {
  res.clearCookie("token");
  return res.status(200).json({ message: "Cierre de sesión exitoso" });
};

export const addProduct = async (req, res) => {
  try {
    const { name, description, price, stock } = req.body
    const { image } = req.file

    const product = new Product({
      image,
      title: name,
      description,
      price,
      category
    })

    await product.save()
  }
  catch (error) {
    return res.json({ message: 'Error al agregar un producto', error: error.message })
  }
}




