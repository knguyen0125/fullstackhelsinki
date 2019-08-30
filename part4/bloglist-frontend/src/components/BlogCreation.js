import React from 'react';
import PropTypes from 'prop-types';

const BlogCreation = ({
  title,
  author,
  url,
  handleTitle,
  handleAuthor,
  handleUrl,
  handleBlogCreation,
}) => {
  return (
    <div>
      <h1>create new</h1>
      <form onSubmit={handleBlogCreation}>
        <p>
          title <input type="text" value={title} onChange={handleTitle} />
        </p>
        <p>
          author <input type="text" value={author} onChange={handleAuthor} />
        </p>
        <p>
          url <input type="text" value={url} onChange={handleUrl} />
        </p>
        <button type="submit">create</button>
      </form>
    </div>
  );
};
BlogCreation.propTypes = {
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  handleTitle: PropTypes.func.isRequired,
  handleAuthor: PropTypes.func.isRequired,
  handleUrl: PropTypes.func.isRequired,
  handleBlogCreation: PropTypes.func.isRequired,
};
export default BlogCreation;
