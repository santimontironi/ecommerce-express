import Admin from "../models/admin.js"
import bcrypt from "bcrypt"
import dotenv from "dotenv"
import jwt from 'jsonwebtoken'

dotenv.config();

export const createAdmin = async () => {
  try {

    const username = process.env.ADMIN_USERNAME;
    const password = process.env.ADMIN_PASSWORD;

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

export const dashboardAdmin = async (req, res) => {
  try {
    const adminId = req.adminId
    const admin = await Admin.findById(adminId)

    return res.status(200).json({ authenticated: true, admin })
  }
  catch (error) {
    return res.status(500).json({ message: "Error interno del servidor" });
  }
}

export const logoutAdmin = async (req, res) => {
  try {
    res.clearCookie("token",{
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax"
    })
    return res.status(200).json({ message: "Cierre de sesión exitoso" });
  }
  catch (error) {
    return res.status(500).json({ message: "Error interno del servidor", error: error.message });
  }

};






