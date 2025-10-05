CREATE DATABASE IF NOT EXISTS express_blog;
USE express_blog;

CREATE TABLE IF NOT EXISTS posts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  excerpt TEXT,
  content TEXT
);

INSERT INTO posts (title, excerpt, content) VALUES
('Hello World', 'This is the first post', 'Welcome to the blog. This is the full content of the first post.'),
('Second Post', 'A quick second post', 'Some longer content for the second post.');
