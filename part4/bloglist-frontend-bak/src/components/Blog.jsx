import React, { useState } from 'react';
import PropTypes from 'prop-types';
const Blog = ({ blog, handleLike, handleDelete, currentUser }) => {
  const [detailVisible, setDetailVisible] = useState(false);
  const boxStyle = {
    border: '1px solid black',
    padding: '5px',
    marginBottom: '5px',
  };
  const detailStyle = { display: detailVisible ? '' : 'none' };
  return (
    <div style={boxStyle}>
      <div onClick={() => setDetailVisible(!detailVisible)}>
        {blog.title} {blog.author}
      </div>
      <div style={detailStyle}>
        <p>{blog.url}</p>
        <p>
          {blog.likes} likes <button onClick={handleLike(blog)}>like</button>
        </p>
        {blog.user && <p>added by {blog.user.name}</p>}
        {blog.user.username === currentUser.username && (
          <button onClick={handleDelete(blog)}>remove</button>
        )}
      </div>
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  handleLike: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  currentUser: PropTypes.object.isRequired,
};

export default Blog;
