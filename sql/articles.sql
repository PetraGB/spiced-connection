DROP TABLE IF EXISTS articles CASCADE;

CREATE TABLE articles(
    id SERIAL PRIMARY KEY,
    title VARCHAR(250) NOT NULL,
    article TEXT NOT NULL,
    pictures TEXT [],
    atpicture INTEGER,
    summary TEXT,
    writerid INTEGER REFERENCES users(id) ON DELETE CASCADE NOT NULL,
    uploaded TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    published TIMESTAMP,
    public BOOLEAN DEFAULT false
);
