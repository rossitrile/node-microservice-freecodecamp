const route = require("express").Router();
const shortid = require("shortid");

const { Url } = require("./urlModel");

const formatResponse = (original, shorten) => ({
  original_url: original,
  short_url: shorten
});

route.get("/:short_url", async (req, res) => {
  const url = await Url.findOne({ shortened_url: req.params["short_url"] });
  if (!url) return res.status(400).send({ error: "Invalid Shortened URL" });
  const orignalUrl = url["original_url"];
  res.redirect(orignalUrl);
});
route.post("/", async (req, res) => {
  // regular expression that match http(s)://(www.)example.com
  const urlPattern = /^(?:(?:https?):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;

  const validUrl = urlPattern.test(req.body.url);
  if (!validUrl) return res.status(400).send({ error: "invalid URL" });

  // check if url exists in the database
  let url = await Url.findOne({ original_url: req.body.url });
  if (url)
    return res.send(formatResponse(url["original_url"], url["shortened_url"]));

  // generate new short url and check if that url exists
  let shortened_url = shortid.generate();
  let shortUrl = await Url.findOne({ shortened_url });
  if (shortUrl) shortened_url = shortid.generate();

  // save that url and shortened url to the databse and return
  const original_url = req.body.url.includes("http")
    ? req.body.url
    : `http://${req.body.url}`;
    
  const newUrl = new Url({ original_url, shortened_url });
  await newUrl.save();
  res.send(formatResponse(newUrl["original_url"], newUrl["shortened_url"]));
});

module.exports = route;
