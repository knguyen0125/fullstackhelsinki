import React from "react";
import { connect } from "react-redux";
import {
  commentBlog,
  deleteBlog,
  likeBlog
} from "../../../reducers/blogReducer";
import { createNotification } from "../../../reducers/notificationReducer";
import Blog from "./Blog";

const BlogContainer = props => {
  if (!props.blog) {
    return null;
  }

  const handleLike = blog => async e => {
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
    try {
      await props.deleteBlog(blog);
      props.createNotification(
        `successfully deleted ${blog.title} by ${blog.author}`
      );
    } catch (e) {
      props.createNotification(`cannot delete ${blog.title}`, "error");
    }
  };

  return (
    <Blog
      blog={props.blog}
      handleLike={handleLike}
      handleDelete={handleDelete}
      loggedUser={props.loggedUser}
    />
  );
};

const mapStateToProps = state => ({
  loggedUser: state.loggedUser
});

export default connect(
  mapStateToProps,
  { likeBlog, deleteBlog, createNotification, commentBlog }
)(BlogContainer);
