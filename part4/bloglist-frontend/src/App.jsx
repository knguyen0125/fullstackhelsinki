import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import Blog from './components/Blog';
import BlogCreation from './components/BlogCreation';
import LoginService from './services/login';
import BlogService from './services/blogs';
import Notification from './components/Notification';
import Toggleable from './components/Toggleable';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const [notification, setNotification] = useState(null);

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };
  const handleTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleAuthor = (e) => {
    setAuthor(e.target.value);
  };

  const handleUrl = (e) => {
    setUrl(e.target.value);
  };

  const handleBlogCreation = async (e) => {
    e.preventDefault();

    try {
      const createdBlog = await BlogService.create({ title, author, url });
      setBlogs(blogs.concat(createdBlog));

      createNotification(`a new blog ${title} by ${author} added`, 'success');
    } catch (e) {
      createNotification(
        `blog ${title} was not created: ${e.response.data.error}`,
        'error',
      );
    } finally {
      setTitle('');
      setAuthor('');
      setUrl('');
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const data = await LoginService.login({
        username,
        password,
      });

      window.localStorage.setItem('loggedUser', JSON.stringify(data));
      setUser(data);
      BlogService.setToken(data.token);
    } catch (e) {
      createNotification('wrong username or password', 'error');
    } finally {
      setUsername('');
      setPassword('');
    }
  };

  const handleLogout = async (e) => {
    e.preventDefault();

    window.localStorage.removeItem('loggedUser');
    setUser(null);
  };

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedUser');

    if (loggedUser) {
      const parsedLoggedUser = JSON.parse(loggedUser);

      setUser(parsedLoggedUser);
      BlogService.setToken(parsedLoggedUser.token);
    }
  }, []);

  useEffect(() => {
    async function getData() {
      const fetchedBlogs = await BlogService.getAll();
      setBlogs(fetchedBlogs);
    }

    getData();
  }, []);

  const createNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  const notLoggedInPage = () => (
    <Login
      username={username}
      password={password}
      handleUsername={handleUsername}
      handlePassword={handlePassword}
      handleLogin={handleLogin}
    />
  );

  const handleLike = (blog) => async (e) => {
    try {
      const updatedBlog = await BlogService.like(blog);

      setBlogs(
        blogs.map((blog) => (blog.id === updatedBlog.id ? updatedBlog : blog)),
      );

      createNotification(`successfully liked ${blog.title} by ${blog.author}`);
    } catch (e) {
      createNotification(`${e.response.data.error}`, 'error');
    }
  };

  const handleDelete = (blog) => async (e) => {
    try {
      const confirmDelete = window.confirm(
        `remove blog ${blog.title} by ${blog.author}`,
      );

      if (confirmDelete) {
        const updatedBlog = await BlogService.deleteBlog(blog);

        setBlogs(blogs.filter((currentBlog) => currentBlog.id !== blog.id));

        createNotification(
          `successfully deleted ${blog.title} by ${blog.author}`,
        );
      }
    } catch (e) {
      createNotification(`cannot delete ${blog.title}`, 'error');
    }
  };

  const loggedInPage = () => (
    <>
      <div>
        <p>
          {user.name} is logged in{' '}
          <button onClick={handleLogout}>logout</button>
        </p>
      </div>
      <Toggleable buttonLabel="new blog">
        <BlogCreation
          handleAuthor={handleAuthor}
          author={author}
          handleTitle={handleTitle}
          title={title}
          handleUrl={handleUrl}
          url={url}
          handleBlogCreation={handleBlogCreation}
        />
      </Toggleable>
      <div className="blogs">
        {blogs.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            handleLike={handleLike}
            handleDelete={handleDelete}
            currentUser={user}
          />
        ))}
      </div>
    </>
  );

  return (
    <div className="App">
      <h1>blogs</h1>
      <Notification notification={notification} />
      {user === null ? notLoggedInPage() : loggedInPage()}
    </div>
  );
}

export default App;
