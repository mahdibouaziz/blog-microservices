import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";

const CommentList = ({ postId }) => {
  const commentServiceUrl = `http://localhost:4001/posts/${postId}/comments`;

  const [comments, setComments] = useState([]);

  const fetchComments = async () => {
    const res = await axios.get(commentServiceUrl);
    setComments(res.data);
  };

  useEffect(() => {
    fetchComments();
  }, []);

  return (
    <>
      <ul>
        {comments.map((comment) => (
          <li key={comment.id}>{comment.content}</li>
        ))}
      </ul>
    </>
  );
};

export default CommentList;
