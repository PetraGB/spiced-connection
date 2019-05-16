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

app.get("/api/article/:id", async (req, res) => {
    db.getArticle(req.params.id)
        .then(({ rows }) => {
            let article = rows[0];
            if (article.publish || req.session.user.status > 1) {
                // add article id to read array from user here!
                const datePublished = new Date(article.published);
                article = {
                    ...article,
                    published: datePublished.toGMTString()
                };
                if (req.session.user.status) {
                    if (!req.session.user.read) {
                        db.addToRead(req.session.user.id, req.params.id)
                            .then(() => {
                                let readId = req.params.id;
                                req.session.user.read.push(req.params.id);
                                res.json({ article, readId });
                            })
                            .catch(err => {
                                console.log(err);
                            });
                    } else if (!req.session.user.read.includes(req.params.id)) {
                        db.addToRead(req.session.user.id, req.params.id)
                            .then(() => {
                                let readId = req.params.id;
                                req.session.user.read.push(req.params.id);
                                res.json({ article, readId });
                            })
                            .catch(err => {
                                console.log(err);
                            });
                    }
                } else {
                    res.json({ article });
                }
            } else {
                res.json({ error: true });
            }
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
    for (var i = 0; i < readArticlesList.length; i++) {
        await db
            .getLinkArticle(readArticlesList[i])
            .then(({ rows }) => {
                readArticles.push(rows[0]);
            })
            .catch(err => {
                console.log(err);
            });
    }
    res.json({ readArticles });
});
