import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Alert, Jumbotron, Spinner } from "react-bootstrap";

import ProductCard from "./ProductCard";
import { useAuth } from "../../contexts/AuthContext";
import { NO_TOKEN_OPTIONS } from "../../utils/requestOptions";

export default function UserProducts() {
  const axios = require("axios");
  const history = useHistory();
  const { username } = useParams();

  // State
  const [posts, setPosts] = useState([
    {
      title: " this is title of post",
      slug: "thisisslugofpost",
      content: "this is content of post",
      modified: "23/2/21",
      author: "Vatsal",
    }
  ]);
  const [loading, setLoading] = useState(false);

  // context
  const isAuth = useAuth();

  let isAuthor = !isAuth
    ? false
    : username ===
      JSON.parse(localStorage.getItem("torch_user_data"))["username"];

  // Fetching user's posts
  // useEffect(() => {
  //   axios
  //     .get(`/api/${username}/p`, NO_TOKEN_OPTIONS)
  //     .then((response) => {
  //       setPosts(response.data);
  //       console.log(response.data);
  //       setLoading(false);
  //     })
  //     .catch((error) => {
  //       if (error.response.status === 404) alert("No such author exists");
  //       history.goBack();
  //       console.log(error);
  //     });
  // }, [posts]);

  if (loading) {
    return <Spinner animation="border" variant="primary" />;
  } else {
    if (posts.length === 0) {
      return (
        <Alert variant="danger" className="m-4 text-center">
          <Alert.Heading>Nothing blogs to show!</Alert.Heading>
          <p>Try clicking on Create New Post!</p>
        </Alert>
      );
    } else {
      return (
        <Jumbotron className="m-1">
          <h2 className="m-2">{username}'s blogs</h2>
          {posts.map((post) => (
            <ProductCard post={post} isAuthor={isAuthor} />
          ))}
        </Jumbotron>
      );
    }
  }
}
