export const initialState = {
  userDetails: {},
  userPosts: [],
  allUsers: [],
  currentUserDetails: {},
};

export const userReducer = (result, action) => {
  switch (action.type) {
    case "SET_CURRENT_USER_DETAILS":
      return { ...result, currentUserDetails: action.payload };

    case "SET_USER_POSTS":
      return { ...result, userPosts: action.payload };

    case "SET_ALL_USERS":
      return { ...result, allUsers: action.payload };

    case "SET_USER_DETAILS":
      return { ...result, userDetails: action.payload };

    default:
      return result;
  }
};
