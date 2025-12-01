import express, { Application } from "express";
import { connectDB } from "./src/config/database.js";
import routes from "./src/routes/index.js";
import { errorHandler } from "./src/middlewares/errorHandler.js";
import cors from "cors";

const app: Application = express();

app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());
connectDB();
app.use("/", routes);
app.use(errorHandler);

export default app;