import { useState } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { api } from '../../services/api';
import { UsersRound, Shield, Key, CheckCircle } from 'lucide-react';

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [tokens, setTokens] = useState<any>(null);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const payload = {
        client_id: import.meta.env.VITE_CLIENT_ID,
        client_secret: import.meta.env.VITE_CLIENT_SECRET,
      };
      
      const res = await api.post("/auth/token", payload, {
        headers: { "Content-Type": "application/json" },
      });

      if (res.data?.access_token && res.data?.refresh_token) {
        // Salvar tokens
        localStorage.setItem("accessToken", res.data.access_token);
        localStorage.setItem("refreshToken", res.data.refresh_token);
        const expiresAt = Date.now() + (res.data.expires_in * 1000);
        localStorage.setItem("accessTokenExpires", expiresAt.toString());
        
        setTokens(res.data);
        setAuthenticated(true);
      }
    } catch (error) {
      console.error('Erro no login:', error);
      alert('Erro ao fazer login!');
    } finally {
      setLoading(false);
    }
  };

  const handleContinue = () => {
    window.location.href = '/clients/list';
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("accessTokenExpires");
    setAuthenticated(false);
    setTokens(null);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md shadow-xl">
        {!authenticated ? (
          <Card className="border-0">
            <CardHeader className="text-center space-y-4">
              <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                <UsersRound className="w-8 h-8 text-blue-600" />
              </div>
              <CardTitle className="text-2xl font-bold text-gray-900">
                Login
              </CardTitle>
              <CardDescription className="text-gray-600">
                PineWork
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Shield className="w-4 h-4" />
                  <span>Autenticação OAuth 2.0 com JWT</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Key className="w-4 h-4" />
                  <span>Access Token: 1 hora</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Key className="w-4 h-4" />
                  <span>Refresh Token: 7 dias</span>
                </div>
              </div>

              <Button 
                onClick={handleLogin}
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 text-lg font-semibold"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Autenticando...
                  </>
                ) : (
                  <>
                    <Shield className="w-5 h-5 mr-2" />
                    Fazer Login
                  </>
                )}
              </Button>

              <p className="text-xs text-center text-gray-500">
                Credenciais automáticas do arquivo .env
              </p>
            </CardContent>
          </Card>
        ) : (
          <Card className="shadow-xl border-0 border-t-4 border-t-green-500">
            <CardHeader className="text-center space-y-4">
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <CardTitle className="text-2xl font-bold text-gray-900">
                Autenticado com Sucesso!
              </CardTitle>
              <CardDescription className="text-gray-600">
                Tokens OAuth 2.0 gerados e salvos
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div className="bg-green-50 p-4 rounded-lg space-y-3">
                <div className="text-sm">
                  <span className="font-semibold text-green-800">Access Token:</span>
                  <p className="text-green-600 font-mono text-xs break-all mt-1">
                    {tokens?.access_token?.substring(0, 50)}...
                  </p>
                </div>
                <div className="text-sm">
                  <span className="font-semibold text-green-800">Refresh Token:</span>
                  <p className="text-green-600 font-mono text-xs break-all mt-1">
                    {tokens?.refresh_token?.substring(0, 50)}...
                  </p>
                </div>
                <div className="text-sm">
                  <span className="font-semibold text-green-800">Expira em:</span>
                  <p className="text-green-600 mt-1">
                    {tokens?.expires_in} segundos (1 hora)
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <Button 
                  onClick={handleContinue}
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-4 text-lg font-semibold"
                >
                  <UsersRound className="w-5 h-5 mr-2" />
                  Acessar Sistema
                </Button>
                
                <Button 
                  onClick={handleLogout}
                  variant="outline"
                  className="w-full py-4"
                >
                  Fazer Logout
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default LoginPage;