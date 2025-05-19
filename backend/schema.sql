-- Author: Addison Uscinowicz
-- --Defines the structure of the Taskinator MySQL database.

DROP DATABASE IF EXISTS taskinator;
CREATE DATABASE taskinator;
USE taskinator;

CREATE TABLE users (
  id INT NOT NULL AUTO_INCREMENT,
  username VARCHAR(50) NOT NULL,
  email VARCHAR(100) NOT NULL,
  password_hash TEXT NOT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY username (username),
  UNIQUE KEY email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE tasks (
  id INT NOT NULL AUTO_INCREMENT,
  user_id INT NOT NULL,
  title VARCHAR(100) NOT NULL,
  description TEXT,
  due_date DATE DEFAULT NULL,
  status ENUM('todo','in progress','done') NOT NULL DEFAULT 'todo',
  priority ENUM('High','Normal','Low') DEFAULT 'Normal',
  PRIMARY KEY (id),
  KEY user_id (user_id),
  CONSTRAINT tasks_ibfk_1 FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
  CONSTRAINT tasks_chk_1 CHECK ((status in ('todo','in progress','done')))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE comments (
  id INT NOT NULL AUTO_INCREMENT,
  task_id INT NOT NULL,
  user_id INT NOT NULL,
  content TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY task_id (task_id),
  KEY user_id (user_id),
  CONSTRAINT comments_ibfk_1 FOREIGN KEY (task_id) REFERENCES tasks (id) ON DELETE CASCADE,
  CONSTRAINT comments_ibfk_2 FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
