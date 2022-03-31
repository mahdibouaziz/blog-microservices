const express = require("express");
const bodyParser = require("body-parser");
const { default: axios } = require("axios");

const app = express();
// parse various different custom JSON types as JSON
app.use(bodyParser.json());

const events = [];

app.post("/events", (req, res) => {
  const event = req.body;

  events.push(event);

  axios.post("http://posts-clusterip-srv:4000/events", event); // posts service
  // axios.post("http://localhost:4001/events", event); // comments service
  // axios.post("http://localhost:4002/events", event); // query service
  // axios.post("http://localhost:4003/events", event); // moderation service

  res.status(200).send({ status: "OK" });
});

app.get("/events", (req, res) => {
  res.send(events);
});

app.listen(4005, () => {
  console.log("listening on 4005");
});
