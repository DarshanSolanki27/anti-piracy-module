import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Alert, Button, Form, Jumbotron } from "react-bootstrap";

import { useAuth } from "../../contexts/AuthContext";
import { NO_TOKEN_OPTIONS } from "../../utils/requestOptions";

export default function Signup() {
  const axios = require("axios");
  const history = useHistory();

  // Context
  const isAuth = useAuth();

  // Redirect to home page if already logged in
  if (isAuth) {
    history.push("/");
  }

  // State
  const [request, setRequest] = useState({
    email: "",
    password: "",
    password2: "",
  });
  const [msg, setMsg] = useState({
    show: false,
    error: [],
  });

  // Handling email, password and password2 inputs
  function handleInputChange(event) {
    const { id, value } = event.currentTarget;

    setRequest({
      ...request,
      [id]: value,
    });
  }

  // Signup request to API
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Checking for password mismatch
    if (request.password !== request.password2) {
      setRequest({
        ...request,
        password: "",
        password2: "",
      });
      setMsg({
        show: true,
        error: ["Passwords must match"],
      });
    } else {
      delete request["password2"];

      await axios
        .post("/api/customer/signup", JSON.stringify(request), NO_TOKEN_OPTIONS)
        .then((response) => {
          setMsg({ status: false, error: [] });
          history.push("/login");
        })
        .catch((error) => {
          setRequest({
            ...request,
            password: "",
            password2: "",
          });

          console.log(error);
          if (error.response.status !== null && error.response.status === 400)
            setMsg({
              show: true,
              error:
                error.response.data["email"] !== undefined
                  ? ["email taken."]
                  : error.response.data["password"],
            });
        });
    }
  };

  return (
    <Jumbotron className="d-flex p-2 justify-content-center text-center">
      <Form onSubmit={handleSubmit}>
        <Form.Row
          className="p-4"
          style={{
            backgroundColor: "darkblue",
            borderRadius: "20px 50px",
            color: "white",
          }}
        >
          <h2>Signup</h2>
        </Form.Row>
        <Form.Group className="d-flex p-2">
          <Form.Label className="m-2">Email:</Form.Label>
          <Form.Control
            id="email"
            type="text"
            value={request.email}
            onChange={handleInputChange}
            required
          />
        </Form.Group>
        <Form.Text>Email cannot be changed later</Form.Text>
        <Form.Group className="d-flex p-2">
          <Form.Label className="m-2">Password:</Form.Label>
          <Form.Control
            id="password"
            type="password"
            value={request.password}
            onChange={handleInputChange}
            required
          />
        </Form.Group>
        <Form.Group className="d-flex p-2">
          <Form.Label className="m-2">Confirm Password:</Form.Label>
          <Form.Control
            id="password2"
            type="password"
            value={request.password2}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        {msg.show === true && (
          <Alert variant="danger">
            {msg.error.map((error) => (
              <div>{error}</div>
            ))}
          </Alert>
        )}

        <Button type="submit" className="m-2" variant="outline-success">
          Signup
        </Button>

        <Alert variant="warning" style={{ borderRadius: "20px 50px" }}>
          Already have an account?
          <Button href="/login" variant="link">
            Login
          </Button>
        </Alert>
        <Alert variant="warning" style={{ borderRadius: "20px 50px" }}>
          Are you a company?
          <Button href="/com_signup" variant="link">
            Click here
          </Button>
        </Alert>
      </Form>
    </Jumbotron>
  );
}
