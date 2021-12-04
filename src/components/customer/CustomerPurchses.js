import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Alert, Jumbotron, Spinner } from "react-bootstrap";

import PurchaseCard from "./PurchaseCard";
import { NO_TOKEN_OPTIONS } from "../../utils/requestOptions";

export default function CustomerPurchases() {
  const axios = require("axios");
  const history = useHistory();

  // State
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetching user'
  useEffect(() => {
    axios
      .get(
        `/api/customer/${
          JSON.parse(localStorage.getItem("torch_user_data"))["id"]
        }/purchases`,
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
            <PurchaseCard post={post} />
          ))}
        </Jumbotron>
      );
    }
  }
}
