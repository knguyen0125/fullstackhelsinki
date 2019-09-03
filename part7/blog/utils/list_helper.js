const _ = require('lodash');

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0);
};

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return null;
  return blogs.reduce((favBlog, currentBlog) => {
    return favBlog.likes < currentBlog.likes ? currentBlog : favBlog;
  });
};

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return null;

  const result = _.countBy(blogs, (o) => o.author);
  const authorList = _.keys(result);
  const author = authorList.reduce((favoriteAuthor, currentAuthor) => {
    return result[favoriteAuthor] < result[currentAuthor]
      ? currentAuthor
      : favoriteAuthor;
  });

  return {
    author,
    blogs: result[author],
  };
};

const mostLikes = (blogs) => {
  if (blogs.length === 0) return null;

  const result = _.groupBy(blogs, (o) => o.author);
  // console.log(result);
  const likesByAuthor = _.transform(result, (ret, value, key) => {
    ret[key] = _.reduce(value, (sum, t) => sum + t.likes, 0);
  });

  const authorList = _.keys(result);
  const author = authorList.reduce((favoriteAuthor, currentAuthor) => {
    return likesByAuthor[favoriteAuthor] < likesByAuthor[currentAuthor]
      ? currentAuthor
      : favoriteAuthor;
  }, authorList[0]);

  return {
    author,
    likes: likesByAuthor[author],
  };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
