/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { MdOutlineTune } from "react-icons/md";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
import { BiTrendingUp } from "react-icons/bi";
import { v4 as uuid } from "uuid";
import Avatar from "react-avatar";
import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";

import { getAllPosts, newPost } from "../services/Posts";
import { useData } from "../context/DataContext";
import { formatDate } from "../backend/utils/authUtils";
import { useAuth } from "../context/AuthContext";
import { getAllUsers } from "../services/Auth";
import PostCard from "../component/PostCard";
import NavBar from "../component/NavBar";
import Aside from "../component/Aside";

function Home() {
  const { posts, datadispatch } = useData();
  const { currentUserDetails, userDispatch } = useAuth();
  const [sortPostsBy, setSortPostsBy] = useState("Latest");
  const [displaySortOption, setDisplaySortOption] = useState(false);
  const [filteredPosts, setFilteredPosts] = useState(posts);
  const [newPostContent, setNewPostContent] = useState("");

  const filterPosts = () => {
    const currentFollowing = currentUserDetails?.following?.map(
      ({ username }) => username
    );
    if (currentFollowing.length === 0) return [];

    console.log("Cuureent followings", currentFollowing);
    console.log(
      "filtering",
      posts.filter(({ username }) => currentFollowing.includes(username))
    );
    const filteredPostsBasedOnFollowing =
      currentFollowing?.length >= 1
        ? posts?.filter(({ username }) => username?.includes(currentFollowing))
        : [];
    console.log("filteredPostsBasedOnFollowing", filteredPostsBasedOnFollowing);
    return [
      ...filteredPostsBasedOnFollowing?.sort((a, b) => {
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

  console.log("posts", posts);

  useEffect(() => {
    setFilteredPosts([...filterPosts()]);
  }, [sortPostsBy, posts, currentUserDetails?.following]);

  useEffect(() => {
    getAllPosts(datadispatch);
    getAllUsers(userDispatch);
  }, []);
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
          {filteredPosts?.length === 0 ? (
            <p>No Posts</p>
          ) : (
            filteredPosts?.map((post) => {
              return <PostCard post={post} />;
            })
          )}
          <AdvancedImage cldImg={myImage} />
        </div>
      </div>
      <Aside />
    </div>
  );
}

export default Home;
