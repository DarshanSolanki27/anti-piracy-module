import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, Card, Image } from "react-bootstrap";
import { NO_TOKEN_OPTIONS } from "../../utils/requestOptions";

export default function PostCard({ post, isOwner }) {
  const axios = require("axios");
  const history = useHistory();

  const userData = JSON.parse(localStorage.getItem("torch_user_data"));
  const [company, setCompany] = useState({});

  const handleButtonClick = (url) => {
    history.push({
      pathname: url,
      state: { post },
    });
  };

  useEffect(() => {
    axios
      .get(`/api/company/u/${post.company}`, NO_TOKEN_OPTIONS)
      .then((res) => {
        setCompany(res.data);
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <Card className="m-2" style={{ border: "3px solid black", width: "70rem" }}>
      <Card.Header>
        <h1>{post.name}</h1>
        <Image
          src={post.image}
          style={{ height: "5rem" }}
          alt="Img not found "
        />
        {userData !== null && userData["customer"] === true && (
          <span>
            <Button id="buy" as="a" href={post.url}>
              Buy
            </Button>
          </span>
        )}
        {userData !== null &&
          userData["customer"] !== true &&
          isOwner === true && <div>Product ID: {post.id}</div>}
        <Card.Subtitle className="text-muted">
          <footer
            id="author"
            className="blockquote-footer d-flex justify-content-end"
          >
            <cite
              onClick={() => history.push(`/${post.company}/products`)}
              style={{ cursor: "pointer" }}
            >
              Company: {company.name}
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
