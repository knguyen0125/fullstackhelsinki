import React from "react";
import { createAnecdote } from "../reducers/anecdoteReducer";
import {
  createNotification,
  clearNotification
} from "../reducers/notificationReducer";
import { connect } from "react-redux";

const AnecdoteForm = props => {
  const create = async e => {
    e.preventDefault();
    const content = e.target.content.value;
    e.target.content.value = "";
    props.createAnecdote(content);

    // Create notification
    props.createNotification(`${content} anecdote created`, 10);
  };
  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={create}>
        <div>
          <input name="content" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default connect(
  null,
  { createAnecdote, createNotification, clearNotification }
)(AnecdoteForm);
