import { combineReducers, createStore } from "redux";

// Only understand parts of it.
// Logout working,
// Source: https://blog.tylerbuchea.com/super-simple-react-redux-application-example/
export const loginRedux = (loginState) => ({
  type: "LOGIN",
  loginState,
});

export const logoutRedux = () => ({
  type: "LOGOUT",
});

// reducers.js
export const loginState = (state = {}, action) => {
  console.log("redux update");
  switch (action.type) {
    case "LOGIN":
      return action.loginState;
    case "LOGOUT":
      return null;
    default:
      return state;
  }
};

// Maybe this can be unified
export const setAccessToken = (access_token) => ({
  type: "SET",
  access_token,
});

export const removeAccessToken = () => ({
  type: "REMOVE",
});

export const access_token = (state = {}, action) => {
  console.log("access_token update");
  switch (action.type) {
    case "SET":
      return action.access_token;
    case "REMOVE":
      return null;
    default:
      return null;
  }
};

export const reducers = combineReducers({
  loginState,
  access_token,
});

// store.js
export function configureStore(initialState = {}) {
  const store = createStore(reducers, initialState);
  return store;
}

export const store = configureStore();
