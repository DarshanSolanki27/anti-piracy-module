import React from "react";
import { useHistory } from "react-router-dom";
import { Button, Card } from "react-bootstrap";

export default function PostCard({ post }) {
  const history = useHistory();

  const userData = JSON.parse(localStorage.getItem("torch_user_data"));

  const handleButtonClick = (url) => {
    history.push({
      pathname: url,
      state: { post },
    });
  };

  return (
    <Card
      className="m-3"
      style={{
        backgroundColor: "lightsteelblue",
        border: "3px solid darkblue",
      }}
    >
      <Card.Header>
        <h1>{post.name}</h1>
        <img src={post.image} width="200" height="125" alt="Not found!" />
        {userData !== null && userData["customer"] === true && (
          <span>
            <Button id="buy" as="a" href={post.url}>
              Buy
            </Button>
          </span>
        )}
        <Card.Subtitle className="text-muted">
          <footer
            id="author"
            className="blockquote-footer d-flex justify-content-end"
          >
            <cite
              onClick={() => history.push(`/${post.company}/products`)}
              style={{ cursor: "pointer" }}
            >
              Company: {post.company}
            </cite>
          </footer>
        </Card.Subtitle>
      </Card.Header>

      <Card.Body
        onClick={() => handleButtonClick(post.id)}
        style={{ width: "98%", cursor: "pointer" }}
      >
        <blockquote className="blockquote">
          {post.description.length > 50
            ? post.description.substr(0, 50) + "..."
            : post.description}
        </blockquote>
      </Card.Body>
    </Card>
  );
}
