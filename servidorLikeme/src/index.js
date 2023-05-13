const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
require('dotenv').config();

const cors = require('cors');

const app = express();
//generar constante que determina el puerto a usar
const PORT = process.env.PORT || 3001;

app.use(cors());

// Configura body-parser para parsear las solicitudes JSON
app.use(bodyParser.json());

// Configura la conexión a la base de datos PostgreSQL
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
});


// Ruta para obtener todos los posts
app.get('/posts', async (req, res) => {
    try {
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM posts order by id');
        const posts = result.rows;
        res.json(posts);
        client.release();
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: `Error al obtener los posts ${process.env.DB_USER} ${process.env.DB_HOST} ${process.env.DB_NAME}  ${process.env.DB_PASSWORD} ${process.env.DB_PORT}` });
    }
});

app.put('/posts/:id', async (req, res) => {
    const id = req.params.id;
    const { likes } = req.body;
    const client = await pool.connect();
    try {
        const result = await client.query('UPDATE posts SET likes = $1 WHERE id = $2 RETURNING *', [likes, id]);
        const updatedPost = result.rows[0];
        res.json(updatedPost);
    } catch (error) {
        console.error('Error executing query', error);
        res.status(500).json({ error: 'Internal Server Error' });
    } finally {
        client.release();
    }
});

// Ruta para insertar un nuevo post
app.post('/posts', async (req, res) => {
    const { titulo, img, descripcion } = req.body;
    const likes = 0;
    try {
        const client = await pool.connect();
        const result = await client.query(
            'INSERT INTO posts (titulo, img, descripcion, likes) VALUES ($1, $2, $3, $4) RETURNING id',
            [titulo, img, descripcion, likes]
        );
        const postId = result.rows[0].id;
        console.log(result.rows[0]);
        res.json({ id: postId, titulo, img, descripcion, likes });
        client.release();
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error al insertar el post' });
    }
});

app.delete('/posts/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const client = await pool.connect();
        await client.query('DELETE FROM posts WHERE id = $1', [id]);
        client.release();
        res.sendStatus(204);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});

// Inicia el servidor
app.listen(PORT, () => {
    console.log(`Servidor de Express escuchando en el puerto ${PORT}`);
});