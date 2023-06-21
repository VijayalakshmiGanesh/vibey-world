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
