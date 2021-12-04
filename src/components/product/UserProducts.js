import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Alert, Jumbotron, Spinner } from "react-bootstrap";

import ProductCard from "./ProductCard";
import { useAuth } from "../../contexts/AuthContext";
import { NO_TOKEN_OPTIONS } from "../../utils/requestOptions";

export default function UserProducts() {
  const axios = require("axios");
  const history = useHistory();

  // State
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  // context
  const isAuth = useAuth();

  // Fetching user's posts
  useEffect(() => {
    axios
      .get(
        `/api/company/${
          JSON.parse(localStorage.getItem("torch_user_data"))["id"]
        }/products`,
        NO_TOKEN_OPTIONS
      )
      .then((response) => {
        setPosts(response.data);
        console.log(response.data);
        setLoading(false);
      })
      .catch((error) => {
        if (error.response.status === 404) alert("No such author exists");
        history.goBack();
        console.log(error);
      });
  }, []);

  if (loading) {
    return <Spinner animation="border" variant="primary" />;
  } else {
    if (posts.length === 0) {
      return (
        <Alert variant="danger" className="m-4 text-center">
          <Alert.Heading>Nothing to show!</Alert.Heading>
        </Alert>
      );
    } else {
      return (
        <Jumbotron className="m-1">
          {posts.map((post) => (
            <ProductCard post={post} isOwner={true} />
          ))}
        </Jumbotron>
      );
    }
  }
}
