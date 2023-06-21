/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { MdOutlineTune } from "react-icons/md";
import {
  AiFillCaretDown,
  AiFillCaretUp,
  AiOutlineHome,
  AiOutlineSearch,
  AiOutlineHeart,
  AiFillHeart,
} from "react-icons/ai";
import { BiTrendingUp, BiBookmark } from "react-icons/bi";
import { BsThreeDots } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { v4 as uuid } from "uuid";
import { NavLink } from "react-router-dom";
import Avatar from "react-avatar";

import {
  deletePost,
  editPost,
  getAllPosts,
  likePost,
  newPost,
  unlikePost,
} from "../services/Posts";
import { useData } from "../context/DataContext";
import { formatDate } from "../backend/utils/authUtils";
import { useAuth } from "../context/AuthContext";
import ProfileCard from "../component/ProfileCard";
import { getAllUsers } from "../services/Auth";
import PostCard from "../component/PostCard";
import NavBar from "../component/NavBar";
import Aside from "../component/Aside";

function Home() {
  const { posts, datadispatch } = useData();
  const { currentUserDetails, userDispatch, allUsers } = useAuth();
  const [sortPostsBy, setSortPostsBy] = useState("Latest");
  const [displaySortOption, setDisplaySortOption] = useState(false);
  const [filteredPosts, setFilteredPosts] = useState(posts);
  const [newPostContent, setNewPostContent] = useState("");
  const [displayPostOptions, setDisplayPostOptions] = useState(false);
  const [isEditingPost, setIsEditingPost] = useState();
  // const [isEditingPost, setIsEditingPost] = useState({})
  const filterPosts = () => {
    return [
      ...posts?.sort((a, b) => {
        if (sortPostsBy === "Oldest") {
          return new Date(a.createdAt) - new Date(b.createdAt);
        } else if (sortPostsBy === "Latest") {
          return new Date(b.createdAt) - new Date(a.createdAt);
        } else if (sortPostsBy === "Trending") {
          return b.likes.likeCount - a.likes.likeCount;
        } else {
          return posts;
        }
      }),
    ];
  };

  const newPostHander = () => {
    newPost(
      {
        _id: uuid(),
        content: newPostContent,
        likes: {
          likeCount: 0,
          likedBy: [],
          dislikedBy: [],
        },
        username: currentUserDetails.username,
        createdAt: formatDate(),
        updatedAt: formatDate(),
      },
      datadispatch
    );
    setNewPostContent("");
  };

  const checkLikedList = (likedList) => {
    return (
      likedList.findIndex(
        ({ username }) => currentUserDetails.username === username
      ) === -1
    );
  };

  console.log("posts", filteredPosts);
  useEffect(() => {
    getAllPosts(datadispatch);
    getAllUsers(userDispatch);
  }, []);

  useEffect(() => {
    setFilteredPosts([...filterPosts()]);
  }, [sortPostsBy, posts]);
  return (
    <div className="flex justify-center">
      <NavBar />
      <div>
        <div>
          <div className="flex justify-start border border-2 p-3 my-3 mx-5">
            <Avatar
              name={`${currentUserDetails.firstName} ${currentUserDetails.lastName}`}
              round={true}
              size="50"
              color={Avatar.getRandomColor("sitebase", [
                // "rgb(251 146 60)",
                "black",

                "blue",
                "pink",
              ])}
            />
            <div className="relative grow">
              <textarea
                className=" my-2 py-2 input-text border-0 resize-none w-full bg-inherit focus-visible:border-0 focus:outline-0"
                placeholder="What's Happening?!"
                value={newPostContent}
                onChange={(e) => setNewPostContent(e.target.value)}
              ></textarea>
              <button
                className="absolute right-0 bottom-[-15px] btn-primary w-auto"
                onClick={() => newPostHander()}
              >
                POST
              </button>
            </div>
          </div>
          <span>{sortPostsBy}</span>
          <button onClick={() => setDisplaySortOption((prev) => !prev)}>
            <MdOutlineTune />
          </button>
          {displaySortOption && (
            <div>
              <button onClick={() => setSortPostsBy("Trending")}>
                Trending
                <span>
                  <BiTrendingUp />
                </span>
              </button>
              <button onClick={() => setSortPostsBy("Latest")}>
                Newest
                <span>
                  <AiFillCaretUp />
                </span>
              </button>
              <button onClick={() => setSortPostsBy("Oldest")}>
                Oldest
                <span>
                  <AiFillCaretDown />
                </span>
              </button>
            </div>
          )}
        </div>
        <div className="flex flex-col items-center m-2 flex-wrap">
          {posts?.length === 0 ? (
            <p>No Posts</p>
          ) : (
            filteredPosts?.map((post) => {
              return <PostCard post={post} />;
              // const { _id, username, content, likes, fullName } = post;

              // return (
              //   <div
              //     className="m-3 border border-2 px-3 py-5 w-[35rem] bg-[#2d2f3e] flex"
              //     key={_id}
              //   >
              //     <Avatar
              //       color={Avatar.getRandomColor("sitebase", [
              //         // "rgb(251 146 60)",
              //         "black",

              //         "blue",
              //         "pink",
              //       ])}
              //       name={fullName}
              //       size="50"
              //       round={true}
              //     />
              //     <div className="px-2 mx-2 grow">
              //       <p className="flex justify-between">
              //         <span>
              //           {fullName} &nbsp;
              //           <span className="text-pink-400">@{username}</span>
              //         </span>
              //         <div
              //           className="relative"
              //           onMouseOver={() =>
              //             setDisplayPostOptions((prev) => !prev)
              //           }
              //           onMouseOut={() => setDisplayPostOptions(false)}
              //         >
              //           <button
              //           // onMouseOver={() =>
              //           //   setDisplayPostOptions((prev) => !prev)
              //           // }
              //           // onMouseOut={() => setDisplayPostOptions(false)}
              //           >
              //             <BsThreeDots />
              //           </button>
              //           {username === currentUserDetails.username &&
              //             displayPostOptions && (
              //               <div className="absolute top-5 right-0 w-[7rem] h-fit flex flex-col border border-2 z-30 bg-primary rounded">
              //                 <button
              //                   className="p-2  border-b-2 "
              //                   onClick={
              //                     () => setIsEditingPost(_id)
              //                     // editPost(_id, post, datadispatch)
              //                   }
              //                 >
              //                   Edit
              //                 </button>
              //                 <button
              //                   className="p-2"
              //                   onClick={() => deletePost(_id, datadispatch)}
              //                 >
              //                   Delete
              //                 </button>
              //               </div>
              //             )}
              //         </div>
              //       </p>
              //       {isEditingPost === _id ? (
              //         <textarea value={content}>{content}</textarea>
              //       ) : (
              //         <p className="text-left">{content}</p>
              //       )}
              //       <p className="my-2 flex justify-between">
              //         <button
              //           className="rounded-full  hover:bg-red-300/[0.1] p-2 hover:text-red-700 flex items-center "
              //           onClick={() =>
              //             checkLikedList(likes.likedBy)
              //               ? likePost(_id, posts, datadispatch)
              //               : unlikePost(_id, posts, datadispatch)
              //           }
              //         >
              //           {checkLikedList(likes.likedBy) ? (
              //             <AiOutlineHeart className="text-xl" />
              //           ) : (
              //             <AiFillHeart className="text-red-700 text-xl" />
              //           )}
              //           <span className="text-lg pl-2 ">{likes.likeCount}</span>
              //         </button>
              //         {isEditingPost === _id && (
              //           <div>
              //             <button
              //               onClick={() => {
              //                 editPost(_id, post, datadispatch);
              //                 setIsEditingPost("");
              //               }}
              //             >
              //               Save
              //             </button>
              //             <button onClick={() => setIsEditingPost("")}>
              //               Cancel
              //             </button>
              //           </div>
              //         )}
              //       </p>
              //     </div>
              //   </div>
              // );
            })
          )}
        </div>
      </div>
      <Aside />
    </div>
  );
}

export default Home;
