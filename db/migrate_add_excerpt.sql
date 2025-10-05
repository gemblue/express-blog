-- Migration: add excerpt column to posts
-- Safe for MySQL 8+: uses ADD COLUMN IF NOT EXISTS
ALTER TABLE posts
  ADD COLUMN IF NOT EXISTS excerpt TEXT;

-- Optionally populate excerpt from content for existing rows (first 160 chars)
UPDATE posts
  SET excerpt = LEFT(content, 160)
  WHERE excerpt IS NULL OR excerpt = '';
