import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import { FixedSizeList } from "react-window";
import ScaleLoader from "react-spinners/ScaleLoader";

class Repositories extends React.Component {
  state = {
    repos: []
  };
  componentDidMount() {
    if (!this.props.repos || this.props.repos.length === 0) {
      this.fetchRepositories();
    }
  }

  componentDidUpdate(prevProps) {
    if (JSON.stringify(this.props.repos) !== JSON.stringify(prevProps.repos)) {
      this.setState({ repos: this.props.repos });
    }
  }
  fetchRepositories = async () => {
    const resp = await fetch("https://api.github.com/repositories").then(res =>
      res.json()
    );
    this.setState({ repos: resp });
  };

  render() {
    switch (this.props.status) {
      case "RESOLVED":
        return (
          <Container>
            <h2>Repositories</h2>
            <FixedSizeList
              itemCount={this.state.repos.length}
              height={1000}
              itemSize={150}
              width="100%"
            >
              {({ index, style }) => {
                return (
                  <div style={style}>
                    <Repo {...this.state.repos[index]} />
                  </div>
                );
              }}
            </FixedSizeList>
          </Container>
        );
      case "PENDING":
        return (
          <Container
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <ScaleLoader color="#f64d46" height={60} />
          </Container>
        );
      case "ERROR":
        return (
          <Container
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <span
              role="img"
              aria-label="error happended"
              style={{ fontSize: "10rem" }}
            >
              ☹️
            </span>
          </Container>
        );
      default:
        break;
    }
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
