import React, { useReducer } from "react";
import { AuthContext } from "./AuthContext";
import AuthReducer from "./AuthReducer";

const AuthProvider = (props) => {
  const initialState = {
    authToken: null,
    family: null,
    transactions: null,
    currentUser: null,
    loading: true,
  };
  const [state, dispatch] = useReducer(AuthReducer, initialState);
  const setCurrentUser = (user, token) => {
    try {
      dispatch({ type: "SENDING_REQUEST" });
      dispatch({ type: "SET_AUTH_TOKEN", payload: token });
      dispatch({ type: "SET_CURRENT_USER", payload: user });
      dispatch({ type: "REQUEST_FINISHED" });
      console.log(state.authToken, state.currentUser);
    } catch (e) {
      console.log(e.message);
    }
  };
  const logout = () => {
    setCurrentUser(null, null);
  };
  const setCurrentFamily = async (family) => {
    dispatch({ type: "SENDING_REQUEST" });
    dispatch({ type: "SET_FAMILY", payload: family });
    dispatch({ type: "REQUEST_FINISHED" });
  };
  const setTransactions = async (transactions) => {
    dispatch({ type: "SENDING_REQUEST" });
    dispatch({ type: "SET_TRANSACTIONS", payload: transactions });
    dispatch({ type: "REQUEST_FINISHED" });
  };

  return (
    <AuthContext.Provider
      value={{
        loading: state.loading,
        currentUser: state.currentUser,
        authToken: state.authToken,
        family: state.family,
        transactions: state.transactions,
        setCurrentUser,
        setCurrentFamily,
        setTransactions,
        logout,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
