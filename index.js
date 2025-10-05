require('dotenv').config();
const express = require('express');
const path = require('path');
const db = require('./lib/db');

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT id, title, excerpt FROM posts ORDER BY id DESC LIMIT 10');
    res.render('index', { posts: rows });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/post/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const [rows] = await db.query('SELECT id, title, content FROM posts WHERE id = ?', [id]);
    if (!rows.length) return res.status(404).send('Post not found');
    res.render('post', { post: rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
