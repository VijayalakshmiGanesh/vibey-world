import { AiOutlineArrowLeft } from "react-icons/ai";
import { useAuth } from "../context/AuthContext";
import { useNavigate, useParams } from "react-router";
import Avatar from "react-avatar";
import { useEffect } from "react";

import { followUser, getUserPosts } from "../services/Auth";
import NavBar from "../component/NavBar";
import Aside from "../component/Aside";
import { useState } from "react";
import EditModal from "../component/EditModal";
import { Link } from "react-router-dom";

function UserProfile() {
  const { currentUserDetails, userDispatch, userPosts, allUsers } = useAuth();
  const navigate = useNavigate();
  const [isEditBtnClicked, setIsEditBtnClicked] = useState(false);
  const { usernameid } = useParams();

  useEffect(() => {
    // getUserDetails(usernameid, userDispatch);
    getUserPosts(usernameid, userDispatch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const user = allUsers?.find(({ username }) => usernameid === username);
  const { firstName, lastName, username, following, followers, imageURL, _id } =
    user;
  const isCurrentUser = currentUserDetails.username === usernameid;
  // const { firstName, lastName, username, following, followers, imageURL } =
  //   userDetails;
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
          <div className="flex border border-y-2 border-x-0 p-3 my-2">
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
                onClick={() => followUser(_id, userDispatch)}
              >
                follow
              </button>
            )}
          </div>
          {userPosts?.length === 0 ? (
            <p>No posts to display</p>
          ) : (
            <>
              {userPosts.map((post) => {
                const { _id, username, content, likes } = post;

                return (
                  <div
                    className="m-3 border border-2 p-2 h-[25rem] w-[35rem]"
                    key={_id}
                  >
                    <p className="flex justify-between">
                      <span>{username}</span>
                      <div className="relative">
                        <button
                        // onClick={() => setDisplayPostOptions((prev) => !prev)}
                        >
                          {/* <BsThreeDots />  */}
                        </button>
                        {/* {username === currentUserDetails.username &&
                        displayPostOptions && (
                          <div className="absolute top-5 right-0 w-[7rem] h-fit flex flex-col border border-2 z-30 bg-white">
                            <button
                              onClick={() => editPost(_id, post, datadispatch)}
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => deletePost(_id, datadispatch)}
                            >
                              Delete
                            </button>
                          </div>
                        )} */}
                      </div>
                    </p>
                    <p>{content}</p>
                    <p>
                      <button
                      //   onClick={() =>
                      //     checkLikedList(likes.likedBy)
                      //       ? likePost(_id, posts, datadispatch)
                      //       : unlikePost(_id, posts, datadispatch)
                      //   }
                      >
                        Like
                        {/* {checkLikedList(likes.likedBy) ? "Like" : "Unlike"} */}
                      </button>
                      <span>{likes.likeCount}</span>
                    </p>
                  </div>
                );
              })}
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
