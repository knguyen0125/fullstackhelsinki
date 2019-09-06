import React from "react";
import { useField } from "../../../hooks";
import { connect } from "react-redux";
import { commentBlog } from "../../../reducers/blogReducer";
import { createNotification } from "../../../reducers/notificationReducer";

const CommentForm = props => {
  const comment = useField("text");

  const handleComment = async event => {
    event.preventDefault();
    event.stopPropagation();
    try {
      await props.commentBlog(props.blog, comment.value);
      props.createNotification(
        `Successfully commented to ${props.blog.title}: ${comment.value}`
      );
    } catch (e) {
      props.createNotification(`Error: ${e}`, "error");
    }
  };

  return (
    <form onSubmit={handleComment}>
      <input
        type={comment.type}
        value={comment.value}
        onChange={comment.onChange}
      />
      <button type="submit">comment</button>
    </form>
  );
};

export default connect(
  null,
  { createNotification, commentBlog }
)(CommentForm);
