import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Blog from "./Blog";

const BlogList = props => {
  console.log(props);
  return (
    <div>
      {props.blogs.map(blog => (
        <Link to={`/blogs/${blog.id}`} key={blog.id}>
          <div>{blog.title}</div>
        </Link>
      ))}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    blogs: state.blogs
  };
};

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BlogList);
