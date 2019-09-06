import React from "react";
import { connect } from "react-redux";
import { BlogContainer } from "../components/element/Blog";

const BlogView = props => {
  return (
    <BlogContainer
      blog={props.blogs.find(blog => blog.id === props.match.params.id)}
    />
  );
};

export default connect(state => ({
  blogs: state.blogs
}))(BlogView);
