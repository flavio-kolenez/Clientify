# 🏢 Clientify

<div align="center">

**Sistema de Gerenciamento de Clientes Moderno e Responsivo**

[![Frontend](https://img.shields.io/badge/Frontend-React+TypeScript-61dafb?style=for-the-badge&logo=react)](https://reactjs.org/)
[![Backend](https://img.shields.io/badge/Backend-Node.js+Express-339933?style=for-the-badge&logo=node.js)](https://nodejs.org/)
[![Database](https://img.shields.io/badge/Database-MongoDB-47a248?style=for-the-badge&logo=mongodb)](https://mongodb.com/)
[![UI](https://img.shields.io/badge/UI-shadcn/ui-000000?style=for-the-badge&logo=shadcnui)](https://ui.shadcn.com/)

</div>

---

## 📋 Sobre o Projeto

O **Clientify** é uma aplicação web completa para gerenciamento de clientes, desenvolvida com tecnologias modernas. Permite cadastro, edição, visualização e exclusão de clientes com validação completa de CPF/CNPJ e integração com API de CEP.

### ✨ Principais Funcionalidades

- 🆕 **Cadastro de Clientes** - Interface intuitiva com validação em tempo real
- 📊 **Listagem Paginada** - Visualização organizada com paginação automática  
- ✏️ **Edição Inline** - Edição rápida através de modais deslizantes
- 🗑️ **Exclusão Segura** - Confirmação antes de remover registros
- 🔍 **Validação de Documentos** - CPF e CNPJ com formatação automática
- 📍 **Busca de Endereço** - Preenchimento automático via CEP
- 📱 **Design Responsivo** - Funciona perfeitamente em mobile e desktop

---

## 🚀 Tecnologias Utilizadas

### Frontend
- **React 18** + **TypeScript** - Interface moderna e type-safe
- **Vite** - Build tool ultrarrápido
- **shadcn/ui** - Componentes de UI elegantes e acessíveis
- **Tailwind CSS** - Estilização utility-first
- **React Hook Form** + **Zod** - Validação de formulários robusta
- **Lucide React** - Ícones consistentes e modernos
- **Axios** - Cliente HTTP para API

### Backend
- **Node.js** + **Express** - Servidor web performático
- **MongoDB** + **Mongoose** - Banco de dados NoSQL
- **Cors** - Controle de acesso entre origens
- **Dotenv** - Gerenciamento de variáveis de ambiente

---

## 📁 Estrutura do Projeto

```
Clientify/
├── 📂 backend/
│   ├── 📂 src/
│   │   ├── 📂 config/          # Configurações do banco
│   │   ├── 📂 controllers/     # Controladores da API
│   │   ├── 📂 middlewares/     # Middlewares customizados
│   │   ├── 📂 models/          # Esquemas do MongoDB
│   │   └── 📂 routes/          # Definição das rotas
│   ├── 📄 app.js               # Configuração do Express
│   └── 📄 server.js            # Inicialização do servidor
│
└── 📂 frontend/
    ├── 📂 src/
    │   ├── 📂 components/      # Componentes reutilizáveis
    │   ├── 📂 pages/           # Páginas da aplicação
    │   ├── 📂 services/        # Serviços de API
    │   └── 📂 utils/           # Utilitários e helpers
    └── 📄 vite.config.ts       # Configuração do Vite
```

---

## 🛠️ Instalação e Execução

### Pré-requisitos
- **Node.js** 18+ 
- **MongoDB** rodando localmente ou na nuvem
- **npm** ou **yarn**

### 1️⃣ Clonando o Repositório
```bash
git clone https://github.com/flavio-kolenez/Clientify.git
cd Clientify
```

### 2️⃣ Configurando o Backend
```bash
cd backend
npm install

# Configurar variáveis de ambiente
cp .env.example .env
# Edite o .env com suas configurações do MongoDB

# Iniciar o servidor
npm run dev
```
**🌐 Backend estará rodando em**: `http://localhost:3000`

### 3️⃣ Configurando o Frontend
```bash
cd ../frontend
npm install

# Iniciar o servidor de desenvolvimento
npm run dev
```
**🌐 Frontend estará rodando em**: `http://localhost:5173`

---

## 📡 API Endpoints

### 👤 Clientes

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| `GET` | `/client` | Lista todos os clientes |
| `GET` | `/client/paginated` | Lista clientes paginados |
| `GET` | `/client/:id` | Busca cliente por ID |
| `POST` | `/client` | Cadastra novo cliente |
| `PUT` | `/client/:id` | Atualiza cliente existente |
| `DELETE` | `/client/:id` | Remove cliente |

### Exemplo de Payload - Cliente
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



## 👨‍💻 Desenvolvedor

<div align="center">

**Flavio Kolenez**

[![GitHub](https://img.shields.io/badge/GitHub-flavio--kolenez-181717?style=for-the-badge&logo=github)](https://github.com/flavio-kolenez)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0077b5?style=for-the-badge&logo=linkedin)](https://linkedin.com/in/fkolenez)


</div>

---