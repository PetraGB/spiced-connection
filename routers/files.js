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

// const s3 = require("../s3");
// const config = require("../config");

const multer = require("multer");
const uidSafe = require("uid-safe");
const path = require("path");

const diskStorage = multer.diskStorage({
    destination: function(req, file, callback) {
        const uploadPath = path.join(__dirname, "..", "/uploads");
        callback(null, uploadPath);
    },
    filename: function(req, file, callback) {
        uidSafe(24).then(function(uid) {
            callback(null, uid + path.extname(file.originalname));
        });
    }
});

const uploader = multer({
    storage: diskStorage,
    limits: {
        fileSize: 2097152
    }
});

// app.post(
//     "/api/self/uploadpic",
//     requireUser,
//     uploader.single("file"),
//     s3.upload,
//     (req, res) => {
//         const pictureUrl = config.s3Url + req.file.filename;
//         db.addPictureUser(req.session.user.id, pictureUrl)
//             .then(({ rows }) => {
//                 res.json(rows[0]);
//             })
//             .catch(err => {
//                 console.log(err);
//             });
//     }
// );

app.post(
    "/api/article/uploadpic",
    requireUser,
    uploader.single("file"),
    (req, res) => {
        const pictureUrl = "./uploads/" + req.file.filename;

        db.addPictureArticle(req.body.id, pictureUrl)
            .then(({ rows }) => {
                res.json(rows[0]);
            })
            .catch(err => {
                console.log(err);
            });
    }
);

// app.post(
//     "/api/article/uploadpic",
//     requireUser,
//     uploader.single("file"),
//     s3.upload,
//     (req, res) => {
//         const pictureUrl = config.s3Url + req.file.filename;
//         console.log("check url", pictureUrl);
//
//         db.addPictureArticle(req.body.id, pictureUrl)
//             .then(({ rows }) => {
//                 res.json(rows[0]);
//             })
//             .catch(err => {
//                 console.log(err);
//             });
//     }
// );
