import React from "react";
import PropTypes from "prop-types";
import CommentForm from "./CommentForm";

const CommentList = ({ blog }) => {
  return (
    <ul>
      {blog.comments.map(comment => (
        <li key={comment}>{comment}</li>
      ))}
    </ul>
  );
};

const Blog = ({ blog, handleLike, handleDelete, loggedUser }) => {
  return (
    <div>
      <h1>
        {blog.title} {blog.author}
      </h1>
      <div>
        <a href={blog.url}>{blog.url}</a>
        <p>
          {blog.likes} likes <button onClick={handleLike(blog)}>like</button>
        </p>
        {blog.user && <p>added by {blog.user.name}</p>}
        {loggedUser && blog.user.username === loggedUser.username && (
          <button onClick={handleDelete(blog)}>remove</button>
        )}
        <h2>comments</h2>
        <CommentForm blog={blog} />
        <CommentList blog={blog} />
      </div>
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object,
  handleLike: PropTypes.func,
  handleDelete: PropTypes.func,
  handleComment: PropTypes.func,
  loggedUser: PropTypes.object
};

export default Blog;
