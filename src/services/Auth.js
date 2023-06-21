import { notifyError } from "../utils/Toasters";

export const login = async (
  username,
  password,
  userdispatch,
  setIsUserLoggedIn
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
      userdispatch({
        type: "SET_CURRENT_USER_DETAILS",
        payload: JSON.parse(response._bodyInit).foundUser,
      });
      setIsUserLoggedIn(true);
    } else {
      if (response.statusText === "Not Found") {
      }
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
  setIsUserLoggedIn
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
      userdispatch({
        type: "SET_CURRENT_USER_DETAILS",
        payload: JSON.parse(response._bodyInit).createdUser,
      });
      setIsUserLoggedIn(true);
    } else {
    }
  } catch (e) {
    console.log(e);
  }
};

export const getUserPosts = async (username, userdispatch) => {
  try {
    const response = await fetch(`/api/posts/user/${username}`);

    if (response.status === 200) {
      console.log(JSON.parse(response._bodyInit).posts);
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
      console.log(JSON.parse(response._bodyInit).users);
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
  console.log("inside user detail");
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
    }
    console.log(JSON.parse(response._bodyInit));
  } catch (e) {
    console.log(e);
  }
};
