const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// Configuração do banco PostgreSQL
const pool = new Pool({
	connectionString: process.env.DATABASE_URL,
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static("frontend"));

// Função para inicializar o banco de dados
async function initializeDatabase() {
	try {
		await pool.query(`
      CREATE TABLE IF NOT EXISTS integrantes (
        id SERIAL PRIMARY KEY,
        nome VARCHAR(255) NOT NULL,
        igreja VARCHAR(10) NOT NULL CHECK (igreja IN ('403', '114', '803')),
        turno_matutino BOOLEAN DEFAULT FALSE,
        turno_vespertino BOOLEAN DEFAULT FALSE,
        turno_noturno BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
		console.log("✅ Banco de dados inicializado com sucesso!");
	} catch (error) {
		console.error("❌ Erro ao inicializar banco de dados:", error);
	}
}

// Rotas da API

// 📋 Listar todos os integrantes (ordenado alfabeticamente)
app.get("/api/integrantes", async (req, res) => {
	try {
		const result = await pool.query(`
      SELECT * FROM integrantes 
      ORDER BY nome ASC
    `);
		res.json(result.rows);
	} catch (error) {
		console.error("Erro ao buscar integrantes:", error);
		res.status(500).json({ error: "Erro interno do servidor" });
	}
});

// ➕ Adicionar novo integrante
app.post("/api/integrantes", async (req, res) => {
	try {
		const { nome, igreja, turnos } = req.body;

		// Validações
		if (!nome || !igreja) {
			return res.status(400).json({ error: "Nome e igreja são obrigatórios" });
		}

		if (!["403", "114", "803"].includes(igreja)) {
			return res.status(400).json({ error: "Igreja deve ser 403, 114 ou 803" });
		}

		const result = await pool.query(
			`
      INSERT INTO integrantes (
        nome, igreja, turno_matutino, turno_vespertino, turno_noturno
      ) VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `,
			[
				nome.trim(),
				igreja,
				turnos?.includes("matutino") || false,
				turnos?.includes("vespertino") || false,
				turnos?.includes("noturno") || false,
			],
		);

		res.status(201).json(result.rows[0]);
	} catch (error) {
		console.error("Erro ao adicionar integrante:", error);
		res.status(500).json({ error: "Erro interno do servidor" });
	}
});

// 🗑️ Remover integrante
app.delete("/api/integrantes/:id", async (req, res) => {
	try {
		const { id } = req.params;
		const result = await pool.query(
			"DELETE FROM integrantes WHERE id = $1 RETURNING *",
			[id],
		);

		if (result.rows.length === 0) {
			return res.status(404).json({ error: "Integrante não encontrado" });
		}

		res.json({ message: "Integrante removido com sucesso" });
	} catch (error) {
		console.error("Erro ao remover integrante:", error);
		res.status(500).json({ error: "Erro interno do servidor" });
	}
});

// 📊 Estatísticas da missão
app.get("/api/estatisticas", async (req, res) => {
	try {
		const totalResult = await pool.query(
			"SELECT COUNT(*) as total FROM integrantes",
		);
		const igrejaResult = await pool.query(`
      SELECT igreja, COUNT(*) as quantidade 
      FROM integrantes 
      GROUP BY igreja 
      ORDER BY igreja
    `);
		const turnoResult = await pool.query(`
      SELECT 
        SUM(CASE WHEN turno_matutino THEN 1 ELSE 0 END) as matutino,
        SUM(CASE WHEN turno_vespertino THEN 1 ELSE 0 END) as vespertino,
        SUM(CASE WHEN turno_noturno THEN 1 ELSE 0 END) as noturno
      FROM integrantes
    `);

		res.json({
			total: parseInt(totalResult.rows[0].total),
			porIgreja: igrejaResult.rows,
			porTurno: turnoResult.rows[0],
		});
	} catch (error) {
		console.error("Erro ao buscar estatísticas:", error);
		res.status(500).json({ error: "Erro interno do servidor" });
	}
});

// Servir página principal
app.get("/", (req, res) => {
	res.sendFile("index.html", { root: "frontend" });
});

// Inicializar servidor
async function startServer() {
	await initializeDatabase();
	app.listen(PORT, () => {
		console.log(`🚀 Servidor da Missão Calebe rodando na porta ${PORT}`);
		console.log(`🌐 Acesse: http://localhost:${PORT}`);
	});
}

startServer();
