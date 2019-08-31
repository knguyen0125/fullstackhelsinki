const initialState = {
  message: "",
  type: "success"
};

const notificationReducer = (state = initialState, action) => {
  console.log("state", state);
  console.log("action", action);

  switch (action.type) {
    case "NOTIFICATION_CREATE":
      return {
        message: action.data.message,
        type: action.data.type ? "success" : action.data.type
      };
    case "NOTIFICATION_CLEAR":
      return {
        message: "",
        type: "success"
      };
    default:
      return state;
  }
};

export const createNotification = (message, duration, type = "success") => {
  return async dispatch => {
    dispatch({
      type: "NOTIFICATION_CREATE",
      data: {
        message,
        type
      }
    });

    setTimeout(() => dispatch(clearNotification()), duration * 1000)
  };
};

export const clearNotification = () => ({
  type: "NOTIFICATION_CLEAR"
});

export default notificationReducer;
