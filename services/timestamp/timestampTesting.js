const assert = require("assert");
const request = require("supertest");
describe("/api/timestamp", () => {
  let server;
  beforeEach(() => {
    server = require("../../index");
  });
  describe("GET /", () => {
    let dateString;
    beforeEach(() => {
      dateString = "2015-12-25";
    });
    const exec = () => request(server).get("/api/timestamp/" + dateString);

    it("should receive an error if dateString is in DD-MM-YYYY format", done => {
      dateString = "11-08-1993";
      exec().then(res => {
        assert(res.status === 400);
        assert(res.body.error === "Invalid Date");
        done();
      });
    });
    it("should receive an error if dateString is in MM-DD-YYYY format", done => {
        dateString = "12-25-1993";
        exec().then(res => {
          assert(res.status === 400);
          assert(res.body.error === "Invalid Date");
          done();
        });
      });
    it("should receive a JSON with two keys if dateString is empty", done => {
      dateString = "";
      exec().then(res => {
        assert(res.status === 200);
        assert(res.body.unix !== undefined);
        assert(res.body.utc !== undefined);
        done();
      });
    });
    it("should receive a JSON with two keys if dateString is valid", done => {
      exec().then(res => {
        assert(res.status === 200);
        assert(res.body.unix !== undefined);
        assert(res.body.utc !== undefined);
        done();
      });
    });
    it("should receive a JSON with two keys if dateString is unix", done => {
      dateString = "1479663089000";
      exec().then(res => {
        assert(res.status === 200);
        assert(res.body.unix !== undefined);
        assert(res.body.utc !== undefined);
        done();
      });
    });
  });
});
