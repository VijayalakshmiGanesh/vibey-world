export const dataInitialValue = {
  posts: [],
  bookmarkPosts: [],
};

export const dataReducer = (result, action) => {
  switch (action.type) {
    case "GET_LISTS_OF_POSTS":
      return { ...result, posts: action.payload };

    case "GET_ALL_BOOKMARKED_POSTS":
      return { ...result, bookmarkPosts: action.payload };

    default:
      return result;
  }
};
