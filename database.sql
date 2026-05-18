CREATE DATABASE training_platform;
USE training_platform;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE,
    password VARCHAR(255)
);

CREATE TABLE lists (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    list_name VARCHAR(100),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE saved_exercises (
    id INT AUTO_INCREMENT PRIMARY KEY,
    list_id INT,
    exercise_name VARCHAR(255),
    FOREIGN KEY (list_id) REFERENCES lists(id)
);

INSERT INTO users (username, password) VALUES
('trainer1', 'pass1'),
('trainer2', 'pass2'),
('trainer3', 'pass3');
