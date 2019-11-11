import React from "react";

const CommentItem = ({ username, text }) => {
  return (
    <div class="content">
      <div class="avatar">
        <img src="https://react.semantic-ui.com/images/avatar/small/matt.jpg" />
      </div>
      <a class="author">{username}</a>
      <div class="text">{text}</div>
    </div>
  );
};

export default CommentItem;
