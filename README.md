# Express Blog (Minimal)

Minimal example of an Express.js app using EJS templates and MySQL. Uses dotenv for configuration and Tailwind CDN for styling.

Requirements
- Node.js 18+ (or compatible)
- MySQL database with a table `posts` in database `express_blog`

Example `posts` table (MySQL):

CREATE TABLE posts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  excerpt TEXT,
  content TEXT
);

Usage

1. Copy `.env.example` to `.env` and edit if needed.

2. Install dependencies:

   npm install

3. Start server:

   npm start

4. Open http://localhost:3000 (or PORT from your `.env`).

Notes
- This app expects your DB credentials to match `.env` values.
- Tailwind is included via CDN for simplicity.
