import React from "react";
import CommentItem from "./CommentItem";
const Comment = ({ comment }) => {
  console.log(comment);

  const renderedList = comment.map(comment => {
    if (comment.subtype === "bot_message") {
      return <CommentItem username={comment.username} text={comment.text} />;
    }
  });

  return (
    <div class="ui comments">
      <h3 class="ui dividing header">Comments</h3>
      <div class="comment">{renderedList}</div>
    </div>
  );
};

export default Comment;
