const assert = require("assert");
const request = require("supertest");
const {
  model: { Url }
} = require("../URLShortener");

describe("/api/shorturl", () => {
  let server;
  beforeEach(() => {
    server = require("../../index");
  });
  afterEach(done => {
    Url.deleteMany({})
      .then(() => server.close())
      .then(() => done());
  });

  describe("POST /", () => {
    let url;
    beforeEach(() => {
      url = "https://www.google.com";
    });

    const exec = () =>
      request(server)
        .post("/api/shorturl")
        .send({ url });

    it("should return error object if the url is invalid", done => {
      url = "asdasdasdasd";
      exec().then(res => {
        assert(res.status === 400);
        assert(res.body.error === "invalid URL");
        done();
      });
    });
    it("should return both the original url and shortened url if the url is valid", done => {
      exec().then(res => {
        assert(res.status === 200);
        assert(res.body["short_url"] !== undefined);
        done();
      });
    });
  });
});
