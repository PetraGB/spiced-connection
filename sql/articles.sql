DROP TABLE IF EXISTS articles CASCADE;

CREATE TABLE articles(
    id SERIAL PRIMARY KEY,
    title VARCHAR(250) NOT NULL,
    article TEXT,
    pictures VARCHAR(300),
    summary TEXT,
    writerid INTEGER REFERENCES users(id) ON DELETE CASCADE NOT NULL
);
