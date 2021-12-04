import React, { useEffect, useState } from "react";
import { Card, Image } from "react-bootstrap";

import { NO_TOKEN_OPTIONS } from "../../utils/requestOptions";

function PurchaseCard({ post }) {
  const axios = require("axios");
  const [company, setCompany] = useState({});
  const [product, setProduct] = useState({});

  useEffect(() => {
    const getData = async () => {
      await axios
        .get(`/api/company/products/${post.product}`, NO_TOKEN_OPTIONS)
        .then((res) => {
          setProduct(res.data);
          const productData = res.data;
          return axios.get(
            `/api/company/u/${productData.company}`,
            NO_TOKEN_OPTIONS
          );
        })
        .then((res) => {
          setCompany(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    getData();
  }, []);

  return (
    <Card className="m-2" style={{ border: "3px solid black" , width: "70rem" }}>
      <Card.Header>
        <h1>{product.name}</h1>
        <Image
          src={product.image}
          style={{ height: "5rem" }}
          alt="Img not found"
        />
        <div>By: {company.name}</div>
        <div>Purchase date: {post.date_of_purchase}</div>
      </Card.Header>

      <Card.Body>
        <div className="d-flex">
          Authentication Status :
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
