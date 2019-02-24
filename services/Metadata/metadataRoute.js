const route = require("express").Router();
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage });

route.post("/", upload.single("upfile"), (req, res) => {
  if (!req.file) return res.status(400).send("You must upload a file");
  const { originalname: name, mimetype: type, size } = req.file;
  res.send({ name, type, size });
});

module.exports = route;
