import { AiOutlineArrowLeft } from "react-icons/ai";
import { useAuth } from "../context/AuthContext";
import { useNavigate, useParams } from "react-router";
import Avatar from "react-avatar";
import { useEffect } from "react";
import { BiObjectsHorizontalLeft } from "react-icons/bi";
import { BsLink45Deg } from "react-icons/bs";
import { FaUserFriends } from "react-icons/fa";

import { followUser, getUserPosts, unFollowUser } from "../services/Auth";
// import NavBar from "../component/NavBar";
// import Aside from "../component/Aside";
import { useState } from "react";
import EditModal from "../component/EditModal";
import { Link } from "react-router-dom";
import PostCard from "../component/PostCard";
import ListModal from "../component/ListModal";
import { useData } from "../context/DataContext";

function UserProfile() {
  const { currentUserDetails, userDispatch, userPosts, allUsers } = useAuth();

  const { posts } = useData();
  const navigate = useNavigate();
  const [isEditBtnClicked, setIsEditBtnClicked] = useState(false);
  const { usernameid } = useParams();
  const [isListDisplayed, setIsListDisplayed] = useState(false);
  const [listName, setListName] = useState("");
  useEffect(() => {
    getUserPosts(usernameid, userDispatch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [usernameid, posts]);

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

  useEffect(() => {
    setIsListDisplayed(false);
  }, [username]);
  return (
    // <div className="flex justify-start">
    //   <div className=" px-5 pr-[13rem]">
    //     <NavBar />
    //   </div>
    <div>
      <div className="w-full lg:w-[40rem]">
        <div className="flex justify-start p-3">
          <button
            onClick={() => navigate(-1)}
            className="p-1 text-2xl hover:border hover:border-2 hover:border-gray-700 hover:bg-[#2d2f3ea8] rounded-lg"
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
          <div className="flex border border-y-2 border-x-0 p-3 my-2 justify-between ">
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
                  size="80"
                  round={true}
                />
              ) : (
                // <p></p>
                <img
                  src={imageURL}
                  alt="display Pic"
                  className="w-[90px] h-[90px] rounded-full object-cover"
                />
              )}

              <div className="text-left pl-5 md:w-[30rem] flex-1 flex-grow">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-2xl font-bold my-font">
                      {firstName} {lastName}
                    </p>
                    <p className="text-slate-400 text-sm">@{username}</p>
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

                <div className="">
                  {user?.bio && (
                    <p className="flex items-center py-1">
                      <span className="text-lg text-slate-400">
                        <BiObjectsHorizontalLeft />
                      </span>
                      <span className="px-2 text-white">{user.bio}</span>
                    </p>
                  )}
                  {user?.link && (
                    <p className="flex items-center ">
                      <span className="text-xl text-slate-400">
                        <BsLink45Deg />
                      </span>
                      <span className="text-cyan-400 px-2 hover:underline hover:underline-offset-2">
                        <Link to={user.link} target="_blank">
                          {user.link}
                        </Link>
                      </span>
                    </p>
                  )}
                </div>
                <div className="flex items-center py-1">
                  <span className="text-xl text-slate-400">
                    <FaUserFriends />
                  </span>
                  <p className="px-2 text-white">
                    <button
                      className="px-1 hover:underline hover:underline-offset-2"
                      onClick={() => {
                        setListName("Following");
                        setIsListDisplayed(true);
                      }}
                    >
                      <span className="font-semibold">{following?.length}</span>{" "}
                      <span className="text-slate-400"> Following</span>
                    </button>
                    <button
                      className="px-1 hover:underline hover:underline-offset-2"
                      onClick={() => {
                        setListName("Followers");
                        setIsListDisplayed(true);
                      }}
                    >
                      <span className="font-semibold">{followers?.length}</span>{" "}
                      <span className="text-slate-400"> Followers</span>
                    </button>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center py-3">
            {userPosts?.length === 0 ? (
              <p>No posts to display</p>
            ) : (
              <>
                {
                  [
                    ...userPosts.sort(
                      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
                    ),
                  ].map((post) => (
                    <PostCard post={post} />
                  ))

                  // userPosts.map((post) => (
                  //   <PostCard post={post} />
                  // ))
                }
              </>
            )}
          </div>
          {isListDisplayed && (
            <ListModal
              followList={listName === "Followers" ? followers : following}
              ListName={listName}
              CloseButton={setIsListDisplayed}
            />
          )}
          {isEditBtnClicked && (
            <EditModal
              userDetails={user}
              setIsEditBtnClicked={setIsEditBtnClicked}
            />
          )}
        </main>
      </div>
      {/* <Aside /> */}
    </div>
  );
}
export default UserProfile;
