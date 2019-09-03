import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { likeBlog, deleteBlog, commentBlog } from "../reducers/blogReducer";
import { createNotification } from "../reducers/notificationReducer";
import { useField } from "../hooks";

const Blog = props => {
  const [detailVisible, setDetailVisible] = useState(false);
  const comment = useField("text");
  const boxStyle = {
    // border: "1px solid black",
    // padding: "5px",
    // marginBottom: "5px"
  };
  const detailStyle = {
    // display: detailVisible ? "" : "none"
  };

  if (!props.blog) {
    return null;
  }

  const handleLike = blog => async e => {
    e.preventDefault();
    try {
      await props.likeBlog(blog);
      props.createNotification(
        `successfully liked ${blog.title} by ${blog.author}`
      );
    } catch (e) {
      props.createNotification(`${e.response.data.error}`, "error");
    }
  };

  const handleDelete = blog => async e => {
    e.preventDefault();
    try {
      await props.deleteBlog(blog);
      props.createNotification(
        `successfully deleted ${blog.title} by ${blog.author}`
      );
    } catch (e) {
      props.createNotification(`cannot delete ${blog.title}`, "error");
    }
  };

  const handleComment = async event => {
    console.log("test");
    event.preventDefault();
    event.stopPropagation();
    try {
      await props.commentBlog(props.blog, comment.value);
      props.createNotification(
        `Sucessfully commented to ${props.blog.title}: ${comment.value}`
      );
    } catch (e) {
      props.createNotification(`Error: ${e}`, "error");
    }
  };

  return (
    <div style={boxStyle}>
      <h1 onClick={() => setDetailVisible(!detailVisible)}>
        {props.blog.title} {props.blog.author}
      </h1>
      <div style={detailStyle}>
        <a href={props.blog.url}>{props.blog.url}</a>
        <p>
          {props.blog.likes} likes{" "}
          <button onClick={handleLike(props.blog)}>like</button>
        </p>
        {props.blog.user && <p>added by {props.blog.user.name}</p>}
        {props.loggedUser &&
          props.blog.user.username === props.loggedUser.username && (
            <button onClick={handleDelete(props.blog)}>remove</button>
          )}
        <h2>comments</h2>
        <form onSubmit={handleComment}>
          <input
            type={comment.type}
            value={comment.value}
            onChange={comment.onChange}
          />
          <button type="submit">comment</button>
        </form>
        <ul>
          {props.blog.comments.map(comment => (
            <li key={comment}>{comment}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

// Blog.propTypes = {
//   blog: PropTypes.object.isRequired
// };

const mapStateToProps = state => ({
  loggedUser: state.loggedUser
});

export default connect(
  mapStateToProps,
  { likeBlog, deleteBlog, createNotification, commentBlog }
)(Blog);
