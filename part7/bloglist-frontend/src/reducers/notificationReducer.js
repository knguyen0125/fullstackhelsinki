const initialState = {
  message: null,
  type: 'success'
}

const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case "@NOTIFICATION/SET":
      return action.data;
    case "@NOTIFICATION/CLEAR":
      return null;
    default:
      return state;
  }
};

export const createNotification = (message, type='success', timeout = 5) => {
  return async dispatch => {
    dispatch({
      type: "@NOTIFICATION/SET",
      data: {
        message,
        type
      }
    });

    setTimeout(
      () =>
        dispatch(clearNotification()),
      timeout * 1000
    );
  };
};

export const clearNotification = () =>  ({
  type: "@NOTIFICATION/CLEAR"
})

export default notificationReducer;
