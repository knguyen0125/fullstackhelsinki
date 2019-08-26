import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

const createZeroFilledArray = (length) => {
  return new Array(length).fill(0);
  //   return Array.apply(null, new Array(length)).map(Number.prototype.valueOf, 0);
};

const generateRandomNumber = (max) => {
  return Math.floor(Math.random() * max);
};

const App = (props) => {
  const [selected, setSelected] = useState(0);
  const [mostVoted, setMostVoted] = useState(0);
  const [votes, setVotes] = useState(
    createZeroFilledArray(props.anecdotes.length),
  );

  const randomizeAnecdote = () => {
    setSelected(generateRandomNumber(props.anecdotes.length));
  };

  const vote = (selected) => () => {
    const newVotes = [...votes];
    newVotes[selected] += 1;
    setVotes(newVotes);
    //   updateMostVoted();
  };

  const updateMostVoted = () => {
    let mostVotedIndex = 0;
    let mostVotedValue = votes[0];
    for (let i = 0; i < props.anecdotes.length; i++) {
      if (votes[i] > mostVotedValue) {
        mostVotedIndex = i;
        mostVotedValue = votes[i];
      }
    }

    // console.log(mostVotedIndex, mostVotedValue);

    setMostVoted(mostVotedIndex);
  };

  // Updates Most Voted after votes changes
  // Workaround due to the fact that setStates (and by extension useState set...)
  // change state asynchronously, so calling updateMostVoted right after set... will use previous value
  // rather than updated value
  useEffect(updateMostVoted, [votes]);

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{props.anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
      <button onClick={vote(selected)}>vote</button>
      <button onClick={randomizeAnecdote}>next anecdote</button>
      <h1>Anecdote with most votes</h1>
      <p>{props.anecdotes[mostVoted]}</p>
      <p>has {votes[mostVoted]} votes</p>
    </div>
  );
};

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
];

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById('root'));
