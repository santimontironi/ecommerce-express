import app from "./app.js";
import { connectDB } from "./bd/bd.js";
import dotenv from "dotenv";

dotenv.config();

export async function startServer() {
  try {
    await connectDB();
    const PORT = process.env.PORT || 3000;

    console.log("Servidor iniciado correctamente");

    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en el puerto ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Error al iniciar el servidor:", error.message);
    process.exit(1);
  }
}

