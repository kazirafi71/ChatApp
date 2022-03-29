import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetch_search_users } from "../../../redux/Chat/ChatActions";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function SearchUser({ btnText }) {
  const dispatch = useDispatch();
  const [searchWords, setSearchWords] = React.useState("");
  const { search_users } = useSelector((state) => state.chat);
  const [loading, setLoading] = React.useState(false);

  console.log(search_users);

  const searchFormDataHandler = (e) => {
    e.preventDefault();
    setLoading(true);

    dispatch(fetch_search_users(searchWords));
    setLoading(false);
  };

  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      // onClick={toggleDrawer(anchor, false)}
      // onKeyDown={toggleDrawer(anchor, false)}
    >
      <h4 className="text-center py-2 bg-dark text-light py-4">Search users</h4>
      <Form className="p-4" onSubmit={searchFormDataHandler}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Control
            type="text"
            required
            placeholder="Search here"
            onChange={(e) => setSearchWords(e.target.value)}
          />
        </Form.Group>

        <Button variant="contained" type="submit">
          Search
        </Button>
      </Form>
      {loading ? (
        <Skeleton count={10} />
      ) : (
        <List>
          {search_users && search_users.length > 0 ? (
            search_users?.map((item, index) => {
              return (
                <ListItem
                  key={index}
                  button
                  className="mb-2"
                  style={{ backgroundColor: "black", color: "white" }}
                >
                  <ListItemText primary={item.userName} />
                </ListItem>
              );
            })
          ) : (
            <p className="text-center">No result found</p>
          )}
        </List>
      )}
    </Box>
  );

  return (
    <div>
      {["left"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button variant="outlined" onClick={toggleDrawer(anchor, true)}>
            {btnText}
          </Button>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
