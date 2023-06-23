/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { MdOutlineTune } from "react-icons/md";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
import { BiTrendingUp } from "react-icons/bi";
import { v4 as uuid } from "uuid";
import Avatar from "react-avatar";
import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";
import Axios from "axios";

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
  const [filesSelected, setFilesSelected] = useState();

  // Create a Cloudinary instance and set your cloud name.
  const cld = new Cloudinary({ cloud: { cloudName: "dc1hrpwac" } });

  // cld.image returns a CloudinaryImage with the configuration set.
  const myImage = cld.image("sample");

  // The URL of the image is: https://res.cloudinary.com/demo/image/upload/sample

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

  // var myWidget = cloudinary.createUploadWidget({
  //   cloudName: 'my_cloud_name',
  //   uploadPreset: 'my_preset'}, (error, result) => {
  //     if (!error && result && result.event === "success") {
  //       console.log('Done! Here is the image info: ', result.info);
  //     }
  //   }
  // )

  const uploadImg = async () => {
    // const formData = new FormData();
    // formData.append("file", filesSelected[0]);
    // formData.append("upload_preset", "kdusi1ol");

    // const response = await Axios.post(
    //   "https://api.cloudinary.com/v1_1/dc1hrpwac/image/upload",
    //   formData
    // );

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
              <input
                type="file"
                // value={file}
                onChange={(e) => setFilesSelected(e.target.files)}
              />
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
