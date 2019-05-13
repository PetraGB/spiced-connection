const spicedPg = require("spiced-pg");

const db = spicedPg(
    process.env.DATABASE_URL ||
        "postgres:postgres:postgres@localhost:5432/connection"
);

function checkEmail(email) {
    let q = "SELECT COUNT(*) FROM users WHERE email = $1;";
    let params = [email];
    return db.query(q, params);
}

function addUser(first, last, email, password) {
    const q =
        "INSERT INTO users (first, last, email, password) VALUES ($1, $2, $3, $4) RETURNING id, journalist, editor, admin;";
    const params = [first, last, email, password];
    return db.query(q, params);
}

module.exports = {
    checkEmail,
    addUser
};
