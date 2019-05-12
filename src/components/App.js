import React, { useEffect, useReducer } from "react";
import "./App.css";
import Repositories from "./Repositories";
import UserSearch from "./UserSearch";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
function App() {
  const [state, dispatch] = useReducer(appReducer, {
    repos: [],
    defaultRepos: [],
    fetchStatus: "RESOLVED",
    fetchError: ""
  });
  const fetchRepos = async username => {
    try {
      dispatch({ type: "FETCH_STATUS", status: "PENDING" });
      const resp = await fetch(
        `https://api.github.com/users/${username}/repos`
      ).then(r => {
        if (r.status === 404) {
          throw Error("User not found");
        } else {
          return r.json();
        }
      });
      dispatch({ type: "SET_REPOS", repos: resp });
      dispatch({ type: "FETCH_STATUS", status: "RESOLVED" });
    } catch (error) {
      dispatch({ type: "FETCH_STATUS", status: "ERROR" });
      dispatch({ type: "FETCH_ERROR", error: error.message });
    }
  };
  useEffect(() => {
    const fetchDefaults = async () => {
      const resp = await fetch("https://api.github.com/repositories").then(
        res => res.json()
      );
      dispatch({ type: "SET_REPOS", repos: resp });
      dispatch({ type: "SET_DEFAULT_REPOS", repos: resp });
    };
    fetchDefaults();
  }, []);
  const reset = () => {
    dispatch({ type: "SET_REPOS", repos: state.defaultRepos });
    dispatch({ type: "FETCH_STATUS", status: "RESOLVED" });
    dispatch({ type: "FETCH_ERROR", error: "" });
  };
  const { fetchError, repos, fetchStatus } = state;
  return (
    <Container style={{ paddingTop: "3rem" }}>
      <Row style={{ marginBottom: "2rem" }}>
        <UserSearch onSearch={fetchRepos} error={fetchError} onReset={reset} />
      </Row>
      <Row>
        <Repositories repos={repos} status={fetchStatus} />
      </Row>
    </Container>
  );
}

const appReducer = (state, action) => {
  switch (action.type) {
    case "SET_REPOS":
      return { ...state, repos: action.repos };
    case "SET_DEFAULT_REPOS":
      return { ...state, defaultRepos: action.repos };
    case "FETCH_STATUS":
      return { ...state, fetchStatus: action.status };
    case "FETCH_ERROR":
      return { ...state, fetchError: action.error };
    default:
      return state;
  }
};
export default App;
