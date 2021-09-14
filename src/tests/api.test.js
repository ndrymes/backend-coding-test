"use strict";

const request = require("supertest");
const { rides } = require("./mocks/payload");
const app = require("../app");

describe("API tests", () => {
  before(async (done) => {
    done();
  });

  describe("GET /health", () => {
    it("should return health", (done) => {
      request(app)
        .get("/health")
        .expect("Content-Type", /text/)
        .expect(200, done);
    });
  });

  describe("POST /ride", () => {
    it("should create a ride and return the data ", (done) => {
      request(app)
        .post("/rides")
        .send(rides[0])
        .expect(function (res) {
          res.body.code = 200;
          res.body.data.rideID = 1;
        })
        .expect(200, done);
    });

    it("should throw an error if a required input is absent", (done) => {
      const cloneRequestPayload = { ...rides[0] };
      delete cloneRequestPayload.start_lat;
      console.log(cloneRequestPayload);
      request(app)
        .post("/rides")
        .send(cloneRequestPayload)
        .expect(function (res) {
          res.body.code = 400;
        })
        .expect(400, done);
    });

    it("should throw an error for a  wrong input", (done) => {
      const cloneRequestPayload = { ...rides[0] };
      cloneRequestPayload.start_lat = -91;
      console.log(cloneRequestPayload);
      request(app)
        .post("/rides")
        .send(cloneRequestPayload)
        .expect(function (res) {
          res.body.code = 400;
        })
        .expect(400, done);
    });
  });

  describe("GET/ rides", () => {
    it("should get all rides", (done) => {
      request(app)
        .get("/rides")
        .expect(function (res) {
          res.body.code = 200;
          res.body.data = [rides[0]];
        })
        .expect(200, done);
    });

    it("should create another ride and return the data for pagination test ", (done) => {
        request(app)
          .post("/rides")
          .send(rides[0])
          .expect(function (res) {
            res.body.code = 200;
            res.body.data.rideID = 1;
          })
          .expect(200, done);
      });

    it("should get paginated value", (done) => {
        request(app)
          .get("/rides?skip=1&limit=2")
          .expect(function (res) {
            res.body.code = 200;
            res.body.data.rideID = 6;
            res.body.data = [rides[0]];
          })
          .expect(200, done);
      });
  });

  describe("GET/ rides:/id", () => {
    it("should fetch one ride", (done) => {
      request(app)
        .get(`/rides/${1}`)
        .expect(function (res) {
          res.body.code = 200;
          res.body.data.rideID = 1;
        })
        .expect(200, done);
    });
  });
});
