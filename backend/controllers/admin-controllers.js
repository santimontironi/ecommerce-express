import Admin from "../models/admin.js"
import Product from "../models/products.js"
import bcrypt from "bcrypt"

const loginAdmin = async () => {
  try {

    const username = "torines2025";
    const password = "mayonesanatura";

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const admin = new Admin({ username, password: hashedPassword });
    await admin.save();

    console.log("Administrador creado!");
   
  } catch (error) {
    console.error(error);
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




