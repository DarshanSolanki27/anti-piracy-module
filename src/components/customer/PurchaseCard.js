import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";

import { NO_TOKEN_OPTIONS } from "../../utils/requestOptions";

function PurchaseCard({ post }) {
  const axios = require("axios");
  const [product, setProduct] = useState({});

  useEffect(() => {
    axios
      .get(`/api/company/products/${post.product}`, NO_TOKEN_OPTIONS)
      .then((res) => {
        setProduct(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <Card>
      <Card.Header>
        <h1>{product.name}</h1>
        <div>By: {product.company}</div>
        <div>Purchase date: {post.date_of_purchase}</div>
      </Card.Header>

      <Card.Body>
        <div>
          Authentication Status:
          {post.authenticated === true ? (
            <div style={{ color: "green" }}>Completed</div>
          ) : (
            <div style={{ color: "red" }}>Pending</div>
          )}
        </div>
      </Card.Body>
    </Card>
  );
}

export default PurchaseCard;
