const spicedPg = require("spiced-pg");

const db = spicedPg(
    process.env.DATABASE_URL ||
        "postgres:postgres:postgres@localhost:5432/connection"
);

function checkByEmail(email) {
    const q =
        "SELECT id, first, last, pictures, atpicture, bio, status, read FROM users WHERE email = $1;";
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

function addPictureUser(id, picture) {
    const q =
        "UPDATE users SET pictures = array_prepend($2, pictures), atpicture = $2 WHERE id = $1 RETURNING pictures, atpicture;";
    const params = [id, picture];
    return db.query(q, params);
}

function getProfileById(id) {
    const q =
        "SELECT id, first, last, pictures, atpicture, bio, status FROM users WHERE id = $1";
    const params = [id];
    return db.query(q, params);
}

function addArticle(title, article, pictures, summary, writerid) {
    const q =
        "INSERT INTO articles (title, article, pictures, summary, writerid) VALUES ($1, $2, $3, $4, $5) RETURNING id";
    const params = [title, article, pictures, summary, writerid];
    return db.query(q, params);
}

function addPictureArticle(id, picture) {
    const q =
        "UPDATE articles SET pictures = array_prepend($2, pictures) WHERE id = $1 RETURNING pictures;";
    const params = [id, picture];
    return db.query(q, params);
}

// function setPicturesArticle(id, pictures) {
//     const q = "UPDATE articles SET pictures = ARRAY $2 WHERE id = $1;";
//     const params = [id, pictures];
//     return db.query(q, params);
// }

function updateArticle(id, title, article, pictures, summary, writerid) {
    const q =
        "UPDATE articles SET title = $2, article = $3, pictures = $4, summary = $5, writerid = $6 WHERE id = $1";
    const params = [id, title, article, pictures, summary, writerid];
    return db.query(q, params);
}

function publishArticle(publish, id) {
    const q =
        "UPDATE articles SET published = CURRENT_TIMESTAMP, publish = $1 WHERE id = $2;";
    const params = [publish, id];
    return db.query(q, params);
}

function getArticle(id) {
    const q =
        "SELECT articles.id AS id, title, article, articles.pictures AS pictures, summary, writerid, uploaded, published, publish, first, last, atpicture FROM articles JOIN users ON writerid = users.id WHERE articles.id = $1";
    return db.query(q, [id]);
}

function getLinkArticle(id) {
    const q =
        "SELECT articles.id AS id, title, articles.pictures AS pictures, summary, writerid, published, first, last, atpicture FROM articles JOIN users ON articles.writerid = users.id WHERE articles.id = $1 ORDER BY id DESC LIMIT 20;";
    const params = [id];
    return db.query(q, params);
}

function getLatestArticles() {
    const q =
        "SELECT articles.id AS id, title, articles.pictures AS pictures, summary, writerid, published, first, last, atpicture FROM articles JOIN users ON articles.writerid = users.id WHERE publish = true ORDER BY id DESC LIMIT 20;";
    return db.query(q);
}

function addToRead(id, readid) {
    const q = "UPDATE users SET read = array_append(read, $2) WHERE id = $1;";
    const params = [id, readid];
    return db.query(q, params);
}

function updateRead(id, read) {
    const q = "UPDATE users SET read = $2 WHERE id = $1;";
    const params = [id, read];
    return db.query(q, params);
}

function addLink(origin, destination, explanation, kind, editorid) {
    const q =
        "INSERT INTO links (origin, destination, explanation, kind, editorid) VALUES ($1, $2, $3, $4, $5) RETURNING id;";
    const params = [origin, destination, explanation, kind, editorid];
    return db.query(q, params);
}

function updateLink(origin, destination, explanation, kind, editorid, id) {
    const q =
        "UPDATE links SET origin = $1, destination = $2, explanation = $3, kind = $4, editorid = $5 WHERE id = $6;";
    const params = [origin, destination, explanation, kind, editorid, id];
    return db.query(q, params);
}

function getLinksByOrigin(origin) {
    const q =
        "SELECT links.id AS id, origin, destination, explanation, kind, title, published FROM links JOIN articles ON origin = articles.id WHERE origin = $1";
    const params = [origin];
    return db.query(q, params);
}

module.exports = {
    checkByEmail,
    addUser,
    addPictureUser,
    getPass,
    getProfileById,
    addArticle,
    addPictureArticle,
    updateArticle,
    publishArticle,
    getArticle,
    getLinkArticle,
    getLatestArticles,
    addToRead,
    updateRead,
    addLink,
    updateLink,
    getLinksByOrigin
};
