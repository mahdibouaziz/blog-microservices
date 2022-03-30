const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { randomBytes } = require("crypto");

const app = express();
// parse various different custom JSON types as JSON
app.use(bodyParser.json());
//cors
app.use(cors());

// memory data
const commentsByPostId = {};

app.get("/posts/:id/comments", (req, res) => {
  const postId = req.params.id;
  res.send(commentsByPostId[postId] || []);
});

app.post("/posts/:id/comments", (req, res) => {
  const commentId = randomBytes(4).toString("hex");
  const content = req.body.content;
  const postId = req.params.id;

  const comments = commentsByPostId[postId] || [];
  comments.push({
    id: commentId,
    content,
  });

  // update the comments
  commentsByPostId[postId] = comments;

  res.status(201).send(commentsByPostId);
});

app.listen(4001, () => {
  console.log("listening on 4001");
});
