import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import { FixedSizeList } from "react-window";
class Repositories extends React.Component {
  state = {
    repos: []
  };
  componentDidMount() {
    this.fetchRepositories();
  }
  fetchRepositories = async () => {
    const resp = await fetch("https://api.github.com/repositories").then(res =>
      res.json()
    );
    this.setState({ repos: resp });
  };
  Row = ({ index, style }) => (
    <div style={style}>
      <Repo {...this.state.repos[index]} />
    </div>
  );

  render() {
    return (
      <Container>
        <h1>Repositories</h1>
        {/* {repos.map(rep => (
          <Repo key={rep.id} {...rep} />
        ))} */}
        <FixedSizeList
          itemCount={this.state.repos.length}
          height={1000}
          itemSize={150}
          width="100%"
        >
          {this.Row}
        </FixedSizeList>
      </Container>
    );
  }
}

function Repo({
  owner: { html_url: ownerURL, avatar_url: ownerAvatar, login: ownerName },
  html_url,
  description,
  name
}) {
  return (
    <Row style={{ border: "2px solid #ccc", marginBottom: "5px" }}>
      <Col>
        <div>
          <a href={html_url} target="_blank" rel="noopener noreferrer">
            <h2 style={{ fontSize: "1.5rem" }}>{name}</h2>
          </a>
          <p style={{ fontSize: "1rem" }}>{description}</p>
        </div>
      </Col>
      <Col
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          alignContent: "center",
          borderLeft: "3px solid #e9e6ee",
          flex: ".5",
          marginTop: "3px",
          marginBottom: "3px"
        }}
      >
        <a href={ownerURL}>
          <h3 style={{ fontSize: "1rem" }}>{ownerName}</h3>
          <Col xs={6} md={4}>
            <Image
              src={ownerAvatar}
              roundedCircle
              style={{ maxWidth: "100px", maxHeight: "100px" }}
            />
          </Col>
        </a>
      </Col>
    </Row>
  );
}
export default Repositories;
