const spicedPg = require("spiced-pg");

const db = spicedPg(
    process.env.DATABASE_URL ||
        "postgres:postgres:postgres@localhost:5432/connection"
);

function checkByEmail(email) {
    const q =
        "SELECT id, first, last, picture, bio, status FROM users WHERE email = $1;";
    const params = [email];
    return db.query(q, params);
}

function getPass(email) {
    const q = "SELECT password FROM users WHERE email = ($1);";
    const params = [email];
    return db.query(q, params);
}

function addUser(first, last, email, password) {
    const q =
        "INSERT INTO users (first, last, email, password) VALUES ($1, $2, $3, $4) RETURNING id, first, last, status;";
    const params = [first, last, email, password];
    return db.query(q, params);
}

function getProfileById(id) {
    const q =
        "SELECT id, first, last, picture, bio, status FROM users WHERE id = $1";
    const params = [id];
    return db.query(q, params);
}

function addArticle(title, article, picture, summary, writerid) {
    const q =
        "INSERT INTO articles (title, article, picture, summary, writerid) VALUES ($1, $2, $3, $4, $5) RETURNING id";
    const params = [title, article, picture, summary, writerid];
    return db.query(q, params);
}

function updateArticle(id, title, article, picture, summary, writerid) {
    const q =
        "UPDATE articles SET title = $2, article = $3, picture = $4, summary = $5, writerid = $6 WHERE id = $1";
    const params = [id, title, article, picture, summary, writerid];
    return db.query(q, params);
}

function publishArticle(id) {
    const q =
        "UPDATE articles SET published = CURRENT_TIMESTAMP, public = true WHERE id = $1;";
    const params = [id];
    return db.query(q, params);
}

function getArticle(id) {
    const q = "SELECT * FROM articles WHERE id = $1";
    return db.query(q, [id]);
}

module.exports = {
    checkByEmail,
    addUser,
    getPass,
    getProfileById,
    addArticle,
    updateArticle,
    publishArticle,
    getArticle
};
