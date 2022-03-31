const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { randomBytes } = require("crypto");
const axios = require("axios");

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

app.post("/posts/:id/comments", async (req, res) => {
  const commentId = randomBytes(4).toString("hex");
  const content = req.body.content;
  const postId = req.params.id;

  const comments = commentsByPostId[postId] || [];
  comments.push({
    id: commentId,
    content,
    status: "pending",
  });

  // update the comments
  commentsByPostId[postId] = comments;

  // emit an event to the message broker
  await axios.post("http://event-bus-srv:4005/events", {
    type: "CommentCreated",
    data: {
      id: commentId,
      content,
      postId,
      status: "pending",
    },
  });

  res.status(201).send(commentsByPostId);
});

app.post("/events", async (req, res) => {
  const { type, data } = req.body;
  console.log(type);

  // update the status of the comment
  if (type == "CommentModerated") {
    const { id, postId, status, content } = data;
    const comments = commentsByPostId[postId];

    const comment = comments.find((comment) => comment.id === id);
    comment.status = status;

    // emit an event to the message broker
    await axios.post("http://event-bus-srv:4005/events", {
      type: "CommentUpdated",
      data: { id, postId, status, content },
    });
  }

  res.status(201).send({});
});
app.listen(4001, () => {
  console.log("listening on 4001");
});
