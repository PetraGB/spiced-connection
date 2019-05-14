function requireUser(req, res, next) {
    if (!req.session.user.id) {
        return res.redirect("/");
    }
    next();
}

function requireJournalist(req, res, next) {
    if (req.session.user.status < 2) {
        return res.redirect("/");
    }
    next();
}

function requireEditor(req, res, next) {
    if (req.session.user.status < 3) {
        return res.redirect("/");
    }
    next();
}

function requireAdmin(req, res, next) {
    if (req.session.user.status < 4) {
        return res.redirect("/");
    }
    next();
}

module.exports = {
    requireUser,
    requireJournalist,
    requireEditor,
    requireAdmin
};
