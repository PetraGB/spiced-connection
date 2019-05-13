DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    first VARCHAR(200) NOT NULL,
    last VARCHAR(200) NOT NULL,
    email VARCHAR(200) NOT NULL,
    password VARCHAR(300) NOT NULL,
    picture VARCHAR(300),
    bio VARCHAR(500),
    journalist BOOLEAN DEFAULT false,
    editor BOOLEAN DEFAULT false,
    admin BOOLEAN DEFAULT false
);
