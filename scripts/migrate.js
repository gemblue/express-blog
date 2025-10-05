#!/usr/bin/env node
const mysql = require('mysql2/promise');
require('dotenv').config();

async function run() {
  const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 3306,
    user: process.env.DB_USER || 'app',
    password: process.env.DB_PASSWORD || '12345',
    database: process.env.DB_NAME || 'express_blog',
  });

  const dbName = process.env.DB_NAME || 'express_blog';

  try {
    const conn = await pool.getConnection();
    try {
      console.log('Checking for posts table...');
      const [tables] = await conn.query(
        'SELECT COUNT(*) as tcnt FROM information_schema.TABLES WHERE TABLE_SCHEMA = ? AND TABLE_NAME = ?',
        [dbName, 'posts']
      );

      if (!tables || tables[0].tcnt === 0) {
        console.error(`Table 'posts' not found in database '${dbName}'.`);
        process.exitCode = 1;
        return;
      }

      console.log("Checking if 'excerpt' column exists...");
      const [cols] = await conn.query(
        'SELECT COUNT(*) as cnt FROM information_schema.COLUMNS WHERE TABLE_SCHEMA = ? AND TABLE_NAME = ? AND COLUMN_NAME = ?',
        [dbName, 'posts', 'excerpt']
      );

      if (!cols || cols[0].cnt === 0) {
        console.log("'excerpt' column not found — adding column...");
        await conn.query('ALTER TABLE posts ADD COLUMN excerpt TEXT');
        console.log("Added 'excerpt' column.");
      } else {
        console.log("'excerpt' column already exists — skipping ALTER.");
      }

      console.log('Populating excerpt for existing rows if empty...');
      await conn.query("UPDATE posts SET excerpt = LEFT(content, 160) WHERE excerpt IS NULL OR excerpt = '';");
      console.log('Population complete.');
      console.log('Migration applied successfully.');
    } finally {
      conn.release();
    }
  } catch (err) {
    console.error('Migration failed:', err.message);
    process.exitCode = 1;
  } finally {
    await pool.end();
  }
}

run();
