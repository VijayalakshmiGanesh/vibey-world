/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigate, useParams } from "react-router";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { AiOutlineHeart, AiFillHeart, AiFillCloseCircle } from "react-icons/ai";
import { BiComment } from "react-icons/bi";
import {
  BsBookmarkFill,
  BsBookmark,
  BsImage,
  BsThreeDots,
} from "react-icons/bs";
import { MdOutlineEmojiEmotions } from "react-icons/md";
import Avatar from "react-avatar";
import EmojiPicker from "emoji-picker-react";

// import Aside from "../component/Aside";
// import NavBar from "../component/NavBar";
import { useData } from "../context/DataContext";
import { useEffect } from "react";
import {
  addCommentToPost,
  bookmarkPost,
  editPost,
  getPost,
  likePost,
  removeBookmarkPost,
  unlikePost,
} from "../services/Posts";
import { NavLink } from "react-router-dom";
import { followUser, unFollowUser } from "../services/Auth";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import CommentCard from "../component/CommentCard";
import Loader from "../component/Loaders";

function PostDetail() {
  const navigate = useNavigate();
  const { datadispatch, postDetail, posts, bookmarks } = useData();
  const { postId } = useParams();
  const { currentUserDetails, allUsers, userDispatch } = useAuth();
  const [displayPostOptions, setDisplayPostOptions] = useState(false);
  const [isEditingPost, setIsEditingPost] = useState();
  const [editPostContent, setEditPostContent] = useState("");
  const [isEmojiKeypadDisplayed, setIsEmomjiKeypadDisplayed] = useState(false);
  const [filesSelected, setFilesSelected] = useState("");
  const [userId, setUserId] = useState();
  const [comment, setComment] = useState("");
  //   const [editComment, setEditComment] = useState("");
  const [dateDiff, setDateDiff] = useState();
  const [dp, setDp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const calculateTime = () => {
    const currentDate = new Date();
    const postTime = new Date(postDetail?.createdAt);

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

  console.log("1", postDetail);
  // console.log("2", currentUserDetails, allUsers);
  useEffect(() => {
    const user = allUsers.find(
      (user) => user.username === postDetail?.username
    );

    setDp(user?.imageURL);
    setDateDiff(calculateTime());
    setEditPostContent(postDetail?.imgURL);
    setUserId(user);
  }, [postDetail]);

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
      if (filesSelected && postDetail?.imgURL !== filesSelected) {
        response = await uploadImg();
        console.log("Inside edit img");
        editPost(
          postDetail?._id,
          { ...postDetail, content: editPostContent, imgURL: response?.url },
          datadispatch
        );
      } else {
        editPost(
          postDetail?._id,
          { ...postDetail, content: editPostContent, imgURL: filesSelected },
          datadispatch
        );
      }
      setFilesSelected("");
      setIsEditingPost("");
    }
  };

  useEffect(() => {
    getPost(postId, datadispatch);
  }, [posts, postId]);
  useEffect(() => {
    setIsLoading(true);
    getPost(postId, datadispatch);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="w-full lg:w-[40rem]">
      <div className="flex justify-start p-3 my-1">
        <button
          onClick={() => navigate(-1)}
          className="p-1 text-2xl hover:border hover:border-2 hover:border-gray-700 hover:bg-[#2d2f3ea8] rounded-lg"
        >
          <AiOutlineArrowLeft />
        </button>
        <p className="flex flex-col items-start px-5 text-xl">Post</p>
      </div>
      {isLoading ? (
        <span className="flex items-center justify-center h-screen text-2xl">
          <Loader />
        </span>
      ) : (
        <>
          <div
            className="border border-slate-400 px-3 py-5 flex w-full mx-2"
            key={postDetail?._id}
          >
            <NavLink to={`/profile/${postDetail?.username}`}>
              {!dp || dp?.length === 0 ? (
                <Avatar
                  color={Avatar.getRandomColor("sitebase", [
                    // "rgb(251 146 60)",
                    "black",

                    "blue",
                    "pink",
                  ])}
                  name={postDetail?.fullName}
                  size="50"
                  round={true}
                />
              ) : (
                <img
                  src={dp}
                  alt="dp"
                  className="w-[60px] min-w-[60px] h-[50px] px-1 rounded-full object-cover"
                />
              )}
            </NavLink>
            <div className="px-2 mx-2 grow">
              <p className="flex justify-between">
                <span className="flex items-center">
                  <span className="text-lg font-semibold">
                    {postDetail?.fullName} &nbsp;
                  </span>
                  <span className="text-slate-400 text-sm">
                    @{postDetail?.username} &nbsp;
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
                  <button
                  // onMouseOver={() =>
                  //   setDisplayPostOptions((prev) => !prev)
                  // }
                  // onMouseOut={() => setDisplayPostOptions(false)}
                  >
                    <BsThreeDots />
                  </button>
                  {postDetail?.username === currentUserDetails?.username &&
                  displayPostOptions ? (
                    <div className="absolute top-5 right-0 w-[7rem] h-fit flex flex-col border border-2 z-30 bg-primary rounded">
                      <button
                        className="p-2  border-b-2 hover:surface-clr"
                        onClick={
                          () => {
                            setIsEditingPost(postDetail?._id);
                            setEditPostContent(postDetail?.content);
                            setFilesSelected(postDetail?.imgURL);
                          }
                          // editPost(_id, post, datadispatch)
                        }
                      >
                        Edit
                      </button>
                      <button
                        className="p-2 hover:surface-clr"
                        onClick={() => delete (postDetail?._id, datadispatch)}
                      >
                        Delete
                      </button>
                    </div>
                  ) : (
                    displayPostOptions &&
                    postDetail?.username !== currentUserDetails?.username && (
                      <div className="absolute top-5 right-0 w-[7rem] h-fit flex flex-col border border-2 z-30 bg-primary rounded">
                        <button
                          className="p-2  border-b-2 hover:surface-clr"
                          onClick={() =>
                            handleFollow()
                              ? followUser(userId?._id, userDispatch)
                              : unFollowUser(userId?._id, userDispatch)
                          }
                        >
                          {handleFollow() ? "Follow" : "Unfollow"}
                        </button>
                      </div>
                    )
                  )}
                </div>
              </p>

              {isEditingPost === postDetail?._id ? (
                <p>
                  <textarea
                    value={editPostContent}
                    onChange={(e) => setEditPostContent(e.target.value)}
                    className=" my-2 py-2 input-text border border-gray-700 resize-none w-full bg-inherit focus-visible:border-0 focus:outline focus:outline-gray-700"
                  ></textarea>
                </p>
              ) : (
                <p className="text-left pt-3 pb-2">{postDetail?.content}</p>
              )}

              <p className="py-1">
                {isEditingPost &&
                filesSelected !== "" &&
                filesSelected?.length !== 0 ? (
                  <span className="relative">
                    <img
                      src={
                        typeof filesSelected === "object"
                          ? URL.createObjectURL(filesSelected[0])
                          : filesSelected
                      }
                      alt="file selected"
                      height="300"
                      width="300"
                    />

                    <button
                      className="absolute top-[-0.5rem] right-[-0.4rem] text-red-800 text-2xl"
                      onClick={() => {
                        setFilesSelected("");
                      }}
                    >
                      {<AiFillCloseCircle />}
                    </button>
                  </span>
                ) : (
                  !isEditingPost &&
                  postDetail?.imgURL && (
                    <img
                      src={postDetail?.imgURL}
                      alt="post"
                      className=" w-full h-[25rem] object-cover border border-gray-700 rounded-md mb-3"
                    />
                  )
                )}
              </p>

              <p className=" ">
                {isEditingPost === postDetail?._id ? (
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
                          }`}
                          onClick={() =>
                            setIsEmomjiKeypadDisplayed((prev) => !prev)
                          }
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
                                setEditPostContent((prev) =>
                                  prev.concat(e.emoji)
                                )
                              }
                            />
                          </span>
                        )}
                      </span>
                    </div>
                    <div className="flex">
                      <button
                        className="btn-primary"
                        onClick={() => setIsEditingPost("")}
                      >
                        Cancel
                      </button>
                      <button
                        className="btn-primary"
                        onClick={() => editPostHandler()}
                      >
                        Save
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex ">
                    <button
                      className="rounded-full  hover:bg-red-300/[0.1] p-2 hover:text-red-700 flex items-center "
                      onClick={() =>
                        checkLikedList(postDetail?.likes?.likedBy)
                          ? likePost(postDetail?._id, posts, datadispatch)
                          : unlikePost(postDetail?._id, posts, datadispatch)
                      }
                    >
                      {checkLikedList(postDetail?.likes?.likedBy) ? (
                        <AiOutlineHeart className="text-xl" />
                      ) : (
                        <AiFillHeart className="text-red-700 text-xl" />
                      )}
                      <span className="text-lg pl-2 ">
                        {postDetail?.likes?.likeCount}
                      </span>
                    </button>
                    <button className="px-5 rounded-full  hover:bg-yellow-300/[0.1] p-2 hover:text-yellow-700 flex items-center text-lg ">
                      <BiComment />
                      <span className="text-lg pl-2 ">
                        {postDetail?.comments?.length}
                      </span>
                    </button>
                    <button
                      className={`  px-5 ${
                        !checkBookmarkList(postDetail?._id)
                          ? "text-green-500"
                          : "text-white"
                      } hover:text-green-500 hover:bg-green-500/[0.1] rounded-full`}
                      onClick={() => {
                        checkBookmarkList(postDetail?._id)
                          ? bookmarkPost(postDetail?._id, datadispatch)
                          : removeBookmarkPost(postDetail?._id, datadispatch);
                      }}
                    >
                      {checkBookmarkList(postDetail?._id) ? (
                        <BsBookmark />
                      ) : (
                        <BsBookmarkFill />
                      )}
                    </button>
                  </div>
                )}
              </p>
            </div>
          </div>

          <div>
            <p className="flex items-center  border-y ml-2 border-slate-400 p-5">
              <NavLink to={`/profile/${postDetail?.username}`}>
                {!currentUserDetails?.imageURL ||
                currentUserDetails?.imageURL?.length === 0 ? (
                  <Avatar
                    color={Avatar.getRandomColor("sitebase", [
                      // "rgb(251 146 60)",
                      "black",

                      "blue",
                      "pink",
                    ])}
                    name={`${currentUserDetails?.firstName} ${currentUserDetails?.lastName}`}
                    size="50"
                    round={true}
                  />
                ) : (
                  <img
                    src={currentUserDetails?.imageURL}
                    alt="dp"
                    className="w-[60px] min-w-[60px] h-[50px] px-1 rounded-full object-cover"
                  />
                )}
              </NavLink>
              <input
                type="text"
                className="input-text  w-full ml-3"
                placeholder="Post your comment"
                onChange={(e) => setComment(e.target.value)}
                value={comment}
              />
              <button
                className="btn-primary w-[5rem]"
                onClick={() => {
                  comment &&
                    addCommentToPost(comment, postDetail?._id, datadispatch);
                  setComment("");
                }}
              >
                Post
              </button>
            </p>
            {/* <div className="border-x border-slate-700 w-full"> */}
            <div>
              {!postDetail?.comments && postDetail?.comments?.length === 0 ? (
                <p className="bg-yellow-500/[0.3] w-full text-xl p-3 my-3 rounded">
                  Be the first one to comment
                </p>
              ) : (
                (postDetail?.comments || [])
                  .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                  .map((comment) => <CommentCard comment={comment} />)
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default PostDetail;
