const { app } = require("../index");

const db = require("../db");
const {
    requireUser,
    requireJournalist,
    requireEditor,
    requireAdmin
} = require("../middleware");

const bodyParser = require("body-parser");
app.use(bodyParser.json());

app.get("/api/user/:id", (req, res) => {
    db.getProfileById(req.params.id)
        .then(({ rows }) => {
            const profile = rows[0];
            res.json({ profile });
        })
        .catch();
});
