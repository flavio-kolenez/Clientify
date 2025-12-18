import User from "../models/UserSchema.js";

export default class UserController {
    async register(req, res) {
        try {
            const { username, email, password } = req.body;
            if (!username || !email || !password) {
                return res.status(400).json({ message: "Todos os campos são obrigatórios." });
            }
            const userExists = await User.findOne({ $or: [{ username }, { email }] });
            if (userExists) {
                return res.status(409).json({ message: "Usuário ou e-mail já cadastrado." });
            }
            const user = await User.create({ username, email, password });
            return res.status(201).json({ message: "Usuário criado com sucesso!", user: { username: user.username, email: user.email } });
        } catch (err) {
            return res.status(500).json({ message: "Erro ao registrar usuário.", error: err.message });
        }
    }

    async getById(req, res) {
        try {
            const userId = req.user?.userId;
            if (!userId) return res.status(401).json({ message: "Não autorizado." });
            const user = await User.findById(userId).select("-password");
            if (!user) return res.status(404).json({ message: "Usuário não encontrado." });
            return res.json({ user });
        } catch (err) {
            return res.status(500).json({ message: "Erro ao buscar usuário.", error: err.message });
        }
    }

    async update(req, res) {
        try {
            const userId = req.user?.userId;
            if (!userId) return res.status(401).json({ message: "Não autorizado." });
            const { username, email, password } = req.body;
            const updateData = {};
            if (username) updateData.username = username;
            if (email) updateData.email = email;
            if (password) updateData.password = password;
            const user = await User.findByIdAndUpdate(userId, updateData, { new: true }).select("-password");
            if (!user) return res.status(404).json({ message: "Usuário não encontrado." });
            return res.json({ message: "Usuário atualizado!", user });
        } catch (err) {
            return res.status(500).json({ message: "Erro ao atualizar usuário.", error: err.message });
        }
    }

    async delete(req, res) {
        try {
            const userId = req.user?.userId;
            if (!userId) return res.status(401).json({ message: "Não autorizado." });
            await User.findByIdAndDelete(userId);
            return res.json({ message: "Usuário deletado com sucesso." });
        } catch (err) {
            return res.status(500).json({ message: "Erro ao deletar usuário.", error: err.message });
        }
    }
}
