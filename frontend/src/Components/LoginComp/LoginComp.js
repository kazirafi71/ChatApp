import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Col, Container, Row } from "react-bootstrap";
import { Paper } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";
import { loginRoute } from "../../utils/apiRoutes";
import toast, { Toaster } from "react-hot-toast";

const LoginComp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await Axios.post(loginRoute, {
        email,
        password,
      });

      localStorage.setItem("auth_token", result?.data?.token);
      toast.success(result.data.success);
      navigation("/chat");
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  useEffect(() => {
    const auth_token = localStorage.getItem("auth_token");
    if (auth_token) {
      navigation("/chat");
    }
  }, []);
  return (
    <div>
      <Toaster />
      <Container className="pt-5">
        <Row>
          <Col md={8} sm={12} lg={6} className="mx-auto">
            <Paper className="p-4">
              <h4 className="text-center py-2">Login Here</h4>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email* </Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Email"
                    name="email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password*</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    name="password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>
                <small>
                  Don't have an account? <Link to="/register">Register </Link>{" "}
                </small>{" "}
                <br />
                <Button className="mt-2" variant="primary" type="submit">
                  Login
                </Button>
              </Form>
            </Paper>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default LoginComp;
