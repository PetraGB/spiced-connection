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

app.get("/api/links/:origin", (req, res) => {
    db.getLinksByOrigin(req.params.origin)
        .then(({ rows }) => {
            res.json({ links: rows });
        })
        .catch(err => {
            console.log(err);
        });
});

app.post("/api/link/add", requireEditor, async (req, res) => {
    console.log(req.body);
    let kind;
    let reverseKind;
    if (req.body.kind == 1) {
        kind = 1;
        reverseKind = 2;
    } else if (req.body.kind == 2) {
        kind = 2;
        reverseKind = 1;
    } else if (req.body.kind == 3) {
        kind = 3;
        reverseKind = 4;
    } else if (req.body.kind == 4) {
        kind = 4;
        reverseKind = 3;
    } else if (req.body.kind == 5) {
        kind = 5;
        reverseKind = 6;
    } else if (req.body.kind == 6) {
        kind = 6;
        reverseKind = 5;
    }

    const a = {
        origin: req.body.origin,
        destination: req.body.destination,
        explanation: req.body.explanation,
        kind: kind,
        editorid: req.session.user.id
    };

    const b = {
        origin: req.body.destination,
        destination: req.body.origin,
        explanation: req.body.reverseExplanation,
        kind: reverseKind,
        editorid: req.session.user.id
    };

    try {
        await db.addLink(
            a.origin,
            a.destination,
            a.explanation,
            a.kind,
            a.editorid
        );
        await db.addLink(
            b.origin,
            b.destination,
            b.explanation,
            b.kind,
            b.editorid
        );
        res.json({ success: true });
    } catch (err) {
        console.log(err);
        res.json({ error: true });
    }
});
