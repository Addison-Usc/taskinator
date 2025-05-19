-- Author: Addison Uscinowicz
-- -- Populates the Taskinator database with data.

SE taskinator;


INSERT INTO users (username, email, password_hash)
VALUES
('test', 'test@gmail.com', '$2b$10$hCslM8Ujpe4PsvMUyaYiweNaWOENf0c18jdKty2gM7/p6PeCozaCi');

INSERT INTO tasks (user_id, title, description, due_date, status, priority)
VALUES
(1, 'Seeded Task', 'This is a sample task to verify setup.', '2025-05-20', 'in progress', 'High');

INSERT INTO comments (task_id, user_id, content)
VALUES
(1, 1, 'Initial comment from user.'),
(1, 1, 'Another sample comment.');
