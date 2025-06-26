-- Script de inicialização do banco de dados da Missão Calebe
-- Execute este script no PostgreSQL antes de iniciar a aplicação
-- Criar database (execute como superuser)
CREATE DATABASE missao_calebe;
-- Conectar ao database missao_calebe e executar:
\ c missao_calebe;
-- Criar tabela de integrantes
CREATE TABLE IF NOT EXISTS integrantes (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    igreja VARCHAR(10) NOT NULL CHECK (igreja IN ('403', '114', '803')),
    turno_matutino BOOLEAN DEFAULT FALSE,
    turno_vespertino BOOLEAN DEFAULT FALSE,
    turno_noturno BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- Inserir alguns dados de exemplo (opcional)
INSERT INTO integrantes (
        nome,
        igreja,
        turno_matutino,
        turno_vespertino,
        turno_noturno
    )
VALUES (
        'Gabriel José Oliveira',
        '403',
        true,
        true,
        false
    ),
    ('Maria Santos Silva', '114', false, true, true),
    ('João Pedro Costa', '803', true, false, true),
    ('Ana Carolina Mendes', '403', true, true, true);
-- Verificar dados inseridos
SELECT *
FROM integrantes
ORDER BY nome;