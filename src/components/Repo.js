import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";

function Repo({
  owner: { html_url: ownerURL, avatar_url: ownerAvatar, login: ownerName },
  html_url,
  description,
  name,
  stargazers_count: stars,
  open_issues_count: issues
}) {
  return (
    <Row
      style={{
        border: "2px solid #ccc",
        marginBottom: "5px",
        maxHeight: "200px"
      }}
    >
      <Col style={{ flexBasis: "70%" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "100%"
          }}
        >
          <a href={html_url} target="_blank" rel="noopener noreferrer">
            <h2 style={{ fontSize: "1.5rem" }}>{name}</h2>
          </a>
          <p style={{ fontSize: "1rem" }}>{description}</p>
          <div style={{ display: "flex" }}>
            <div style={{ minWidth: "50px" }}>
              <span>{stars}</span>
              <span role="img" aria-label="stars">
                ⭐️
              </span>
            </div>
            <div style={{ minWidth: "50px" }}>
              <span>{issues}</span>
              <span role="img" aria-label="stars">
                💩
              </span>
            </div>
          </div>
        </div>
      </Col>
      <Col style={{ flexBasis: "30%" }}>
        <a
          href={ownerURL}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            borderLeft: "3px solid #e9e6ee",
            marginTop: "3px",
            marginBottom: "3px"
          }}
        >
          <h3 style={{ fontSize: "1rem", marginBottom: "1rem" }}>
            {ownerName}
          </h3>
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

export default Repo;
