/* eslint-disable react-hooks/exhaustive-deps */
import { AiOutlineHeart, AiFillHeart, AiFillCloseCircle } from "react-icons/ai";
import { BiComment } from "react-icons/bi";
import {
  BsBookmarkFill,
  BsBookmark,
  BsImage,
  BsThreeDots,
} from "react-icons/bs";
import { MdOutlineEmojiEmotions } from "react-icons/md";
import EmojiPicker from "emoji-picker-react";

import {
  bookmarkPost,
  deletePost,
  editPost,
  likePost,
  removeBookmarkPost,
  unlikePost,
} from "../services/Posts";
import { useState, useEffect } from "react";
import { useData } from "../context/DataContext";
import { useAuth } from "../context/AuthContext";
import { followUser, unFollowUser } from "../services/Auth";
import { NavLink, useNavigate } from "react-router-dom";
import DisplayPic from "./DisplayPic";

function PostCard({ post }) {
  const {
    _id,
    username,
    content,
    likes,
    fullName,
    createdAt,
    imgURL,
    comments,
  } = post;
  const { posts, datadispatch, bookmarks } = useData();
  const { currentUserDetails, allUsers, userDispatch } = useAuth();
  const [displayPostOptions, setDisplayPostOptions] = useState(false);
  const [isEditingPost, setIsEditingPost] = useState();
  const [editPostContent, setEditPostContent] = useState("");
  const [isEmojiKeypadDisplayed, setIsEmomjiKeypadDisplayed] = useState(false);
  const [filesSelected, setFilesSelected] = useState("");
  const [userId, setUserId] = useState();

  const [dateDiff, setDateDiff] = useState();
  const [dp, setDp] = useState("");

  const navigate = useNavigate();
  const calculateTime = () => {
    const currentDate = new Date();
    const postTime = new Date(createdAt);

    const timeDiff = Math.abs(currentDate.getTime() - postTime.getTime());
    const minutesDiff = Math.floor(timeDiff / (1000 * 60));
    const hoursDiff = Math.floor(timeDiff / (1000 * 60 * 60));
    const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const weeksDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 7));
    const monthsDiff =
      currentDate.getMonth() -
      postTime.getMonth() +
      12 * (currentDate.getFullYear() - postTime.getFullYear());
    const yearsDiff = currentDate.getFullYear() - postTime.getFullYear();

    if (minutesDiff < 1) {
      return "a few seconds ago";
    } else if (minutesDiff < 60) {
      return `${minutesDiff} ${minutesDiff === 1 ? "min" : "mins"} ago`;
    } else if (hoursDiff < 24) {
      return `${hoursDiff} ${hoursDiff === 1 ? "hour" : "hours"} ago`;
    } else if (daysDiff < 7) {
      return `${Math.floor(hoursDiff / 24)} ${
        Math.floor(hoursDiff / 24) === 1 ? "day" : "days"
      } ago`;
    } else if (weeksDiff < 4) {
      return `${weeksDiff} ${weeksDiff === 1 ? "week" : "weeks"} ago`;
    } else if (monthsDiff < 12) {
      return `${monthsDiff === 0 ? 1 : monthsDiff} ${
        monthsDiff === 1 ? "month" : "months"
      } ago`;
    } else {
      return `${yearsDiff} ${yearsDiff === 1 ? "year" : "years"} ago`;
    }
  };
  useEffect(() => {
    const user = allUsers.find((user) => user.username === username);

    setDp(user?.imageURL);
    setDateDiff(calculateTime());
    setEditPostContent(imgURL);
    setUserId(user);
  }, [allUsers, post]);

  const handleFollow = () => {
    return (
      userId.followers.findIndex(
        ({ username }) => username === currentUserDetails.username
      ) === -1
    );
  };

  const checkLikedList = (likedList) => {
    return (
      likedList.findIndex(
        ({ username }) => currentUserDetails.username === username
      ) === -1
    );
  };

  const checkBookmarkList = (idToCheck) =>
    bookmarks.findIndex((_id) => _id === idToCheck) === -1;

  const uploadImg = async () => {
    const formData = new FormData();

    const CLOUDINARY_URL =
      "https://api.cloudinary.com/v1_1/dc1hrpwac/image/upload";
    const CLOUDINARY_UPLOAD_PRESET = "kdusi1ol";

    formData.append("file", filesSelected[0]);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
    formData.append("folder", "posts");

    return fetch(CLOUDINARY_URL, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        return data;
      })
      .catch((err) => console.error(err));
  };

  const editPostHandler = async () => {
    if (editPostContent.length >= 1 || filesSelected.length >= 1) {
      let response = "";
      if (filesSelected && imgURL !== filesSelected) {
        response = await uploadImg();
        editPost(
          _id,
          { ...post, content: editPostContent, imgURL: response?.url },
          datadispatch
        );
      } else {
        editPost(
          _id,
          { ...post, content: editPostContent, imgURL: filesSelected },
          datadispatch
        );
      }
      setFilesSelected("");
      setIsEditingPost("");
    }
  };
  return (
    <div
      className="hover:surface-clr border-b md:border border-gray-700 px-3 py-5 flex min-w-full w-full"
      key={_id}
    >
      <NavLink to={`/profile/${userId?.username}`}>
        <DisplayPic imageURL={dp} fullName={fullName} />
      </NavLink>
      <div className="px-2 mx-2 grow">
        <p className="flex justify-between">
          <span className="flex items-center">
            <span className="md:text-lg font-semibold">{fullName} &nbsp;</span>
            <span className="text-slate-400 text-sm hidden sm:inline">
              @{username} &nbsp;
            </span>
            <span className="flex items-center text-slate-400 text-sm">
              <span className="leading-3 self-start">.</span>
              <span>{dateDiff}</span>
            </span>
          </span>
          <div
            className="relative"
            onMouseOver={() => setDisplayPostOptions((prev) => !prev)}
            onMouseOut={() => setDisplayPostOptions(false)}
          >
            <button>
              <BsThreeDots />
            </button>
            {username === currentUserDetails.username && displayPostOptions ? (
              <div className="absolute top-5 right-0 w-[7rem] h-fit flex flex-col border border-2 z-30 bg-primary rounded">
                <button
                  className="p-2  border-b-2 hover:surface-clr"
                  onClick={
                    () => {
                      setIsEditingPost(_id);
                      setEditPostContent(content);
                      setFilesSelected(imgURL);
                    }
                    // editPost(_id, post, datadispatch)
                  }
                >
                  Edit
                </button>
                <button
                  className="p-2 hover:surface-clr"
                  onClick={() => deletePost(_id, datadispatch)}
                >
                  Delete
                </button>
              </div>
            ) : (
              displayPostOptions &&
              username !== currentUserDetails.username && (
                <div className="absolute top-5 right-0 w-[7rem] h-fit flex flex-col border border-2 z-30 bg-primary rounded z-50">
                  <button
                    className="p-2  border-b-2 hover:surface-clr"
                    onClick={() =>
                      handleFollow()
                        ? followUser(userId._id, userDispatch)
                        : unFollowUser(userId._id, userDispatch)
                    }
                  >
                    {handleFollow() ? "Follow" : "Unfollow"}
                  </button>
                </div>
              )
            )}
          </div>
        </p>

        {isEditingPost === _id ? (
          <p>
            <textarea
              value={editPostContent}
              onChange={(e) => setEditPostContent(e.target.value)}
              className=" my-2 py-2 input-text border border-gray-700 resize-none w-full bg-inherit focus-visible:border-0 focus:outline focus:outline-gray-700"
            ></textarea>
          </p>
        ) : (
          <p
            className="text-left pt-3 pb-2"
            onClick={() => navigate(`/post/${_id}`)}
          >
            {content}
          </p>
        )}

        <p className="py-1">
          {isEditingPost &&
          filesSelected &&
          filesSelected !== "" &&
          filesSelected?.length !== 0 ? (
            <span className="relative">
              <img
                src={
                  typeof filesSelected === "object"
                    ? URL.createObjectURL(filesSelected[0])
                    : filesSelected
                }
                // src={URL.createObjectURL(filesSelected[0])}
                alt="file selected"
                height="300"
                width="300"
              />

              <button
                className="absolute top-[-0.5rem] right-[-0.4rem] text-red-800 text-2xl z-50"
                onClick={() => {
                  setFilesSelected("");
                }}
              >
                {<AiFillCloseCircle />}
              </button>
            </span>
          ) : (
            !isEditingPost &&
            imgURL && (
              <img
                src={imgURL}
                alt="post"
                className=" w-full h-[22rem] object-cover border border-gray-700 rounded-md mb-3"
                onClick={() => navigate(`/post/${_id}`)}
              />
            )
          )}
        </p>

        <p className=" ">
          {isEditingPost === _id ? (
            <div className=" flex items-center justify-between">
              <div className="flex items-center">
                <label className="cursor-pointer text-lg">
                  <BsImage />
                  <input
                    type="file"
                    className="hidden"
                    onChange={(e) => setFilesSelected(e.target.files)}
                  />
                </label>
                <span className="relative">
                  <button
                    className={`relative self-end px-4 pt-[2px] text-xl hover:text-yellow-400 ${
                      isEmojiKeypadDisplayed && "text-yellow-400"
                    } z-50`}
                    onClick={() => setIsEmomjiKeypadDisplayed((prev) => !prev)}
                    // onBlur={() =>
                    //   isEmojiKeypadDisplayed && setIsEmomjiKeypadDisplayed(false)
                    // }
                  >
                    <MdOutlineEmojiEmotions />
                  </button>
                  {isEmojiKeypadDisplayed && (
                    <span className="absolute top-5  left-2 mx-auto">
                      <EmojiPicker
                        onEmojiClick={(e) =>
                          setEditPostContent((prev) => prev.concat(e.emoji))
                        }
                      />
                    </span>
                  )}
                </span>
              </div>
              <div className="flex">
                <button
                  className="btn-primary z-50"
                  onClick={() => setIsEditingPost("")}
                >
                  Cancel
                </button>
                <button
                  className="btn-primary z-50"
                  onClick={() => editPostHandler()}
                >
                  Save
                </button>
              </div>
            </div>
          ) : (
            <div className="flex ">
              <button
                className="rounded-full  hover:bg-red-300/[0.1] p-2 hover:text-red-700 flex items-center"
                onClick={() =>
                  checkLikedList(likes.likedBy)
                    ? likePost(_id, posts, datadispatch)
                    : unlikePost(_id, posts, datadispatch)
                }
              >
                {checkLikedList(likes.likedBy) ? (
                  <AiOutlineHeart className="text-xl" />
                ) : (
                  <AiFillHeart className="text-red-700 text-xl" />
                )}
                <span className="text-lg pl-2 ">{likes.likeCount}</span>
              </button>
              <button
                className="px-5 rounded-full  hover:bg-yellow-300/[0.1] p-2 hover:text-yellow-700 flex items-center text-lg "
                onClick={() => navigate(`/post/${_id}`)}
              >
                <BiComment />
                <span className="text-lg pl-2 ">{comments.length}</span>
              </button>
              <button
                className={`  px-5  ${
                  !checkBookmarkList(_id) ? "text-green-500" : "text-white"
                } hover:text-green-500 hover:bg-green-500/[0.1] rounded-full`}
                onClick={() => {
                  checkBookmarkList(_id)
                    ? bookmarkPost(_id, datadispatch)
                    : removeBookmarkPost(_id, datadispatch);
                }}
              >
                {checkBookmarkList(_id) ? <BsBookmark /> : <BsBookmarkFill />}
              </button>
            </div>
          )}
        </p>
      </div>
    </div>
  );
}
export default PostCard;
