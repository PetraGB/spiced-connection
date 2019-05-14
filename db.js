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

module.exports = {
    checkByEmail,
    addUser,
    getPass
};
