const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
// parse various different custom JSON types as JSON
app.use(bodyParser.json());

app.post("/events", (req, res) => {
  const { type, data } = req.body;
  console.log(type);
  // add a comment to the post
  if (type == "CommentCreated") {
    const { id, content, postId } = data;
    //
  }
});

app.listen(4003, () => {
  console.log("listening on 4003");
});
