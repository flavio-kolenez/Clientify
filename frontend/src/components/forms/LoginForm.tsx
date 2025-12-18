import { useState } from "react";
import { api } from "../../../services/api";

export default function LoginForm({ onLogin }: { onLogin?: () => void }) {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await api.post("/user/login", form);
      localStorage.setItem("accessToken", res.data.access_token);
      localStorage.setItem("refreshToken", res.data.refresh_token);
      const expiresAt = Date.now() + (res.data.expires_in * 1000);
      localStorage.setItem("accessTokenExpiresAt", expiresAt.toString());
      if (onLogin) onLogin();
    } catch (err: any) {
      setError(err.response?.data?.message || "Erro ao fazer login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-sm mx-auto">
      <h2 className="text-xl font-bold">Login</h2>
      <input
        name="username"
        placeholder="Usuário"
        value={form.username}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        required
      />
      <input
        name="password"
        type="password"
        placeholder="Senha"
        value={form.password}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        required
      />
      <button type="submit" className="w-full bg-primary text-white p-2 rounded" disabled={loading}>
        {loading ? "Entrando..." : "Entrar"}
      </button>
      {error && <div className="text-red-500">{error}</div>}
    </form>
  );
}
