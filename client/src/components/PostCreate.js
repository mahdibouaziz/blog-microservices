import axios from "axios";
import React from "react";
import { useState } from "react";

const postServiceUrl = "http://posts.com/posts";

const PostCreate = () => {
  const [title, setTitle] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();

    await axios.post(postServiceUrl, {
      title,
    });
    setTitle("");
  };

  return (
    <div>
      <h1>Create Post</h1>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input
            className="form-control"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <button className="btn btn-primary mt-3">Submit</button>
      </form>
    </div>
  );
};

export default PostCreate;
