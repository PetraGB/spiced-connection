function requireUser(req, res, next) {
    if (!req.session.user.id) {
        return res.redirect("/");
    }
    next();
}

function requireJournalist(req, res, next) {
    if (!req.session.user.journalist) {
        return res.redirect("/");
    }
    next();
}

function requireEditor(req, res, next) {
    if (!req.session.user.editor) {
        return res.redirect("/");
    }
    next();
}

function requireAdmin(req, res, next) {
    if (!req.session.user.admin.admin) {
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
