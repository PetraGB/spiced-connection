const { app, cookieSessionMiddleware } = require("../index");

const db = require("../db");
const bc = require("../bc");

const csurf = require("csurf");

app.use(cookieSessionMiddleware);

app.use(csurf());

app.use(function(req, res, next) {
    res.cookie("mytoken", req.csrfToken());
    next();
});

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/api/checkuser", (req, res) => {
    if (req.session.user) {
        const user = req.session.user;
        res.json({ user });
    } else {
        res.json({ user: null });
    }
});

app.post("/register", (req, res) => {
    db.checkEmail(req.body.email)
        .then(({ rows }) => {
            if (rows.length == 0) {
                throw new Error("This email is already being used!");
            } else {
                if (
                    req.body.first &&
                    req.body.last &&
                    req.body.email &&
                    req.body.password
                ) {
                    return bc
                        .hashPassword(req.body.password)
                        .then(hashedPassword => {
                            return db
                                .addUser(
                                    req.body.first,
                                    req.body.last,
                                    req.body.email,
                                    hashedPassword
                                )
                                .then(({ rows }) => {
                                    req.session.user = rows[0];
                                    const user = { ...rows[0] };
                                    res.json({ user, error: false });
                                });
                        });
                } else {
                    throw new Error("You forgot to fill out some fields!");
                }
            }
        })
        .catch(err => {
            console.log("error from register route: ", err);
            res.json({ error: true });
        });
});

app.post("/login", (req, res) => {
    db.checkByEmail(req.body.email)
        .then(({ rows }) => {
            if (rows.length == 0) {
                throw new Error("We don't know this email.");
            } else {
                return db.getPass(req.body.email).then(pass => {
                    const cryptedPass = pass.rows[0].password;
                    return bc
                        .checkPassword(req.body.password, cryptedPass)
                        .then(doesMatch => {
                            if (doesMatch) {
                                req.session.user = rows[0];
                                const user = { ...rows[0] };
                                res.json({ user, error: false });
                            } else {
                                throw new Error(
                                    "Password does not match, sorry."
                                );
                            }
                        });
                });
            }
        })
        .catch(err => {
            console.log("error from register route: ", err);
            res.json({ error: true });
        });
});

app.get("/logout", (req, res) => {
    req.session = null;
    res.json({ user: null });
});
