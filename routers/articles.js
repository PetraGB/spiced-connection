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
    const summary = req.body.summary;
    const writerid = req.session.user.id;

    if (!title || !article) {
        res.json({ error: "There is no article to upload" });
    } else {
        db.addArticle(title, article, pictures, summary, writerid)
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
    const summary = req.body.summary;
    const writerid = req.session.user.id;

    if (!title || !article) {
        res.json({ error: "There is no article to upload" });
    } else {
        db.updateArticle(id, title, article, pictures, summary, writerid)
            .then(({ rows }) => {
                res.json({ id });
            })
            .catch(err => {
                res.json({ error: true });
                console.log(err);
            });
    }
});

app.post("/api/article/publish", requireEditor, (req, res) => {
    db.publishArticle(req.body.publish, req.body.id)
        .then(() => {
            res.json({ id: req.body.id });
        })
        .catch(err => {
            console.log(err);
            res.json({ error: true });
        });
});

app.get("/api/article/:id", (req, res) => {
    const id = Number(req.params.id);
    db.getArticle(id)
        .then(async ({ rows }) => {
            let article = rows[0];
            let readId = null;

            if (article && (article.publish || req.session.user.status > 1)) {
                const datePublished = new Date(article.published);
                article = {
                    ...article,
                    published: datePublished.toGMTString()
                };
                if (req.session.user.status) {
                    if (!req.session.user.read) {
                        await db
                            .addToRead(req.session.user.id, id)
                            .then(() => {
                                console.log("if no read available running");
                                readId = id;
                                req.session.user.read = [id];
                            })
                            .catch(err => {
                                console.log(err);
                            });
                    } else if (!req.session.user.read.includes(id)) {
                        console.log(req.session.user.read);
                        await db
                            .addToRead(req.session.user.id, id)
                            .then(() => {
                                console.log("if no include running");
                                readId = id;
                                req.session.user.read = [
                                    ...req.session.user.read,
                                    id
                                ];
                                console.log(
                                    "read in session",
                                    req.session.user.read
                                );
                            })
                            .catch(err => {
                                console.log(err);
                            });
                    }
                }
            }
            res.json({ article, readId });
        })
        .catch(err => {
            console.log(err);
            res.json({ error: true });
        });
});

app.get("/api/latest", (req, res) => {
    db.getLatestArticles()
        .then(({ rows }) => {
            const latest = rows;
            res.json({ latest });
        })
        .catch(err => {
            console.log(err);
            res.json({ error: true });
        });
});

app.get("/api/self/read", requireUser, async (req, res) => {
    const readArticlesList = req.session.user.read;
    let readArticles = [];

    if (readArticlesList) {
        for (var i = 0; i < readArticlesList.length; i++) {
            await db
                .getLinkArticle(readArticlesList[i])
                .then(({ rows }) => {
                    readArticles.push(rows[0]);
                })
                .catch(err => {
                    res.json({ error: true });
                    console.log(err);
                });
        }
    }

    res.json({ readArticles });
});
