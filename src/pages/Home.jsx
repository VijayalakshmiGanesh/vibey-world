/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { MdOutlineTune } from "react-icons/md";
import {
  AiFillCaretDown,
  AiFillCaretUp,
  AiFillCloseCircle,
} from "react-icons/ai";
import { BiTrendingUp } from "react-icons/bi";
import { BsImage, BsEmojiSmile } from "react-icons/bs";
// import { MdOutlineEmojiEmotions } from "react-icons/md";
import { v4 as uuid } from "uuid";
import EmojiPicker from "emoji-picker-react";

import { getAllPosts, newPost } from "../services/Posts";
import { useData } from "../context/DataContext";
import { formatDate } from "../backend/utils/authUtils";
import { useAuth } from "../context/AuthContext";
import { getAllUsers } from "../services/Auth";
import PostCard from "../component/PostCard";
// import NavBar from "../component/NavBar";
// import Aside from "../component/Aside";
import Loader from "../component/Loaders";
import DisplayPic from "../component/DisplayPic";

function Home() {
  const { posts, datadispatch } = useData();
  const { currentUserDetails, userDispatch } = useAuth();
  const [sortPostsBy, setSortPostsBy] = useState("Latest");
  const [displaySortOption, setDisplaySortOption] = useState(false);
  const [filteredPosts, setFilteredPosts] = useState(posts);
  const [newPostContent, setNewPostContent] = useState("");
  const [filesSelected, setFilesSelected] = useState("");
  const [isEmojiKeypadDisplayed, setIsEmomjiKeypadDisplayed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const filterPosts = () => {
    const currentFollowing = currentUserDetails?.following?.map(
      ({ username }) => username
    );

    const filteredPostsBasedOnFollowing =
      currentFollowing?.length >= 1
        ? posts.filter(
            ({ username }) =>
              currentFollowing.includes(username) ||
              currentUserDetails.username === username
          )
        : posts.filter(
            ({ username }) => currentUserDetails.username === username
          );

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

  const newPostHander = async () => {
    if (newPostContent.length >= 1 || filesSelected.length >= 1) {
      let response = "";

      if (filesSelected[0] !== "") {
        response = await uploadImg();
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
            imgURL: response?.url,
          },
          datadispatch
        );
      } else {
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
            imgURL: "",
          },
          datadispatch
        );
      }
      setFilesSelected("");
      setNewPostContent("");
      setIsEmomjiKeypadDisplayed(false);
    }
  };

  useEffect(() => {
    setFilteredPosts([...filterPosts()]);
  }, [sortPostsBy, posts, currentUserDetails?.following]);

  useEffect(() => {
    setIsLoading(true);
    getAllPosts(datadispatch);
    getAllUsers(userDispatch);
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);
  return (
    <div>
      <div className="w-full ">
        {isLoading ? (
          <span className="flex items-center justify-center h-screen text-2xl">
            {" "}
            <Loader />
          </span>
        ) : (
          <>
            <div>
              <div className="flex justify-start border-b md:border border-slate-400 p-3 my-3 md:mx-5">
                <DisplayPic
                  imageURL={currentUserDetails.imageURL}
                  fullName={`${currentUserDetails.firstName} ${currentUserDetails.lastName}`}
                />

                <div className="relative grow w-[35rem]">
                  <textarea
                    className=" my-2 py-2 input-text border-0 resize-none w-full bg-inherit focus-visible:border-0 focus:outline-0"
                    placeholder="What's Happening?!"
                    value={newPostContent}
                    onChange={(e) => setNewPostContent(e.target.value)}
                  ></textarea>
                  <div className="flex justify-center ">
                    {filesSelected !== "" && filesSelected?.length !== 0 && (
                      <span className="relative">
                        <img
                          src={URL.createObjectURL(filesSelected[0])}
                          alt="file selected"
                          height="300"
                          width="300"
                        />

                        <button
                          className="absolute top-[-0.5rem] right-[-0.4rem] text-red-800 text-2xl"
                          onClick={() => setFilesSelected("")}
                        >
                          {<AiFillCloseCircle />}
                        </button>
                      </span>
                    )}
                  </div>
                  <div className="flex items-center">
                    <label className="cursor-pointer text-lg">
                      <BsImage />
                      <input
                        type="file"
                        className="hidden"
                        onChange={(e) => setFilesSelected(e.target.files)}
                      />
                    </label>

                    <span
                      className={`relative self-end px-4 pt-[2px] text-lg hover:text-yellow-400 ${
                        isEmojiKeypadDisplayed && "text-yellow-400"
                      }`}
                    >
                      <button
                        onClick={() =>
                          setIsEmomjiKeypadDisplayed((prev) => !prev)
                        }
                      >
                        <BsEmojiSmile />
                      </button>
                      {isEmojiKeypadDisplayed && (
                        <span className="absolute top-5  right-2 mx-auto">
                          <EmojiPicker
                            onEmojiClick={(e) =>
                              setNewPostContent((prev) => prev.concat(e.emoji))
                            }
                          />
                        </span>
                      )}
                    </span>
                    {/* </label> */}
                    <button
                      className="absolute right-0 bottom-[-15px] btn-primary w-auto"
                      onClick={() => newPostHander()}
                    >
                      POST
                    </button>
                  </div>
                </div>
              </div>
              <p className="flex items-center justify-between px-5 py-3">
                <span className="text-xl">{sortPostsBy} Posts</span>
                <div>
                  <button
                    onClick={() => setDisplaySortOption((prev) => !prev)}
                    className="text-xl hover:surface-clr hover:rounded-full hover:text-pink-400 p-2"
                  >
                    <MdOutlineTune />
                  </button>
                  {displaySortOption && (
                    <div className="relative">
                      <div className="flex flex-col absolute top-0 right-3 w-[7rem] h-fit flex flex-col border border-2 z-30 bg-primary rounded">
                        <button
                          onClick={() => setSortPostsBy("Trending")}
                          className="flex items-center p-2  border-b-2 hover:surface-clr"
                        >
                          <span className="pr-2">
                            <BiTrendingUp />
                          </span>
                          Trending
                        </button>
                        <button
                          onClick={() => setSortPostsBy("Latest")}
                          className="flex items-center p-2  border-b-2 hover:surface-clr"
                        >
                          <span className="pr-2">
                            <AiFillCaretUp />
                          </span>
                          Latest
                        </button>
                        <button
                          onClick={() => setSortPostsBy("Oldest")}
                          className="flex items-center p-2  border-b-2 hover:surface-clr"
                        >
                          <span className="pr-2">
                            <AiFillCaretDown />
                          </span>
                          Oldest
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </p>
            </div>
            <div className="flex flex-col items-center my-2 md:m-2 flex-wrap">
              {filteredPosts?.length === 0 ? (
                <p>No Posts</p>
              ) : (
                filteredPosts?.map((post) => {
                  return <PostCard post={post} />;
                })
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Home;
