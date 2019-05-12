import React from "react";
import Container from "react-bootstrap/Container";
import { FixedSizeList } from "react-window";
import ScaleLoader from "react-spinners/ScaleLoader";
import Repo from "./Repo";

function Repositories(props) {
  const { repos } = props;
  switch (props.status) {
    case "RESOLVED":
      return (
        <Container>
          <h2>Repositories</h2>
          <FixedSizeList
            itemCount={repos.length}
            height={600}
            itemSize={150}
            width="100%"
          >
            {({ index, style }) => {
              return (
                <div style={style}>
                  <Repo {...repos[index]} />
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

export default Repositories;
