const express = require("express");
const app = (exports.app = express());
const server = require("http").Server(app);
const io = require("socket.io")(server, {
    origins: "localhost:8080"
});

const cookieSession = require("cookie-session");
const cookieSessionMiddleware = (exports.cookieSessionMiddleware = cookieSession(
    {
        secret: `I'm always angry.`,
        maxAge: 1000 * 60 * 60 * 24 * 90
    }
));

const compression = require("compression");

app.use(compression());

if (process.env.NODE_ENV != "production") {
    app.use(
        "/bundle.js",
        require("http-proxy-middleware")({
            target: "http://localhost:8081/"
        })
    );
} else {
    app.use("/bundle.js", (req, res) => res.sendFile(`${__dirname}/bundle.js`));
}

app.use(express.static("./public"));

require("./routers/validation");
require("./routers/profiles");
require("./routers/articles");
require("./routers/links");
require("./routers/files");

app.get("*", function(req, res) {
    res.sendFile(__dirname + "/index.html");
});

io.use(function(socket, next) {
    cookieSessionMiddleware(socket.request, socket.request.res, next);
});

io.on("connection", async socket => {
    socket.on("disconnect", () => {});
});

server.listen(8080, () => {
    console.log("I'm listening.");
});
