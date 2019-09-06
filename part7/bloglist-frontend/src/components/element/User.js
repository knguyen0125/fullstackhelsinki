import React from "react";

const User = props => {
  if (!props.user) {
    return null;
  }
  return (
    <div className={props.className}>
      <h2>{props.user.name}</h2>
      <h4>added blogs</h4>
      <ul>
        {props.user.blogs.map(blog => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default User;
