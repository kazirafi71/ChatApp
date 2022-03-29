import { SEARCH_USER } from "./ChatTypes";
import Axios from "axios";

export const getSearchUsers = (users) => {
  return {
    type: SEARCH_USER,
    payload: users,
  };
};

export const fetch_search_users = (search) => {
  return (dispatch) => {
    Axios.get(`/search-user?search=${search}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("user_token"),
      },
    })
      .then((result) => {
        if (result.data) {
          dispatch(getSearchUsers(result.data?.users));
        }
      })
      .catch((err) => {
        dispatch(getSearchUsers({ error: "Something went wrong" }));
        console.log(err.response.data);
      });
  };
};
