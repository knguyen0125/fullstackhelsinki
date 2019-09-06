import React, { useState } from "react";
import { connect } from "react-redux";
import { createBlog } from "../../reducers/blogReducer";
import { createNotification } from "../../reducers/notificationReducer";
import { Button } from "../ui";

const BlogCreation = props => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const handleBlogCreation = async e => {
    e.preventDefault();
    try {
      await props.createBlog({ title, author, url });
      await props.createNotification(`a new blog ${title} by ${author} added`);
    } catch (e) {
      createNotification(
        `blog ${title} was not created: ${e.response.data.error}`,
        "error"
      );
    } finally {
      setTitle("");
      setAuthor("");
      setUrl("");
    }
  };

  return (
    <div>
      <h1>create new</h1>
      <form onSubmit={handleBlogCreation}>
        <p>
          <label htmlFor="title">Title</label>
          <input
            name={"title"}
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
        </p>
        <p>
          <label htmlFor="author">Author</label>
          <input
            type="text"
            name={"author"}
            value={author}
            onChange={e => setAuthor(e.target.value)}
          />
        </p>
        <p>
          <label htmlFor="url">URL</label>
          <input
            type="text"
            name={"url"}
            value={url}
            onChange={e => setUrl(e.target.value)}
          />
        </p>
        <Button type="submit">Create</Button>
      </form>
    </div>
  );
};

export default connect(
  null,
  { createBlog, createNotification }
)(BlogCreation);
