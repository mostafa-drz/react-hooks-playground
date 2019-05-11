import React, { useState, useEffect } from "react";
import "./App.css";
import Repositories from "./Repositories";
import UserSearch from "./UserSearch";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
function App() {
  const [repos, setRepos] = useState([]);
  const [defaultRepos, setDefaultRepos] = useState([]);
  const [fetchStatus, setFetchStatus] = useState("RESOLVED");
  const [fetchError, setFetchError] = useState("");
  const fetchRepos = async username => {
    try {
      setFetchStatus("PENDING");
      const resp = await fetch(
        `https://api.github.com/users/${username}/repos`
      ).then(r => {
        if (r.status === 404) {
          throw Error("User not found");
        } else {
          return r.json();
        }
      });
      setRepos(resp);
      setFetchStatus("RESOLVED");
    } catch (error) {
      setFetchStatus("ERROR");
      setFetchError(error.message);
    }
  };
  useEffect(() => {
    const fetchDefaults = async () => {
      const resp = await fetch("https://api.github.com/repositories").then(
        res => res.json()
      );
      setRepos(resp);
      setDefaultRepos(resp);
    };
    fetchDefaults();
  }, []);
  const reset = () => {
    setRepos(defaultRepos);
    setFetchStatus("RESOLVED");
    setFetchError("");
  };
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

export default App;
