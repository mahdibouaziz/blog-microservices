import axios from "axios";
import React, { useState } from "react";

const CommentCreate = ({ postId }) => {
  const commentServiceUrl = `http://localhost:4001/posts/${postId}/comments`;

  const [content, setContent] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();

    await axios.post(commentServiceUrl, {
      content,
    });

    setContent("");
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>New Comment</label>
          <input
            className="form-control"
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <button className="btn btn-primary mt-3">Submit</button>
      </form>
    </div>
  );
};

export default CommentCreate;
