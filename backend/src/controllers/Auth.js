import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET;

export function generateToken(req, res) {
  const { client_id, client_secret } = req.body;

  if (client_id === process.env.CLIENT_ID && client_secret === process.env.CLIENT_SECRET) {
    const token = jwt.sign({ client_id }, SECRET_KEY, { expiresIn: "1h" });

    return res.json({
      status: "success",
      token_type: "Bearer",
      token: token,
    });
  }
  
  return res.status(401).json({
    status: "error",
    message: "Credencias inválidas."
  });
};