const initialState = {
  token: null,
  // Add other state properties here
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_TOKEN':
      return {
        ...state,
        token: action.payload,
      };
    // Add other cases here
    default:
      return state;
  }
};

export default authReducer;
