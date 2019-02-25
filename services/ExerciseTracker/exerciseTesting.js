const assert = require("assert");
const request = require("supertest");
const mongoose = require("mongoose");
const { Exercise, User } = require("./exerciseModel");

describe("/api/exercise", () => {
  let server;
  beforeEach(() => (server = require("../../index")));
  afterEach(done => {
    Exercise.deleteMany({})
      .then(() => User.deleteMany({}))
      .then(() => server.close())
      .then(() => done());
  });
  describe("POST /new-user", () => {
    let username;
    beforeEach(() => (username = "Random"));
    const exec = () =>
      request(server)
        .post("/api/exercise/new-user")
        .send({ username });
    it("should return an object with error property if username is empty", done => {
      username = "";
      exec().then(res => {
        assert(res.status === 400);
        assert(res.body.error === "username cannot be empty");
        done();
      });
    });
    it("should return an object with userId and username if username is not empty", done => {
      exec().then(res => {
        assert(res.status === 200);
        assert(res.body["_id"] !== undefined);
        assert(res.body["username"] !== undefined);
        done();
      });
    });
  });
  describe("POST /add", () => {
    let user, exercise;
    beforeEach(async () => {
      user = new User({ username: "Testing User" });
      await user.save();
      exercise = {
        userId: user._id,
        description: "Testing Description",
        duration: 30,
        date: "2019-02-25"
      };
    });
    const exec = () =>
      request(server)
        .post("/api/exercise/add")
        .send(exercise);
    it("should return 400 and error if userId is empty", done => {
      exercise["userId"] = "";
      exec().then(res => {
        assert(res.status === 400);
        assert(
          res.body.error ===
            "userId has to be a mongodb id object and cannot be empty"
        );
        done();
      });
    });
    it("should return 400 and error if userId is missing", done => {
      delete exercise["userId"];
      exec().then(res => {
        assert(res.status === 400);
        assert(
          res.body.error ===
            "userId has to be a mongodb id object and cannot be empty"
        );
        done();
      });
    });
    it("should return 400 and error if userId is not valid", done => {
      exercise["userId"] = "asdasdqweioljqwel;kjadsf";
      exec().then(res => {
        assert(res.status === 400);
        assert(
          res.body.error ===
            "userId has to be a mongodb id object and cannot be empty"
        );
        done();
      });
    });
    it("should return 400 and error if userId is not in the database", done => {
      exercise["userId"] = mongoose.Types.ObjectId();
      exec().then(res => {
        assert(res.status === 400);
        assert(res.body.error === "user not found.");
        done();
      });
    });
    it("should return 400 and error if description is empty", done => {
      exercise["description"] = "";
      exec().then(res => {
        assert(res.status === 400);
        assert(res.body.error === "description cannot be empty.");
        done();
      });
    });
    it("should return 400 and error if duration is empty", done => {
      exercise["duration"] = "";
      exec().then(res => {
        assert(res.status === 400);
        assert(
          res.body.error ===
            "Duration has to be a number greater than 10 and cannot be empty."
        );
        done();
      });
    });
    it("should return 400 and error if duration is not a number", done => {
      exercise["duration"] = "123asdasd";
      exec().then(res => {
        assert(res.status === 400);
        assert(
          res.body.error ===
            "Duration has to be a number greater than 10 and cannot be empty."
        );
        done();
      });
    });
    it("should return 400 and error if duration is < 10", done => {
      exercise["duration"] = 9;
      exec().then(res => {
        assert(res.status === 400);
        assert(
          res.body.error ===
            "Duration has to be a number greater than 10 and cannot be empty."
        );
        done();
      });
    });
    it("should return 400 and error if date is not in the right format", done => {
      exercise["date"] = "11-08-1993";
      exec().then(res => {
        assert(res.status === 400);
        assert(res.body.error === "date has to be in the YYYY-MM-DD format");
        done();
      });
    });
    it("should return 200 and an object describe the newly created exercise", done => {
      exec().then(res => {
        assert(res.status === 200);
        assert(res.body.userId.toString() === user["_id"].toString());
        assert(res.body.username === user["username"]);
        assert(res.body.description === exercise["description"]);
        assert(res.body.duration === exercise["duration"]);
        done();
      });
    });
  });
  describe("GET /log?{userId}[&from][&to][&limit]", () => {
    let user, ex1, ex2, log;
    beforeEach(async () => {
      ex1 = {
        description: "ex1",
        duration: 20,
        date: new Date("2019-01-15").toUTCString()
      };
      ex2 = {
        description: "ex2",
        duration: 30,
        date: new Date("2019-02-15").toUTCString()
      };
      user = new User({ username: "Test User" });
      user["exercises"].push(ex1);
      user["exercises"].push(ex2);

      await user.save();

      log = [`userId=${user._id}`];
    });
    const exec = () =>
      request(server).get("/api/exercise/log?" + log.join("&"));

    it("should return 400 if userId is missing", done => {
      log = [];
      exec().then(res => {
        assert(res.status === 400);
        assert(
          res.body.error ===
            "userId has to be a mongodb id object and cannot be empty"
        );
        done();
      });
    });
    it("should return 400 if userId is invalid", done => {
      log = ["userId=asdasdasd12asdasd3"];
      exec().then(res => {
        assert(res.status === 400);
        assert(
          res.body.error ===
            "userId has to be a mongodb id object and cannot be empty"
        );
        done();
      });
    });
    it("should return 400 if user is not in the database", done => {
      log = [`userId=${mongoose.Types.ObjectId()}`];
      exec().then(res => {
        assert(res.status === 400);
        assert(res.body.error === "user not found.");
        done();
      });
    });
    it("should return 200 and 1 exercise if from is < 15/2, >15/1, and To is missing", done => {
      log.push("from=2019-01-16");
      exec().then(res => {
        assert(res.status === 200);
        assert(res.body.exercises.length === 1);
        done();
      });
    });

    it("should return 200 and 2 exercise if from is < 15/1, and To is missing", done => {
      log.push("from=2019-01-14");
      exec().then(res => {
        assert(res.status === 200);
        assert(res.body.exercises.length === 2);
        done();
      });
    });
    it("should return 200 and 0 exercise if from is > 15/2, and To is missing", done => {
      log.push("from=2019-02-18");
      exec().then(res => {
        assert(res.status === 200);
        assert(res.body.exercises.length === 0);
        done();
      });
    });
    it("should return 200 and 1 exercise if To is < 15/2 and From is missing", done => {
      log.push("to=2019-02-14");
      exec().then(res => {
        assert(res.status === 200);
        assert(res.body.exercises.length === 1);
        done();
      });
    });
    it("should return 200 and 2 exercise if To is > 15/2, and From is missing", done => {
      log.push("to=2019-02-17");
      exec().then(res => {
        assert(res.status === 200);
        assert(res.body.exercises.length === 2);
        done();
      });
    });
    it("should return 200 and 0 exercise if To is < 15/1, and From is missing", done => {
      log.push("to=2019-01-14");
      exec().then(res => {
        assert(res.status === 200);
        assert(res.body.exercises.length === 0);
        done();
      });
    });
    it("should return 200 and 1 exercise if From < 15 / 1 and To < 15 / 2", done => {
      log.push("from=2019-01-14");
      log.push("to=2019-02-14");
      exec().then(res => {
        assert(res.status === 200);
        assert(res.body.exercises.length === 1);
        done();
      });
    });
    it("should return 200 and 2 exercise if From < 15 / 1 and To > 15 / 2", done => {
      log.push("from=2019-01-14");
      log.push("to=2019-02-16");
      exec().then(res => {
        assert(res.status === 200);
        assert(res.body.exercises.length === 2);
        done();
      });
    });
    it("should return 200 and 0 exercise if From < 15 / 1 and To < 15 / 1", done => {
      log.push("from=2019-01-14");
      log.push("to=2019-01-14");
      exec().then(res => {
        assert(res.status === 200);
        assert(res.body.exercises.length === 0);
        done();
      });
    });
    it("should return 200 and 1 exercise if limit = 1 after from and to is filtered", done => {
      log.push("from=2019-01-14");
      log.push("to=2019-02-16");
      log.push("limit=1");
      exec().then(res => {
        assert(res.status === 200);
        assert(res.body.exercises.length === 1);
        done();
      });
    });
    it("should return 200 and 2 exercise if limit = 0 after from and to is filtered", done => {
      log.push("from=2019-01-14");
      log.push("to=2019-02-16");
      log.push("limit=0");
      exec().then(res => {
        assert(res.status === 200);
        assert(res.body.exercises.length === 0);
        done();
      });
    });
    it("should return 200 and 2 exercise only userId is present", done => {
      exec().then(res => {
        assert(res.status === 200);
        assert(res.body.exercises.length === 2);
        done();
      });
    });
  });
});
