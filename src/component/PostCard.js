import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { BsThreeDots } from "react-icons/bs";
import { BiBookmark } from "react-icons/bi";
import { MdOutlineEmojiEmotions } from "react-icons/md";
import Avatar from "react-avatar";
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
function PostCard({ post }) {
  const { _id, username, content, likes, fullName, imgURL, createdAt } = post;
  const { posts, datadispatch, bookmarks } = useData();
  const { currentUserDetails, allUsers } = useAuth();
  const [displayPostOptions, setDisplayPostOptions] = useState(false);
  const [isEditingPost, setIsEditingPost] = useState();
  const [editPostContent, setEditPostContent] = useState("");
  const [isEmojiKeypadDisplayed, setIsEmomjiKeypadDisplayed] = useState(false);
  const [dateDiff, setDateDiff] = useState();
  const [dp, setDp] = useState("");

  const calculateMonthsBetweenDates = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const months = (end.getFullYear() - start.getFullYear()) * 12;
    const startMonth = start.getMonth();
    const endMonth = end.getMonth();

    const monthDiff = months + endMonth - startMonth;

    return monthDiff;
  };
  function calculateWeeksBetweenDates(startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const millisecondsPerWeek = 1000 * 60 * 60 * 24 * 7;

    const timeDiff = Math.abs(end.getTime() - start.getTime());
    const weeks = Math.floor(timeDiff / millisecondsPerWeek);

    return weeks;
  }
  function calculateMinutesBetweenTimes(startTime, endTime) {
    const start = new Date(startTime);
    const end = new Date(endTime);

    const timeDiff = Math.abs(end.getTime() - start.getTime());
    const minutes = Math.floor(timeDiff / (1000 * 60));

    return minutes;
  }

  const calculateTime = () => {
    const currentDate = new Date();
    const postTime = new Date(createdAt);

    if (
      currentDate.getFullYear() === postTime.getFullYear() &&
      currentDate.getMonth() === postTime.getMonth() &&
      (currentDate.getDate() === postTime.getDate() ||
        currentDate.getDate() - postTime.getDate()) <= 1
    ) {
      if (
        currentDate.getHours() === postTime.getHours() ||
        calculateMinutesBetweenTimes(postTime, currentDate) <= 59
      ) {
        if (calculateMinutesBetweenTimes(postTime, currentDate) <= 1) {
          console.log("CURR DATE ", currentDate);
          console.log("CREATED AT ", postTime);
          console.log(
            "Inside sec- getHours",
            currentDate.getHours() - postTime.getHours()
          );
          console.log(
            "Inside mins- compare",
            currentDate.getMinutes() === postTime.getMinutes()
          );
          return "A few seconds ago";
        } else {
          return `${currentDate.getMinutes() - postTime.getMinutes()} mins ago`;
        }
      } else {
        return `${Math.floor(
          calculateMinutesBetweenTimes(postTime, currentDate) / 60
        )} hours ago`;
      }
    } else {
      if (
        currentDate.getFullYear() === postTime.getFullYear() &&
        (currentDate.getMonth() === postTime.getMonth() ||
          calculateMonthsBetweenDates(postTime, currentDate)) < 1
      ) {
        if (currentDate.getDate() - postTime.getDate() <= 7) {
          return `${currentDate.getDate() - postTime.getDate()} days ago`;
        } else {
          // var dif = Math.round(currentDate.getDate() - postTime.getDate());
          // return `${Math.round(dif / 1000 / 60 / 60 / 24 / 7)} weeks ago`;
          return `${calculateWeeksBetweenDates(
            postTime,
            currentDate
          )} weeks ago`;
        }
      } else {
        if (
          currentDate.getFullYear() - postTime.getFullYear() <= 1 ||
          (currentDate.getFullYear() === postTime.getFullYear() &&
            calculateMonthsBetweenDates(postTime, currentDate) >= 1)
        ) {
          return `${currentDate.getMonth() - postTime.getMonth()} months ago`;
        } else {
          return `${
            currentDate.getFullYear() - postTime.getFullYear()
          } years ago`;
        }
      }
    }
  };

  useEffect(() => {
    const user = allUsers.find((user) => user.username === username);

    setDp(user?.imageURL);
    setDateDiff(calculateTime());
  }, [allUsers, post]);

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
    <div className="mx-3 border border-slate-400 px-3 py-5 flex" key={_id}>
      {!dp || dp.length === 0 ? (
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
      ) : (
        <img
          src={dp}
          alt="dp"
          className="w-[60px] h-[50px] px-1 rounded-full object-cover"
        />
      )}
      <div className="px-2 mx-2 grow">
        <p className="flex justify-between">
          <span>
            {fullName} &nbsp;
            <span className="text-pink-400">@{username}</span>
            &nbsp;
            {dateDiff}
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
        <p>
          {imgURL && (
            <img
              src={imgURL}
              alt="post"
              className=" w-[35rem] h-[25rem] object-cover"
            />
          )}
        </p>
        {isEditingPost === _id ? (
          <p>
            <textarea
              value={editPostContent}
              onChange={(e) => setEditPostContent(e.target.value)}
              className=" my-2 py-2 input-text border-0 resize-none w-full bg-inherit focus-visible:border-0 focus:outline-0"
            ></textarea>
            <span className="relative">
              <button
                onClick={() => setIsEmomjiKeypadDisplayed((prev) => !prev)}
                // onBlur={() =>
                //   isEmojiKeypadDisplayed && setIsEmomjiKeypadDisplayed(false)
                // }
              >
                <MdOutlineEmojiEmotions />
              </button>
              {isEmojiKeypadDisplayed && (
                <span className="absolute top-5  right-2 mx-auto">
                  <EmojiPicker
                    onEmojiClick={(e) =>
                      setEditPostContent((prev) => prev.concat(e.emoji))
                    }
                  />
                </span>
              )}
            </span>
          </p>
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
