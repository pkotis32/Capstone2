-- Drop tables if they already exist (to avoid conflicts on re-runs)
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS court_locations;
DROP TABLE IF EXISTS user_availability;
DROP TABLE IF EXISTS messages;

-- Create users table
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    skill_level VARCHAR(20) -- Beginner, Intermediate, Advanced
);

-- Create court_locations table (references user_id from users)
CREATE TABLE court_locations (
    court_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
    court_name VARCHAR(100) NOT NULL,
    location_address VARCHAR(255),
    city VARCHAR(50),
    state VARCHAR(50),
    zipcode VARCHAR(20),
    latitude DECIMAL(9,6),
    longitude DECIMAL (9,6),
    preferred BOOLEAN DEFAULT FALSE -- Whether this is the user's preferred court
);

-- Create user_availability table (references user_id from users)
CREATE TABLE user_availability (
    availability_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
    day_of_week VARCHAR(10) NOT NULL, -- e.g., Monday, Tuesday
    start_time TIME NOT NULL,
    end_time TIME NOT NULL
);

-- Create messages table (references user_id from users)
CREATE TABLE messages (
    message_id SERIAL PRIMARY KEY,
    sender_id INT REFERENCES users(user_id) ON DELETE CASCADE,
    receiver_id INT REFERENCES users(user_id) ON DELETE CASCADE,
    message_text TEXT NOT NULL,
    sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_read BOOLEAN DEFAULT FALSE -- To track if the message has been read
);

-- Indexes to optimize query performance
CREATE INDEX idx_user_id_on_court_locations ON court_locations(user_id);
CREATE INDEX idx_user_id_on_user_availability ON user_availability(user_id);
CREATE INDEX idx_sender_id_on_messages ON messages(sender_id);
CREATE INDEX idx_receiver_id_on_messages ON messages(receiver_id);