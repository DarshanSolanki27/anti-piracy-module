import React, { useState } from "react";
import { Button, Form, Jumbotron } from "react-bootstrap";
import { useHistory } from "react-router-dom";

import { authOptions } from "../../utils/requestOptions";

export default function CreateProduct() {
  const axios = require("axios");
  const history = useHistory();

  // State
  const [request, setRequest] = useState({
    name: "",
    description: "",
    company: JSON.parse(localStorage.getItem("torch_user_data"))["id"],
    image: null,
    url: "",
  });

  // Handling form fields change
  const handleInputChange = (event) => {
    const { id, value } = event.currentTarget;

    setRequest({
      ...request,
      [id]: value,
    });
  };

  const handleImageInputChange = (event) => {
    setRequest({
      ...request,
      image: event.currentTarget.files[0],
    });
  };

  // Create post request to API
  const handleSubmit = async (event) => {
    event.preventDefault();

    await axios
      .post(
        `/api/company/${
          JSON.parse(localStorage.getItem("torch_user_data"))["id"]
        }/products`,
        JSON.stringify(request),
        authOptions(localStorage.getItem("torch_at"))
      )
      .then(() => {
        alert("Product added successful");
        history.push(
          `/${JSON.parse(localStorage.getItem("torch_user_data"))["username"]}`
        );
      })
      .catch((error) => console.log(error));
  };

  return (
    <Jumbotron className="d-flex p-2 text-center" style={{ width: "95%" }}>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="d-flex p-2">
          <Form.Label className="m-2">Name:</Form.Label>
          <Form.Control
            id="name"
            type="text"
            value={request.name}
            onChange={handleInputChange}
            required
          />
        </Form.Group>
        <Form.Group className="d-flex p-2">
          <Form.Label className="m-2">Description:</Form.Label>
          <Form.Control
            id="description"
            as="textarea"
            value={request.description}
            onChange={handleInputChange}
            required
          />
        </Form.Group>
        <Form.Group className="d-flex p-2">
          <Form.Label className="m-2">Image</Form.Label>
          <Form.Control
            id="image"
            type="file"
            onChange={handleImageInputChange}
            required
          />
        </Form.Group>
        <Form.Group className="d-flex p-2">
          <Form.Label className="m-2">URL</Form.Label>
          <Form.Control
            id="url"
            type="url"
            value={request.url}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Button type="submit" className="m-2" variant="outline-success">
          Add Product
        </Button>
      </Form>
    </Jumbotron>
  );
}
