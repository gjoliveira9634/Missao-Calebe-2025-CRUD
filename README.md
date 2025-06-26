# 🙏 Missão Calebe 2025 - IASD Recanto das Emas

Sistema de gerenciamento dos integrantes da **Missão Calebe 2025** da Igreja
Adventista do Sétimo Dia do Recanto das Emas.

## ✨ Funcionalidades

- 📝 **Cadastro de Integrantes**: Nome, igreja (403, 114, 803) e turnos
  disponíveis
- 📋 **Listagem Alfabética**: Visualização organizada dos integrantes
- ⏰ **Gestão de Turnos**: Matutino, Vespertino e Noturno com indicadores
  visuais
- 📊 **Estatísticas**: Resumo por igreja e por turno
- 🎨 **Interface Moderna**: Design responsivo com TailwindCSS
- ⚡ **Interatividade**: Alpine.js para experiência dinâmica

## 🛠️ Tecnologias

### Backend

- **Node.js** + Express.js
- **PostgreSQL** para banco de dados
- **CORS** para comunicação frontend/backend

### Frontend

- **TailwindCSS** para estilização moderna
- **Alpine.js** para reatividade
- **Font Awesome** para ícones

## 🚀 Como Executar

### 1. Instalar Dependências

```bash
npm install
```

### 2. Configurar Banco de Dados

Edite o arquivo `.env` com suas configurações do PostgreSQL:

```env
DATABASE_URL=postgresql://username:password@localhost:5432/missao_calebe
PORT=3000
NODE_ENV=development
```

### 3. Executar em Desenvolvimento

```bash
npm run dev
```

### 4. Executar em Produção

```bash
npm start
```

O sistema estará disponível em: `http://localhost:3000`

## 📱 Como Usar

1. **Cadastrar Integrante**:

   - Digite o nome completo
   - Selecione a igreja (403, 114 ou 803)
   - Marque os turnos disponíveis
   - Clique em "Cadastrar Integrante"

2. **Visualizar Lista**:

   - Integrantes são listados em ordem alfabética
   - Cada card mostra nome, igreja e turnos com ✅ ou ❌

3. **Remover Integrante**:

   - Clique no ícone da lixeira
   - Confirme a remoção

4. **Acompanhar Estatísticas**:
   - Total de integrantes
   - Distribuição por igreja
   - Distribuição por turno

## 🗃️ Estrutura do Banco

```sql
CREATE TABLE integrantes (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    igreja VARCHAR(10) NOT NULL CHECK (igreja IN ('403', '114', '803')),
    turno_matutino BOOLEAN DEFAULT FALSE,
    turno_vespertino BOOLEAN DEFAULT FALSE,
    turno_noturno BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 🎯 Endpoints da API

- `GET /api/integrantes` - Listar todos os integrantes
- `POST /api/integrantes` - Adicionar novo integrante
- `DELETE /api/integrantes/:id` - Remover integrante
- `GET /api/estatisticas` - Obter estatísticas

## 👨‍💻 Desenvolvido por

**Gabriel José Oliveira** - Diretor Jovem IASD Recanto das Emas 403

---
