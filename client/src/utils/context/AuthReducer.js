const AuthReducer = (state, action) => {
  switch (action.type) {
    case "SET_AUTH_TOKEN":
      return { ...state, authToken: action.payload };
    case "SET_CURRENT_USER":
      return { ...state, currentUser: action.payload };
    case "SET_FAMILY":
      return { ...state, family: action.payload };
    case "SET_TRANSACTIONS":
      return { ...state, transactions: action.payload };
    case "SENDING_REQUEST":
      return { ...state, loading: true };
    case "REQUEST_FINISHED":
      return { ...state, loading: false };
    default:
      return state;
  }
};
export default AuthReducer;
