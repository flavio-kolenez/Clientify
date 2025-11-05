import express from "express"
import { connectDB } from "./src/config/database.js"
import routes from "./src/routes/index.js"
import { errorHandler } from "./src/middlewares/errorHandler.js"
import cors from "cors"

const app = express()

app.use(cors({
  origin: "http://localhost:5173", // o endereço do teu front
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json())

// 🧩 Conectar ao MongoDB
connectDB()

// 🛣️ Rotas
app.use("/", routes)

// 🚨 Middleware global de erro
app.use(errorHandler)

export default app
