import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Styles from "./ChatComp.module.css";
import {
  Button,
  Paper,
  ListItem,
  List,
  ListItemText,
  Divider,
} from "@mui/material";
import SearchUser from "./SearchUser/SearchUser";

const ChatComps = () => {
  return (
    <div>
      <Container fluid>
        <Row>
          <Col md={4}>
            <Paper className="p-3">
              <div className={Styles.headingLeft__style}>
                <h4>My Chats</h4>
                <SearchUser btnText="Search" />
                <div className="">
                  <Button variant="contained" color="primary">
                    New Group
                  </Button>
                </div>
              </div>
              <List className="mt-4">
                <ListItem button className="mb-2">
                  <img
                    className={Styles.profileImg__style}
                    src="https://aui.atlassian.com/aui/8.8/docs/images/avatar-person.svg"
                    alt=""
                  />
                  <ListItemText primary="Kazi Rafi" />
                </ListItem>
                <Divider />
              </List>
            </Paper>
          </Col>
          <Col md={8}>
            <Paper className="p-4">
              <div className={Styles.headerRight__style}>
                <h4>Kazi Rafi</h4>
                <Divider />
                <div className={Styles.chatBody__style}>
                  <p>Hello</p>
                </div>

                <form action="">
                  <input type="text" name="" id="" />
                  <button>Send</button>
                </form>
              </div>
            </Paper>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ChatComps;
