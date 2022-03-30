import React from "react";

const CommentList = ({ comments }) => {
  let content;

  return (
    <>
      <ul>
        {comments.map((comment) => {
          if (comment.status === "approved") content = comment.content;

          if (comment.status === "pending")
            content = "This comment is awaiting moderation";

          if (comment.status === "rejected")
            content = "This comment has been rejected";

          return <li key={comment.id}>{content}</li>;
        })}
      </ul>
    </>
  );
};

export default CommentList;
