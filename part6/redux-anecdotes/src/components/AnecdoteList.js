import React from "react";
import _ from "lodash";
import { voteAnecdote } from "../reducers/anecdoteReducer";
import {
  clearNotification,
  createNotification
} from "../reducers/notificationReducer";
import { connect } from "react-redux";

const AnecdoteList = props => {
  // const anecdotes = props.store.getState().anecdotes;
  // const anecdoteFilter = props.store.getState().filter;

  const vote = id => {
    console.log("vote", id);
    props.voteAnecdote(id);
    props.createNotification(
      `you voted ${props.anecdotes.find(a => a.id === id).content}`,
     5
    );
    // setTimeout(() => {
    //   props.clearNotification();
    // }, 5000);
  };

  return (
    <div>
      <h2>Anecdote List</h2>
      {props.visibleAnecdotes.map(anecdote => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

const anecdotesToShow = ({ anecdotes, filter }) => {
  return _.sortBy(anecdotes, anecdote => anecdote.votes)
    .reverse()
    .filter(anecdote =>
      anecdote.content.toLowerCase().includes(filter.toLowerCase())
    );
};

const mapStateToProps = state => {
  console.log(state);
  return {
    anecdotes: state.anecdotes,
    anecdoteFilter: state.filter,
    visibleAnecdotes: anecdotesToShow(state)
  };
};

const mapDispatchToProps = {
  clearNotification,
  createNotification,
  voteAnecdote
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList);
