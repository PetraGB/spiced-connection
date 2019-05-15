DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    first VARCHAR(200) NOT NULL,
    last VARCHAR(200) NOT NULL,
    email VARCHAR(200) NOT NULL,
    password VARCHAR(300) NOT NULL,
    pictures TEXT [],
    atpicture text,
    bio VARCHAR(500),
    status INTEGER NOT NULL DEFAULT 1,
    read INTEGER []
);
