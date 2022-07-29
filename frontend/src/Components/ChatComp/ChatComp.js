import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Avatar, Paper } from "@mui/material";
import jwt_decode from "jwt-decode";
import Axios from "axios";
import { allUsersRoute } from "../../utils/apiRoutes";

const ChatComp = () => {
  const auth_token = localStorage.getItem("auth_token");
  var decoded = jwt_decode(auth_token);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    Axios.get(`${allUsersRoute}/${decoded._id}`)
      .then((result) => {
        setUsers(result.data);
      })
      .catch((err) => {
        console.log(err.response.data.error);
      });
  }, []);

  console.log(users);

  return (
    <div>
      <Container fluid>
        <Row>
          <Col xs md lg="2">
            <Paper>
              <Avatar />
            </Paper>
          </Col>
          <Col xs md lg="10"></Col>
        </Row>
      </Container>
    </div>
  );
};

export default ChatComp;
