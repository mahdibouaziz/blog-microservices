const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
// parse various different custom JSON types as JSON
app.use(bodyParser.json());
//cors
app.use(cors());

// memory data
const posts = {};

app.get("/posts", (req, res) => {
  res.status(200).send(posts);
});

app.post("/events", (req, res) => {
  const { type, data } = req.body;
  console.log(type);

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

  res.status(201).send({});
});

app.listen(4002, () => {
  console.log("listening on 4002");
});