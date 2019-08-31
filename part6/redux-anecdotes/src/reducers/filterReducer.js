const initialState = '';

const filterReducer = (state = initialState, action) => {
    console.log("state", state);
    console.log("action", action);

    switch (action.type) {
        case "FILTER_SET":
            return action.data;
        default:
            return state;
    }
};

export const setFilter = (message) => ({
    type: "FILTER_SET",
    data: message
});

export default filterReducer;
