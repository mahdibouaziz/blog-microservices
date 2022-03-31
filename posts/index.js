const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");
const { randomBytes } = require("crypto");

const app = express();
// parse various different custom JSON types as JSON
app.use(bodyParser.json());
//cors
app.use(cors());

// memory data
const posts = {};

app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/posts", async (req, res) => {
  const id = randomBytes(4).toString("hex");
  const title = req.body.title;
  posts[id] = {
    id,
    title,
  };

  // emit an event to the message broker
  await axios.post("http://localhost:4005/events", {
    type: "PostCreated",
    data: {
      id,
      title,
    },
  });

  res.status(201).send(posts[id]);
});

app.post("/events", (req, res) => {
  console.log("Reveived event", req.body.type);
  res.status(201).send({});
});

app.listen(4000, () => {
  console.log("latest");
  console.log("listening on 4000");
});
