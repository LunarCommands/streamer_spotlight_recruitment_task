const cors = require("cors");
const Streamer = require("./models/Streamer");
const express = require("express");
const app = express();
app.use(cors());
app.use(express.json());

// Synchronize the Sequelize models with the database
Streamer.sync()
  .then(() => {
    console.log("Database synchronized");
  })
  .catch((error) => {
    console.error("Error synchronizing database:", error);
  });

// POST /streamers endpoint
app.post("/streamers", (req, res) => {
  const { name, platform, description } = req.body;

  Streamer.create({ name, platform, description })
    .then((streamer) => {
      res.json(streamer);
    })
    .catch((error) => {
      console.error("Error creating streamer:", error);
      res.status(500).json({ error: "Failed to create streamer" });
    });
});

// GET /streamers endpoint
app.get("/streamers", (req, res) => {
  Streamer.findAll()
    .then((streamers) => {
      res.json(streamers);
    })
    .catch((error) => {
      console.error("Error retrieving streamers:", error);
      res.status(500).json({ error: "Failed to retrieve streamers" });
    });
});

// GET /streamer/:streamerId endpoint
app.get("/streamer/:streamerId", (req, res) => {
  const { streamerId } = req.params;

  Streamer.findByPk(streamerId)
    .then((streamer) => {
      if (streamer) {
        res.json(streamer);
      } else {
        res.status(404).json({ error: "Streamer not found" });
      }
    })
    .catch((error) => {
      console.error("Error retrieving streamer:", error);
      res.status(500).json({ error: "Failed to retrieve streamer" });
    });
});

// PUT /streamers/:streamerId/vote endpoint
app.put("/streamers/:streamerId/vote", (req, res) => {
  const { streamerId } = req.params;
  const { voteType } = req.body;

  Streamer.findByPk(streamerId)
    .then((streamer) => {
      if (streamer) {
        if (voteType === "upvote") {
          streamer.upvotes += 1;
        } else if (voteType === "downvote") {
          streamer.downvotes += 1;
        }

        return streamer.save();
      } else {
        res.status(404).json({ error: "Streamer not found" });
      }
    })
    .then((updatedStreamer) => {
      res.json(updatedStreamer);
    })
    .catch((error) => {
      console.error("Error updating streamer:", error);
      res.status(500).json({ error: "Failed to update streamer" });
    });
});

// Export the app instance
module.exports = app;

const port = 3001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
