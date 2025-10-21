import Admin from "../models/admin.js"
import Product from "../models/products.js"
import bcrypt from "bcrypt"
import dotenv from "dotenv"

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

    return res.status(200).json({ message: "Inicio de sesión exitoso" });
    
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const addProduct = async (req,res) => {
    try{
        const {name, description, price, stock, category} = req.body
        const {image} = req.file

        const product = new Product({
            image,
            title: name,
            description,
            price,
            stock,
            category
        })

        await product.save()
    }
    catch(error){
        return res.json({message: 'Error al agregar un producto', error: error.message})
    }
}




