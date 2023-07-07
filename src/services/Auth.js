import { notifyError, notifySuccess } from "../utils/Toasters";
import { getAllPosts } from "./Posts";

export const login = async (
  username,
  password,
  userdispatch,
  setIsUserLoggedIn,
  datadispatch
) => {
  setIsUserLoggedIn(false);
  try {
    const response = await fetch("api/auth/login", {
      method: "post",

      body: JSON.stringify({
        username,
        password,
      }),
    });
    if (response.status === 200) {
      localStorage.setItem("key", JSON.parse(response._bodyInit).encodedToken);
      localStorage.setItem(
        "user",
        JSON.stringify(JSON.parse(response._bodyInit).foundUser)
      );
      userdispatch({
        type: "SET_CURRENT_USER_DETAILS",
        payload: JSON.parse(response._bodyInit).foundUser,
      });
      setIsUserLoggedIn(true);
      getAllPosts(datadispatch);
    } else {
      notifyError("Username or Password is incorrect");
    }
  } catch (e) {
    console.log(e);
  }
};

export const signUp = async (
  username,
  password,
  firstName,
  lastName,
  userdispatch,
  setIsUserLoggedIn,
  datadispatch
) => {
  setIsUserLoggedIn(false);
  try {
    const response = await fetch("api/auth/signup", {
      method: "post",
      body: JSON.stringify({
        username,
        password,
        lastName,
        firstName,
      }),
    });

    if (response.status === 201) {
      localStorage.setItem("key", JSON.parse(response._bodyInit).encodedToken);
      localStorage.setItem(
        "user",
        JSON.stringify(JSON.parse(response._bodyInit).createdUser)
      );
      userdispatch({
        type: "SET_CURRENT_USER_DETAILS",
        payload: JSON.parse(response._bodyInit).createdUser,
      });
      setIsUserLoggedIn(true);
      getAllPosts(datadispatch);
    } else {
      notifyError("Something went wrong. Please try again later");
    }
  } catch (e) {
    console.log(e);
  }
};

export const logout = (userdispatch, setIsUserLoggedIn) => {
  setIsUserLoggedIn(false);
  localStorage.removeItem("key");
  userdispatch({
    type: "SET_CURRENT_USER_DETAILS",
    payload: {},
  });
  notifySuccess("Logged out successfully");
};

export const getUserPosts = async (username, userdispatch) => {
  try {
    const response = await fetch(`/api/posts/user/${username}`);

    if (response.status === 200) {
      userdispatch({
        type: "SET_USER_POSTS",
        payload: JSON.parse(response._bodyInit).posts,
      });
    } else {
      notifyError("Something went wrong. Please try again");
    }
  } catch (e) {
    console.log(e);
  }
};

export const getAllUsers = async (userdispatch) => {
  try {
    const response = await fetch("/api/users");

    if (response.status === 200) {
      userdispatch({
        type: "SET_ALL_USERS",
        payload: JSON.parse(response._bodyInit).users,
      });
    } else {
      console.log(response);
    }
  } catch (e) {
    console.log(e);
  }
};

export const getUserDetails = async (username, userdispatch) => {
  try {
    const response = await fetch(`/api/users/${username}`);
    if (response.status === 200) {
      userdispatch({
        type: "SET_USER_DETAILS",
        payload: JSON.parse(response._bodyInit).user,
      });
    } else {
      console.log(response);
    }
  } catch (e) {
    console.log(e);
  }
};

export const editUserDetails = async (detailsToBeEdited, userdispatch) => {
  try {
    const response = await fetch("/api/users/edit", {
      method: "POST",
      headers: {
        authorization: localStorage.getItem("key"),
      },
      body: JSON.stringify({ userData: detailsToBeEdited }),
    });

    if (response.status === 201) {
      userdispatch({
        type: "SET_CURRENT_USER_DETAILS",
        payload: JSON.parse(response._bodyInit).user,
      });
      getAllUsers(userdispatch);
      notifySuccess("User details saved !");
    } else {
      notifyError("Something went wrong. Please try again later");
    }
  } catch (e) {
    console.log(e);
  }
};

export const followUser = async (userIdToBeFollowed, userdispatch) => {
  try {
    const response = await fetch(`/api/users/follow/${userIdToBeFollowed}`, {
      headers: { authorization: localStorage.getItem("key") },
      method: "POST",
    });

    if (response.status === 200) {
      userdispatch({
        type: "SET_CURRENT_USER_DETAILS",
        payload: JSON.parse(response._bodyInit).user,
      });
      getAllUsers(userdispatch);
      notifySuccess("Started following user successfully");
    } else {
      notifyError("Something went wrong. Please try again later");
    }
  } catch (e) {
    console.log(e);
  }
};

export const unFollowUser = async (userIdToBeUnfollowed, userdispatch) => {
  try {
    const response = await fetch(
      `/api/users/unfollow/${userIdToBeUnfollowed}`,
      {
        headers: { authorization: localStorage.getItem("key") },
        method: "POST",
      }
    );
    if (response.status === 200) {
      userdispatch({
        type: "SET_CURRENT_USER_DETAILS",
        payload: JSON.parse(response._bodyInit).user,
      });
      getAllUsers(userdispatch);
      notifySuccess("Unfollowed user successfully");
    } else {
      notifyError("Something went wrong. Please try again later");
    }
  } catch (e) {
    console.log(e);
  }
};
