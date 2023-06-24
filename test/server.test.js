const request = require("supertest");
const app = require("../server");
const chai = require("chai");
const expect = chai.expect;

describe("Streamer Spotlight Application", () => {
  describe("POST /streamers", () => {
    it("should create a new streamer", (done) => {
      const streamerData = {
        name: "Streamer Name",
        platform: "Twitch",
        description: "Streamer description",
      };

      request(app)
        .post("/streamers")
        .send(streamerData)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);

          // Assert the response body or any other expectations
          expect(res.body.name).to.equal(streamerData.name);
          expect(res.body.platform).to.equal(streamerData.platform);
          expect(res.body.description).to.equal(streamerData.description);
          expect(res.body.id).to.exist;

          done();
        });
    });
  });

  describe("GET /streamers", () => {
    it("should retrieve all streamers", (done) => {
      request(app)
        .get("/streamers")
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);

          // Assert the response body
          expect(res.body).to.be.an("array");

          done();
        });
    });
  });

  describe("GET /streamer/:streamerId", () => {
    it("should retrieve a specific streamer", (done) => {
      const streamerData = {
        name: "Streamer Name",
        platform: "Twitch",
        description: "Streamer description",
      };

      request(app)
        .post("/streamers")
        .send(streamerData)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);

          // Retrieve the created streamer's ID from the response
          const streamerId = res.body.id;

          request(app)
            .get(`/streamer/${streamerId}`)
            .expect(200)
            .end((err, res) => {
              if (err) return done(err);

              // Assert the response body
              expect(res.body.name).to.equal(streamerData.name);
              expect(res.body.platform).to.equal(streamerData.platform);
              expect(res.body.description).to.equal(streamerData.description);
              expect(res.body.id).to.equal(streamerId);

              done();
            });
        });
    });
  });

  describe("PUT /streamers/:streamerId/vote", () => {
    it("should update the vote count of a streamer", (done) => {
      // Create a streamer to vote on
      const streamerData = {
        name: "Streamer Name",
        platform: "Twitch",
        description: "Streamer description",
      };

      request(app)
        .post("/streamers")
        .send(streamerData)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);

          // Retrieve the created streamer's ID from the response
          const streamerId = res.body.id;

          // Update the vote count of the streamer
          const voteType = "upvote";

          request(app)
            .put(`/streamers/${streamerId}/vote`)
            .send({ voteType })
            .expect(200)
            .end((err, res) => {
              if (err) return done(err);

              // Assert the response body
              expect(res.body.upvotes).to.equal(1);

              done();
            });
        });
    });
  });
});
