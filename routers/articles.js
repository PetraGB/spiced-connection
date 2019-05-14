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
    const picture = req.body.picture;
    const summary = req.body.summary;
    const writerid = req.session.user.id;

    if (!title || !article) {
        res.json({ error: "There is no article to upload" });
    } else {
        db.addArticle(title, article, picture, summary, writerid)
            .then(({ rows }) => {
                res.json({ newArticle: rows[0] });
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
