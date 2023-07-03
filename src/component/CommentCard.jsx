import { NavLink } from "react-router-dom";

import Avatar from "react-avatar";
import { useEffect, useState } from "react";

function CommentCard({ comment }) {
  const {
    _id,
    comments,
    fullName,
    username,
    profileAvatar: dp,
    createdAt,
  } = comment;

  const [dateDiff, setDateDiff] = useState();
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
    setDateDiff(calculateTime());
  }, [comment]);
  return (
    <div
      className="flex  border-y border-gray-700 p-3 w-full  mx-2 justify-start"
      key={_id}
    >
      <NavLink to={`/profile/${username}`}>
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
            className="w-[60px] min-w-[60px] h-[50px] px-1 rounded-full object-cover"
          />
        )}
      </NavLink>
      <div className="text-left px-5">
        <p className="flex items-center">
          <span className="text-sm font-semibold">{fullName} &nbsp;</span>
          <span className="text-slate-400 text-sm">@{username} &nbsp;</span>
          <span className="flex items-center text-slate-400 text-sm">
            <span className="leading-3 self-start">.</span>
            <span>{dateDiff}</span>
          </span>
        </p>
        <p className="py-3">{comments}</p>
      </div>
    </div>
  );
}
export default CommentCard;
