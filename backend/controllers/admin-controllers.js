import Admin from "../models/admin.js"
import bcrypt from "bcrypt"

export const registerAdmin = async (req, res) => {
    try{
        const {username,password} = req.body

        const salt = await bcrypt.genSalt(10) //genera un "salt" con 10 rondas de complejidad.
        const hashedPassword = await bcrypt.hash(password,salt)

        const admin = new Admin({
            userName: username,
            password: hashedPassword
        })

        await admin.save()
    }
    catch(error){
        return res.json({message: 'Error al iniciar sesión', error: error.message})
    }
}

export const loginAdmin = async (req, res) => {
    try{
        const {username,password} = req.body

        const admin = await Admin.findOne({userName: username})

        if(!admin){
            return res.json({message: 'El usuario no existe'})
        }

        const isMatch = await bcrypt.compare(password,admin.password)

        if(!isMatch){
            return res.json({message: 'Contraseña incorrecta'})
        }

        return res.json({message: 'Inicio de sesión exitoso'})
    }
    catch(error){
        return res.json({message: 'Error al iniciar sesión', error: error.message})
    }
}