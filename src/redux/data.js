export const dataInitialValue = {
  posts: [],
};

export const dataReducer = (result, action) => {
  switch (action.type) {
    case "GET_LISTS_OF_POSTS":
      return { ...result, posts: action.payload };

    default:
      return result;
  }
};
