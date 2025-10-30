import express from "express";
import { connectDB } from "./src/config/database.js";
import routes from "./src/routes/index.js";
import { errorHandler } from "./src/middlewares/errorHandler.js";

const app = express();

app.use(express.json());

// Conectar ao MongoDB
connectDB();

// // Rotas
app.use("/", routes);

// // Middleware global de erro
app.use(errorHandler);

export default app;
