import React, { useState } from "react";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Container from "react-bootstrap/Container";
function UserSearch({ onSearch: search, error, onReset }) {
  const [username, setUsername] = useState("");
  const onChange = e => {
    setUsername(e.target.value);
  };
  const onClear = () => {
    setUsername("");
    onReset();
  };
  const onSearch = () => {
    search(username);
  };
  return (
    <Container style={{ width: "100vw" }}>
      <InputGroup size="lg" className="mb-12">
        <FormControl
          type="text"
          placeholder="Username to search"
          value={username}
          onChange={onChange}
        />
      </InputGroup>
      <ButtonToolbar
        style={{
          width: "150px",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          marginTop: "10px"
        }}
      >
        <Button variant="primary" onClick={onSearch}>
          Search
        </Button>
        <Button variant="warning" onClick={onClear}>
          Clear
        </Button>
      </ButtonToolbar>
      <div style={{ marginTop: "5px" }}>
        {error && <Alert variant="danger">{error}</Alert>}
      </div>
    </Container>
  );
}

export default UserSearch;
