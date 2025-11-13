import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET;

export function authMiddleware(req, res, next) {
	const authHeader = req.headers.authorization;

	// se nao vier token envia um erro ja tlg
	if (!authHeader) {
		return res.status(401).json({
			status: "error",
			message: "Token de autenticação não fornecido."
		});
	};

	const [type, token] = authHeader.split(" ");

	if (type !== "Bearer") {
		return res.status(400).json({
			status: "error",
			message: "Formato de token inválido."
		});
	};

	try {
		const decoded = jwt.verify(token, SECRET_KEY);
		req.user = decoded;
		next();
	} catch (error) {
		return res.status(403).json({
			status: "error",
			message: "Token inválido ou expirado."
		});
	}
};