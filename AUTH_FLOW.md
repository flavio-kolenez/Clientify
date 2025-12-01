[Frontend] 
    ↓ (auto-login na inicialização)
[Backend] gera access_token (1h) + refresh_token (7d)
    ↓
[Frontend] salva ambos no localStorage
    ↓
[Frontend] usa access_token nas requests
    ↓ (55 min depois)
[Frontend] detecta que vai expirar
    ↓
[Backend] gera novo access_token usando refresh_token
    ↓
[Frontend] atualiza localStorage
    ↓
Ciclo se repete por 7 dias...
    ↓
Depois de 7 dias, refresh_token expira
    ↓
[Frontend] faz novo auto-login