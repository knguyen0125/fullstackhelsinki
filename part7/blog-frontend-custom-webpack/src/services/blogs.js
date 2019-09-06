import axios from "axios";

const baseUrl = "/api/blogs";

let token = null;

const setToken = newToken => {
  token = `bearer ${newToken}`;
};

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const create = async blog => {
  const config = {
    headers: { Authorization: token }
  };
  const response = await axios.post(baseUrl, blog, config);
  return response.data;
};

const like = async blog => {
  const config = {
    headers: { Authorization: token }
  };

  const response = await axios.put(
    `${baseUrl}/${blog.id}`,
    {
      user: blog.user.id,
      author: blog.author,
      title: blog.title,
      url: blog.url,
      likes: blog.likes + 1
    },
    config
  );

  return response.data;
};

const comment = async (blog, comment) => {
  console.log(blog);
  console.log(comment);
  const response = await axios.post(`${baseUrl}/${blog.id}/comments`, {
    comment
  });
  return response.data;
};

const deleteBlog = async blog => {
  const config = {
    headers: { Authorization: token }
  };

  const response = await axios.delete(`${baseUrl}/${blog.id}`, config);

  return response.data;
};

export default { getAll, setToken, create, like, deleteBlog, comment };
