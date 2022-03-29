import React, { useState } from "react";
import { Col, Container, Row, Form, Button } from "react-bootstrap";
import { Paper } from "@mui/material";
import Axios from "axios";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";

const RegisterComp = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const formDataHandler = (e) => {
    e.preventDefault();

    const userData = { userName, email, password };

    Axios.post("/register", userData)
      .then((result) => {
        console.log(result.data);
        if (result.data.token) {
          localStorage.setItem("user_token", result.data.token);
          swal("", "Registration successful", "success");
          navigate("/chat");
        }
      })
      .catch((err) => {
        swal("", err.response?.data?.error, "error");
        //console.log(err.response.data);
      });
  };

  return (
    <div>
      <Container>
        <Row>
          <Col className="mx-auto pt-5" md={6}>
            <Paper className="p-4">
              <h2 className="text-center py-3">Register Here</h2>
              <Form onSubmit={formDataHandler}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter email"
                    onChange={(e) => setUserName(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Confirm Password"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </Form.Group>

                <Button variant="primary" type="submit">
                  Register
                </Button>
              </Form>
            </Paper>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default RegisterComp;
