# Clientify

<div align="center">

**Sistema de Gerenciamento de Clientes Moderno e Responsivo**

[![Frontend](https://img.shields.io/badge/Frontend-React+TypeScript-61dafb?style=for-the-badge&logo=react)](https://reactjs.org/)
[![Backend](https://img.shields.io/badge/Backend-Node.js+Express-339933?style=for-the-badge&logo=node.js)](https://nodejs.org/)
[![Database](https://img.shields.io/badge/Database-MongoDB-47a248?style=for-the-badge&logo=mongodb)](https://mongodb.com/)
[![UI](https://img.shields.io/badge/UI-shadcn/ui-000000?style=for-the-badge&logo=shadcnui)](https://ui.shadcn.com/)

</div>

---

## Sobre o Projeto

O Clientify é uma aplicação web desenvolvida para facilitar o gerenciamento de clientes. A aplicação oferece uma interface moderna e intuitiva, com validações robustas e integração com APIs externas para autocompletar dados.

### Principais Funcionalidades

- Cadastro completo de clientes com validação em tempo real
- Sistema de listagem com paginação e filtros
- Edição rápida através de modais laterais
- Exclusão segura com confirmação
- Validação automática de CPF e CNPJ
- Preenchimento automático de endereço via CEP
- Interface responsiva para desktop e mobile
- Sistema de filtros por nome, email, tipo e status
- **Autenticação OAuth 2.0** com access tokens e refresh tokens
- **Renovação automática** de tokens em background
- **Proteção de rotas** com redirecionamento automático

---

## Tecnologias Utilizadas

### Frontend
- **React** com **TypeScript**
- **Vite** como build tool para desenvolvimento rápido
- **shadcn/ui** para componentes de interface
- **Tailwind CSS** para estilização 
- **React Hook Form** com **Zod** para validação de formulários
- **Lucide React** para ícones consistentes
- **Axios** para comunicação com a API

### Backend
- **Node.js** com **Express** para o servidor web
- **MongoDB** com **Mongoose** para persistência de dados
- **JWT (JSON Web Tokens)** para autenticação OAuth 2.0
- **Cors** para controle de acesso da API
- **Middlewares** customizados para paginação, autenticação e tratamento de erros

---

## Estrutura do Projeto

```
Clientify/
├── backend/
│   ├── src/
│   │   ├── config/          # Configurações do banco de dados
│   │   ├── controllers/     # Lógica de negócio da API
│   │   ├── middlewares/     # Middlewares customizados
│   │   ├── models/          # Esquemas do MongoDB
│   │   └── routes/          # Definição das rotas da API
│   ├── app.js               # Configuração do Express
│   └── server.js            # Ponto de entrada do servidor
│
└── frontend/
    ├── src/
    │   ├── components/      # Componentes React reutilizáveis
    │   ├── pages/           # Páginas principais da aplicação
    │   ├── services/        # Serviços para comunicação com API
    │   └── utils/           # Funções utilitárias
    └── vite.config.ts       # Configuração do ambiente de desenvolvimento
```

---

## Instalação e Execução

### Pré-requisitos
- Node.js versão 18 ou superior
- MongoDB em execução (local ou remoto)
- npm ou yarn instalado

### Configuração do Backend
```bash
cd backend
npm install

# Configure as variáveis de ambiente
cp .env
# Edite o arquivo .env com a URL do seu MongoDB

# Inicie o servidor de desenvolvimento
npm run dev
```
O backend estará disponível em `http://localhost:3000`

### Configuração do Frontend
```bash
cd frontend
npm install

# Configure as variáveis de ambiente para OAuth
cp .env.example .env

# Inicie o servidor de desenvolvimento
npm run dev
```
O frontend estará disponível em `http://localhost:5173`

---


## Fluxo de autenticação:

Devido a não existir uma página de login efetivamente, a 'autenticação' é feita com as credencias salvas no .env.

⚠️ OBS: Refresh token no localStorage é sim uma pessíma pratica de segurança, mas por requisitos o sistema não possui login, por isso foi implementado desta maneira.



```mermaid
flowchart TD
    classDef front fill:#f8f9fa,stroke:#6c757d,stroke-width:2px,color:#212529,rx:10,ry:10;
    classDef back  fill:#495057,stroke:#343a40,stroke-width:2px,color:#ffffff,rx:10,ry:10;

    A[💻 Frontend<br/>Auto-login na inicialização] --> B
    B[🛠️ Backend<br/>Gera access_token - 1H &<br/> refresh_token 7d] --> C
    C[💻 Frontend<br/>Salva tokens no localStorage] --> D
    D[💻 Frontend<br/>Usa access_token nas requests] --> E
    E[💻 Frontend<br/>60 min depois:<br/>Detecta expiração] --> F
    F[🛠️ Backend<br/>Gera novo access_token<br/>usando refresh_token] --> G
    G[💻 Frontend<br/>Atualiza localStorage] --> H
    H[🔁 Ciclo se repete por 7 dias] --> I
    I[⏳ Refresh_token expira] --> J
    J[💻 Frontend<br/>Faz novo 'login' credencias do .env]

    class A,C,D,E,G,J front
    class B,F back
```

## Endpoints da API

### Autenticação OAuth 2.0

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| `POST` | `/auth/token` | Gera access token e refresh token |
| `POST` | `/auth/refresh` | Renova access token usando refresh token |

### Gerenciamento de Clientes

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| `GET` | `/client` | Lista todos os clientes |
| `GET` | `/client/paginated` | Lista clientes com paginação |
| `GET` | `/client/filtered` | Lista clientes com filtros |
| `GET` | `/client/:id` | Busca cliente específico por ID |
| `POST` | `/client` | Cadastra novo cliente |
| `PUT` | `/client/:id` | Atualiza dados de um cliente |
| `DELETE` | `/client/:id` | Remove cliente do sistema |

### Exemplo de Payload
```json
{
  "name": "João Silva",
  "email": "joao@email.com",
  "phone": "(11) 99999-9999",
  "document": "123.456.789-12",
  "clientType": "CPF",
  "isActive": true,
  "address": {
    "postalCode": "01234567",
    "street": "Rua das Flores, 123",
    "city": "São Paulo",
    "state": "SP"
  }
}
```

---

## Desenvolvedor

<div align="center">

**Flavio Kolenez**

[![GitHub](https://img.shields.io/badge/GitHub-flavio--kolenez-181717?style=for-the-badge&logo=github)](https://github.com/flavio-kolenez)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0077b5?style=for-the-badge&logo=linkedin)](https://linkedin.com/in/fkolenez)

</div>