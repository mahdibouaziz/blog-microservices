const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");

const app = express();
// parse various different custom JSON types as JSON
app.use(bodyParser.json());
//cors
app.use(cors());

// memory data
const posts = {};

const handleEvent = (type, data) => {
  //create a post
  if (type == "PostCreated") {
    const { id, title } = data;
    posts[id] = { id, title, comments: [] };
  }

  // add a comment to the post
  if (type == "CommentCreated") {
    const { id, content, postId, status } = data;
    posts[postId].comments.push({ id, content, status });
  }

  // update comment
  if (type == "CommentUpdated") {
    const { id, content, postId, status } = data;
    // update the comment
    const post = posts[postId];
    const comment = post.comments.find((comment) => comment.id === id);

    comment.status = status;
    comment.content = content;
  }
};

app.get("/posts", (req, res) => {
  res.status(200).send(posts);
});

app.post("/events", (req, res) => {
  const { type, data } = req.body;
  console.log(type);
  handleEvent(type, data);

  res.status(201).send({});
});

app.listen(4002, async () => {
  console.log("listening on 4002");

  // sync events
  const res = await axios.get("http://localhost:4005/events"); // message broker service

  res.data.forEach((event) => {
    console.log("Processing event ", event.type);
    handleEvent(event.type, event.data);
  });
});
