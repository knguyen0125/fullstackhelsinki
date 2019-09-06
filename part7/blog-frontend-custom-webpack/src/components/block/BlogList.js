import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledBlogItem = styled.div`
  border: 1px black solid;
  padding: 10px;
  margin-bottom: 5px;
  text-decoration: none;

  a {
    text-decoration: none;
    color: black;
  }
`;

const BlogList = props => {
  console.log(props);
  return (
    <div>
      {props.blogs.map(blog => (
        <StyledBlogItem key={blog.id}>
          <Link to={`/blogs/${blog.id}`}>
            <b>{blog.title}</b> by <i>{blog.author}</i>
          </Link>
        </StyledBlogItem>
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
