import { AiOutlineArrowLeft } from "react-icons/ai";
import { useAuth } from "../context/AuthContext";
import { useNavigate, useParams } from "react-router";
import Avatar from "react-avatar";
import { useEffect } from "react";

import { followUser, getUserPosts, unFollowUser } from "../services/Auth";
import NavBar from "../component/NavBar";
import Aside from "../component/Aside";
import { useState } from "react";
import EditModal from "../component/EditModal";
import { Link } from "react-router-dom";
import PostCard from "../component/PostCard";

function UserProfile() {
  const { currentUserDetails, userDispatch, userPosts, allUsers } = useAuth();
  const navigate = useNavigate();
  const [isEditBtnClicked, setIsEditBtnClicked] = useState(false);
  const { usernameid } = useParams();

  useEffect(() => {
    // getUserDetails(usernameid, userDispatch);
    getUserPosts(usernameid, userDispatch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [usernameid]);

  const user = allUsers?.find(({ username }) => usernameid === username);
  const { firstName, lastName, username, following, followers, imageURL, _id } =
    user;
  const isCurrentUser = currentUserDetails.username === usernameid;

  const handleFollow = () => {
    return (
      followers.findIndex(
        ({ username }) => username === currentUserDetails.username
      ) === -1
    );
  };
  return (
    <div className="flex justify-center">
      <NavBar />

      <div>
        <div className="flex justify-start p-3">
          <button
            onClick={() => navigate(-1)}
            className="p-1 text-2xl hover:border hover:border-2 hover:border-gray-700 hover:bg-[#2d2f3e] rounded-lg"
          >
            <AiOutlineArrowLeft />
          </button>
          <p className="flex flex-col items-start px-5">
            <span>
              {firstName} {lastName}
            </span>
            <span>
              {userPosts.length !== 0 ? userPosts.length : "No"} posts
            </span>
          </p>
        </div>
        <main>
          <div className="flex border border-y-2 border-x-0 p-3 my-2 justify-between">
            <div className="flex">
              {!imageURL || imageURL?.length === 0 ? (
                <Avatar
                  color={Avatar.getRandomColor("sitebase", [
                    "rose",
                    "blue",
                    // "rgb(251 146 60)",
                    "black",
                  ])}
                  name={`${firstName} ${lastName}`}
                  size="50"
                  round={true}
                />
              ) : (
                // <p></p>
                <img src={imageURL} alt="display Pic" />
              )}
              <div className="text-left pl-5">
                <p>
                  {firstName} {lastName}
                </p>
                <p>@{username}</p>
                {user?.bio && <p>{user.bio}</p>}
                {user?.link && <Link to={user.link}>{user.link}</Link>}
                <p>
                  <span>{following?.length} following</span>
                  <span>{followers?.length} followers</span>
                </p>
              </div>
            </div>
            {isCurrentUser ? (
              <button
                className="justify-end self-start btn-primary w-auto"
                onClick={(e) => {
                  setIsEditBtnClicked(true);
                }}
              >
                Edit Profile
              </button>
            ) : (
              <button
                className="justify-end self-start btn-primary w-auto"
                onClick={() =>
                  handleFollow()
                    ? followUser(_id, userDispatch)
                    : unFollowUser(_id, userDispatch)
                }
              >
                {handleFollow() ? "Follow" : "Following"}
              </button>
            )}
          </div>
          {userPosts?.length === 0 ? (
            <p>No posts to display</p>
          ) : (
            <>
              {userPosts.map((post) => (
                <PostCard post={post} />
              ))}
              {isEditBtnClicked && (
                <EditModal
                  userDetails={user}
                  setIsEditBtnClicked={setIsEditBtnClicked}
                />
              )}
            </>
          )}
        </main>
      </div>
      <Aside />
    </div>
  );
}
export default UserProfile;
