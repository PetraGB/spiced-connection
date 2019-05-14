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

app.post("/api/article/add", requireJournalist, (req, res) => {
    const title = req.body.title;
    const article = req.body.article;
    const pictures = req.body.pictures;
    const atpicture = req.body.atpicture;
    const summary = req.body.summary;
    const writerid = req.session.user.id;

    if (!title || !article) {
        res.json({ error: "There is no article to upload" });
    } else {
        db.addArticle(title, article, pictures, atpicture, summary, writerid)
            .then(({ rows }) => {
                res.json(rows[0]);
            })
            .catch(err => {
                res.json({ error: true });
                console.log(err);
            });
    }
});

app.post("/api/article/adjust", requireJournalist, (req, res) => {
    const id = req.body.id;
    const title = req.body.title;
    const article = req.body.article;
    const pictures = req.body.pictures;
    const atpicture = req.body.atpicture;
    const summary = req.body.summary;
    const writerid = req.session.user.id;

    if (!title || !article) {
        res.json({ error: "There is no article to upload" });
    } else {
        db.updateArticle(
            id,
            title,
            article,
            pictures,
            atpicture,
            summary,
            writerid
        )
            .then(({ rows }) => {
                res.json({ id });
            })
            .catch(err => {
                res.json({ error: true });
                console.log(err);
            });
    }
});

app.get("/api/article/:id", (req, res) => {
    db.getArticle(req.params.id)
        .then(({ rows }) => {
            const article = rows[0];
            res.json({ article });
        })
        .catch();
});
