import app from "./app.js";
import dotenv from "dotenv";

dotenv.config();

const PORT: string = process.env.PORT || "3000";

app.listen(PORT, (): void => {
  console.log(`⚙️ Server running at http://localhost:${PORT}`);
});