import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import CommentCreate from "./CommentCreate";
import CommentList from "./CommentList";

const queryServiceUrl = "http://posts.com/posts";

const PostList = () => {
  const [posts, setPosts] = useState({});

  const fetchPosts = async () => {
    const res = await axios.get(queryServiceUrl);
    // console.log(res.data);
    setPosts(res.data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const renderedPosts = Object.values(posts);

  return (
    <div>
      <h1>Post List</h1>
      <div className="d-flex flex-row flex-wrap justify-content-between">
        {renderedPosts.map((post) => (
          <div
            className="card"
            style={{ width: "30%", marginBottom: "20px" }}
            key={post.id}
          >
            <div className="card-body">
              <h3>{post.title}</h3>
              <CommentList comments={post.comments} />
              <CommentCreate postId={post.id} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostList;
