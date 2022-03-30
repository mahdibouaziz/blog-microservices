const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
// parse various different custom JSON types as JSON
app.use(bodyParser.json());

app.post("/events", async (req, res) => {
  const { type, data } = req.body;
  console.log(type);
  // add a comment to the post
  if (type == "CommentCreated") {
    const { content } = data;
    // logic to approve or reject the content
    const status = content.includes("orange") ? "rejected" : "approved";

    // send data to the message broker
    await axios.post("http://localhost:4005/events", {
      type: "CommentModerated",
      data: {
        ...data,
        status,
      },
    });
  }

  res.send({});
});

app.listen(4003, () => {
  console.log("listening on 4003");
});
