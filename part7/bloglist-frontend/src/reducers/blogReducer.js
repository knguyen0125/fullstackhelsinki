import blogService from "../services/blogs";

const blogReducer = (state = [], action) => {
  console.log(action, state);
  switch (action.type) {
    case "@BLOG/INIT":
      return action.data;
    case "@BLOG/CREATE":
      return state.concat(action.data);
    case "@BLOG/DELETE":
      return state.filter(blog => blog.id !== action.data.id);
    case "@BLOG/LIKE":
      return state.map(blog =>
        blog.id === action.data.id ? action.data : blog
      );
    case "@BLOG/COMMENT":
      return state.map(blog =>
        blog.id === action.data.id ? action.data : blog
      );
    default:
      return state;
  }
};

export const initializeBlog = () => {
  return async dispatch => {
    const blogs = await blogService.getAll();

    dispatch({
      type: "@BLOG/INIT",
      data: blogs
    });
  };
};

export const createBlog = blog => {
  return async dispatch => {
    const createdBlog = await blogService.create(blog);

    dispatch({
      type: "@BLOG/CREATE",
      data: createdBlog
    });
  };
};

export const deleteBlog = blog => {
  return async dispatch => {
    await blogService.deleteBlog(blog);

    dispatch({
      type: "@BLOG/DELETE",
      data: blog
    });
  };
};

export const commentBlog = (blog, comment) => async dispatch => {
  const commentedBlog = await blogService.comment(blog, comment);

  dispatch({
    type: "@BLOG/COMMENT",
    data: commentedBlog
  });
};

export const likeBlog = blog => {
  return async dispatch => {
    const likedBlog = await blogService.like(blog);

    dispatch({
      type: "@BLOG/LIKE",
      data: likedBlog
    });
  };
};

export default blogReducer;
