import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { BsThreeDots } from "react-icons/bs";
import { BiBookmark } from "react-icons/bi";
import Avatar from "react-avatar";

import {
  bookmarkPost,
  deletePost,
  editPost,
  likePost,
  removeBookmarkPost,
  unlikePost,
} from "../services/Posts";
import { useState } from "react";
import { useData } from "../context/DataContext";
import { useAuth } from "../context/AuthContext";
function PostCard({ post }) {
  const { _id, username, content, likes, fullName } = post;

  const { posts, datadispatch, bookmarks } = useData();
  const { currentUserDetails } = useAuth();
  const [displayPostOptions, setDisplayPostOptions] = useState(false);
  const [isEditingPost, setIsEditingPost] = useState();
  const [editPostContent, setEditPostContent] = useState("");

  console.log("bookmarks", bookmarks);
  const checkLikedList = (likedList) => {
    return (
      likedList.findIndex(
        ({ username }) => currentUserDetails.username === username
      ) === -1
    );
  };

  const checkBookmarkList = (idToCheck) =>
    bookmarks.findIndex((_id) => _id === idToCheck) === -1;
  return (
    <div
      className="m-3 border border-2 px-3 py-5 w-[35rem] bg-[#2d2f3e] flex"
      key={_id}
    >
      <Avatar
        color={Avatar.getRandomColor("sitebase", [
          // "rgb(251 146 60)",
          "black",

          "blue",
          "pink",
        ])}
        name={fullName}
        size="50"
        round={true}
      />
      <div className="px-2 mx-2 grow">
        <p className="flex justify-between">
          <span>
            {fullName} &nbsp;
            <span className="text-pink-400">@{username}</span>
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
            {username === currentUserDetails.username && displayPostOptions && (
              <div className="absolute top-5 right-0 w-[7rem] h-fit flex flex-col border border-2 z-30 bg-primary rounded">
                <button
                  className="p-2  border-b-2 "
                  onClick={
                    () => {
                      setIsEditingPost(_id);
                      setEditPostContent(content);
                      console.log("content", content);
                      console.log("edit post content", editPostContent);
                    }
                    // editPost(_id, post, datadispatch)
                  }
                >
                  Edit
                </button>
                <button
                  className="p-2"
                  onClick={() => deletePost(_id, datadispatch)}
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        </p>
        {isEditingPost === _id ? (
          <textarea
            value={editPostContent}
            onChange={(e) => setEditPostContent(e.target.value)}
            className=" my-2 py-2 input-text border-0 resize-none w-full bg-inherit focus-visible:border-0 focus:outline-0"
          ></textarea>
        ) : (
          <p className="text-left">{content}</p>
        )}
        <p className="my-2 flex justify-between">
          <button
            className="rounded-full  hover:bg-red-300/[0.1] p-2 hover:text-red-700 flex items-center "
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
            onClick={() => {
              checkBookmarkList(_id)
                ? bookmarkPost(_id, datadispatch)
                : removeBookmarkPost(_id, datadispatch);
            }}
          >
            <BiBookmark
              className={!checkBookmarkList(_id) && "text-green-500"}
            />
          </button>
          {isEditingPost === _id && (
            <div className=" flex flex-row">
              <button
                className="btn-primary"
                onClick={() => {
                  editPost(
                    _id,
                    { ...post, content: editPostContent },
                    datadispatch
                  );
                  setIsEditingPost("");
                }}
              >
                Save
              </button>
              <button
                className="btn-primary"
                onClick={() => setIsEditingPost("")}
              >
                Cancel
              </button>
            </div>
          )}
        </p>
      </div>
    </div>
  );
}
export default PostCard;
