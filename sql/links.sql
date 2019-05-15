DROP TABLE IF EXISTS links CASCADE;

CREATE TABLE links(
    id SERIAL PRIMARY KEY,
    origin INTEGER REFERENCES articles(id) ON DELETE CASCADE NOT NULL,
    destination INTEGER REFERENCES articles(id) ON DELETE CASCADE NOT NULL,
    explanation TEXT NOT NULL,
    kind INTEGER NOT NULL,
    editorid INTEGER REFERENCES users(id) NOT NULL
);
