const multer = require("multer");
const path = require("path");

const { HttpError } = require("../helpers");

const tempDir = path.resolve("tmp");

const storage = multer.diskStorage({
  destination: tempDir,
  filename: (req, file, cb) => {
    const uniquePrefix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `${uniquePrefix}_${file.originalname}`);
  },
});

const upload = multer({
  storage,
  limits: {},
});

module.exports = upload;
