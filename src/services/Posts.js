import { notifyError, notifySuccess } from "../utils/Toasters";

export const getAllPosts = async (datadispatch) => {
  try {
    const response = await fetch("/api/posts");
    // console.log(response);
    if (response.status === 200) {
      datadispatch({
        type: "GET_LISTS_OF_POSTS",
        payload: JSON.parse(response._bodyInit).posts,
      });
    }
  } catch (e) {
    console.log(e);
  }
};

export const newPost = async (newPost, datadispatch) => {
  try {
    const response = await fetch("/api/posts", {
      method: "POST",
      headers: {
        authorization: localStorage.getItem("key"),
      },
      body: JSON.stringify({ postData: newPost }),
    });

    if (response.status === 201) {
      notifySuccess("Added new post");
    } else {
      notifyError("Some error occured. please try again");
    }
  } catch (e) {
    console.log(e);
  } finally {
    getAllPosts(datadispatch);
  }
};

export const likePost = async (postToBeLikedID, postsArray, datadispatch) => {
  try {
    const response = await fetch(`/api/posts/like/${postToBeLikedID}`, {
      method: "POST",
      headers: {
        authorization: localStorage.getItem("key"),
      },
      body: JSON.stringify({
        data: {
          posts: postsArray,
        },
      }),
    });

    if (response.status === 201) {
      notifySuccess("Liked a post");
    } else {
      notifyError("Some error occured. please try again");
    }
  } catch (e) {
    console.log(e);
  } finally {
    getAllPosts(datadispatch);
  }
};

export const unlikePost = async (
  postToBeUnLikedID,
  postsArray,
  datadispatch
) => {
  try {
    const response = await fetch(`/api/posts/dislike/${postToBeUnLikedID}`, {
      method: "POST",
      headers: {
        authorization: localStorage.getItem("key"),
      },
      body: JSON.stringify({
        data: {
          posts: postsArray,
        },
      }),
    });

    if (response.status === 201) {
      notifySuccess("Unliked a post");
    } else {
      notifyError("Some error occured. please try again");
    }
  } catch (e) {
    console.log(e);
  } finally {
    getAllPosts(datadispatch);
  }
};

export const editPost = async (postToBeEditedID, post, datadispatch) => {
  try {
    const response = await fetch(`/api/posts/edit/${postToBeEditedID}`, {
      method: "POST",
      headers: {
        authorization: localStorage.getItem("key"),
      },
      body: JSON.stringify({
        postData: post,
      }),
    });
    if (response.status === 201) {
      datadispatch({
        type: "GET_LISTS_OF_POSTS",
        payload: JSON.parse(response._bodyInit).posts,
      });
      notifySuccess("Post edited successfully");
    } else {
      notifyError("Something went wrong. Please try again");
    }
  } catch (e) {
    console.log(e);
  }
};

export const deletePost = async (postToBeDeletedID, datadispatch) => {
  try {
    const response = await fetch(`/api/posts/${postToBeDeletedID}`, {
      method: "DELETE",
      headers: {
        authorization: localStorage.getItem("key"),
      },
    });
    if (response.status === 201) {
      datadispatch({
        type: "GET_LISTS_OF_POSTS",
        payload: JSON.parse(response._bodyInit).posts,
      });
      notifySuccess("Post deleted successfully");
    } else {
      notifyError("Something went wrong. Please try again");
    }
  } catch (e) {
    console.log(e);
  }
};

export const getPost = async (postId, datadispatch) => {
  try {
    const response = await fetch(`/api/posts/${postId}`);

    if (response.status === 200) {
      datadispatch({
        type: "GET_POST_DETAIL",
        payload: JSON.parse(response._bodyInit).post,
      });
    }
  } catch (e) {
    console.log(e);
  }
};

export const bookmarkPost = async (postToBeBookmarkedID, datadispatch) => {
  try {
    const response = await fetch(
      `/api/users/bookmark/${postToBeBookmarkedID}`,
      {
        headers: { authorization: localStorage.getItem("key") },
        method: "POST",
      }
    );
    if (response.status === 200) {
      datadispatch({
        type: "GET_ALL_BOOKMARKED_POSTS",
        payload: JSON.parse(response._bodyInit).bookmarks,
      });
      notifySuccess("Post bookmarked successfully");
    } else {
      notifyError("Something went wrong. Please try again later");
    }
    console.log(response);
  } catch (e) {
    console.log(e);
  }
};

export const removeBookmarkPost = async (
  postToBeUnbookmarkedID,
  datadispatch
) => {
  try {
    const response = await fetch(
      `/api/users/remove-bookmark/${postToBeUnbookmarkedID}`,
      {
        headers: { authorization: localStorage.getItem("key") },
        method: "POST",
      }
    );
    if (response.status === 200) {
      datadispatch({
        type: "GET_ALL_BOOKMARKED_POSTS",
        payload: JSON.parse(response._bodyInit).bookmarks,
      });
      notifySuccess("Post has been removed from bookmarks");
    } else {
      notifyError("Something went wrong. Please try again later");
    }
  } catch (e) {
    console.log(e);
  }
};

export const getAllBookmarkedPosts = async (datadispatch) => {
  try {
    const response = await fetch("/api/users/bookmark/");

    console.log(response);
  } catch (e) {
    console.log(e);
  }
};

export const addCommentToPost = async (comments, postId, datadispatch) => {
  try {
    const response = await fetch(`/api/comments/add/${postId}`, {
      headers: { authorization: localStorage.getItem("key") },
      body: JSON.stringify({ commentData: { comments } }),
      method: "POST",
    });
    if (response.status === 201) {
      datadispatch({
        type: "GET_LISTS_OF_POSTS",
        payload: JSON.parse(response._bodyInit).posts,
      });
      datadispatch({
        type: "GET_POST_DETAIL",
        payload: JSON.parse(response._bodyInit).posts.find(
          ({ _id }) => _id === postId
        ),
      });
      notifySuccess("Comments added to the post");
    }
  } catch (e) {
    console.log(e);
  }
};

export const editComment = async (postId, datadispatch) => {
  try {
    const response = await fetch(`/api/comments/add/${postId}`, {
      headers: { authorization: localStorage.getItem("key") },
      method: "POST",
    });
    if (response.status === 201) {
      // console.log(response);
      // datadispatch({
      //   type: "GET_LISTS_OF_POSTS",
      //   payload: JSON.parse(response._bodyInit).posts,
      // });
    }
  } catch (e) {
    console.log(e);
  }
};

export const deleteCommentToPost = async (postId, commentId, datadispatch) => {
  try {
    const response = await fetch(`/api/comments/edit/${postId}/${commentId}`, {
      headers: { authorization: localStorage.getItem("key") },
      method: "POST",
    });
    console.log(response);
    if (response.status === 201) {
      // console.log(response);
      // datadispatch({
      //   type: "GET_LISTS_OF_POSTS",
      //   payload: JSON.parse(response._bodyInit).posts,
      // });
    }
  } catch (e) {
    console.log(e);
  }
};
