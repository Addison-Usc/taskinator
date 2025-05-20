-- Author: Addison Uscinowicz
-- Populates the Taskinator database with sample data for testing.

USE taskinator;

-- Insert sample user (password = "password")
INSERT INTO users (username, email, password_hash)
VALUES ('John', 'johndoe@gmail.com', '$2b$10$kXBBdoJUahHNnZLVYqk4suM5Jto.8Nf8L8bMc4w/oDTjgW5KCcgUi');

INSERT INTO tasks (user_id, title, description, due_date, status, priority)
VALUES
(1, 'Finish math homework', 'Finish chapter 5 problems before Tuesday.', '2025-05-26', 'in progress', 'High'),
(1, 'Study for biology quiz', 'Make flashcards for cell structure. Ugh.', '2025-05-20', 'todo', 'Low'),
(1, 'Submit history paper', 'Paper on WW2 due Friday. Don\'t forget to check citations!', '2025-05-24', 'in progress', 'High'),
(1, 'Clean locker', 'It\'s a disaster zone. Might find my missing hoodie.', '2025-05-31', 'in progress', 'Normal'),
(1, 'Print English essay', 'Printer better not be out of ink again.', '2025-05-21', 'in progress', 'High'),
(1, 'Meet with guidance counselor', 'Ask about class schedule for next year.', '2025-05-31', 'done', 'Normal'),
(1, 'Ask mom to sign permission slip', 'Need this for the field trip. She keeps forgetting.', '2025-05-19', 'in progress', 'Low'),
(1, 'Work on science fair project', 'Paint volcano, finish poster board.', '2025-05-20', 'in progress', 'Normal'),
(1, 'Organize backpack', 'So many crumpled papers... probably some homework too.', '2025-05-27', 'todo', 'Normal'),
(1, 'Plan group project meeting', 'Text Sarah and Mike. Can\'t do Monday.', '2025-05-19', 'todo', 'Normal'),
(1, 'Practice presentation', 'Don\'t forget to time it. Try not to say "um" every sentence.', '2025-05-27', 'done', 'Normal'),
(1, 'Review geometry notes', 'Need to redo the theorems from last quiz.', '2025-05-28', 'done', 'Normal'),
(1, 'Charge Chromebook', 'Battery died twice last week. Do it now.', '2025-05-25', 'todo', 'Normal'),
(1, 'Buy materials for art', 'Need markers + that weird foam stuff.', '2025-05-26', 'in progress', 'Low'),
(1, 'Respond to teacher email', 'She asked about the missing assignment.', '2025-05-23', 'done', 'Low'),
(1, 'Update planner', 'Add all due dates so I stop forgetting stuff.', '2025-05-20', 'done', 'Normal'),
(1, 'Pack gym clothes', 'Need clean socks. Check locker?', '2025-06-02', 'in progress', 'High'),
(1, 'Bring back library books', 'Avoid late fees this time.', '2025-05-28', 'done', 'Normal'),
(1, 'Finish coding homework', 'Fix bug in for loop. It keeps skipping stuff.', '2025-05-20', 'done', 'Normal'),
(1, 'Check schedule for next week', 'What\'s even happening on Friday?', '2025-05-19', 'in progress', 'Normal');

INSERT INTO comments (task_id, user_id, content)
VALUES
(1, 1, 'Going well so far, just 3 more problems left.'),
(2, 1, 'I need help with meiosis and mitosis.'),
(3, 1, 'Might need more sources for citations.'),
(8, 1, 'Poster looks cool, just need to glue everything.'),
(11, 1, 'Still nervous about talking in front of people.'),
(19, 1, 'Done but I feel like I could have done better.');
