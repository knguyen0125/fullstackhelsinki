import anecdoteService from "../services/anecdotes";
const reducer = (state = [], action) => {
  console.log("state now: ", state);
  console.log("action", action);

  switch (action.type) {
    case "ANECDOTE_VOTE":
      return state.map(anecdote =>
        anecdote.id !== action.data.id ? anecdote : action.data
      );
    case "ANECDOTE_CREATE":
      return state.concat(action.data);
    case "ANECDOTE_INIT":
      return action.data;
    default:
      return state;
  }
};
export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll();

    dispatch({
      type: "ANECDOTE_INIT",
      data: anecdotes
    });
  };
};

export const createAnecdote = anecdote => {
  return async dispatch => {
    console.log("anecdote", anecdote);
    const newAnecdote = await anecdoteService.createNew(anecdote);
    console.log("new anecdote", newAnecdote);

    dispatch({
      type: "ANECDOTE_CREATE",
      data: newAnecdote
    });
  };
};

export const voteAnecdote = id => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.like(id);
    dispatch({ type: "ANECDOTE_VOTE", data: newAnecdote });
  };
};

export default reducer;
