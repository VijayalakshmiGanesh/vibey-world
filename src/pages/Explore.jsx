/* eslint-disable react-hooks/exhaustive-deps */
import { AiOutlineArrowLeft } from "react-icons/ai";
import InfiniteScroll from "react-infinite-scroll-component";

// import Aside from "../component/Aside";
// import NavBar from "../component/NavBar";
import { useData } from "../context/DataContext";
import PostCard from "../component/PostCard";
import { useNavigate } from "react-router";
import { useState } from "react";
import { useEffect } from "react";
import Loader from "../component/Loaders";

function Explore() {
  const { posts } = useData();
  const navigate = useNavigate();
  const filteredPosts = [
    ...posts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)),
  ];
  const [postsToDisplay, setPostsToDisplay] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [pageNumber, setPageNumber] = useState(2);
  console.log("fill  ", filteredPosts);
  const fetchData = () => {
    if (filteredPosts?.length > postsToDisplay?.length) {
      setTimeout(() => {
        const start = (pageNumber - 1) * 3;
        const end =
          pageNumber * 3 <= filteredPosts.length
            ? pageNumber * 3
            : (pageNumber - 1) * 3 +
              (filteredPosts.length - (pageNumber - 1) * 3);
        console.log(start, end);
        const newPosts = [];
        for (let i = start; i < end; i++) {
          newPosts.push(filteredPosts[i]);
        }

        setPostsToDisplay((prev) => [...prev, ...newPosts]);
        setPageNumber((prev) => prev + 1);
      }, 1000);
    } else {
      setHasMore(false);
    }
  };

  useEffect(() => {
    setPostsToDisplay(
      postsToDisplay.map((item, i) =>
        JSON.stringify(item) === JSON.stringify(filteredPosts[i])
          ? item
          : filteredPosts[i]
      )
    );
  }, [posts]);

  useEffect(() => {
    setPostsToDisplay(filteredPosts.slice(0, 3));
  }, []);
  return (
    <div>
      <div className="w-full">
        <div className="flex justify-start p-3 my-1">
          <button
            onClick={() => navigate(-1)}
            className="p-1 text-2xl hover:border hover:border-2 hover:border-gray-700 hover:bg-[#2d2f3ea8] rounded-lg"
          >
            <AiOutlineArrowLeft />
          </button>
          <p className="flex flex-col items-start px-5 text-xl">Explore</p>
        </div>
        <div
          className="flex flex-col items-center my-2 flex-wrap "
          style={{ overflow: "hidden" }}
        >
          <InfiniteScroll
            dataLength={postsToDisplay.length}
            next={fetchData}
            hasMore={hasMore}
            className=""
            loader={
              <div className="flex justify-center my-4">
                <Loader />
              </div>
            }
            endMessage={
              <p className="bg-green-500/[0.3] w-full text-xl p-3 my-3 rounded">
                Yay! You have seen it all
              </p>
            }
          >
            {filteredPosts?.length === 0 ? (
              <p className="bg-red-500/[0.3] w-full text-xl p-3 my-3 rounded">
                No Posts
              </p>
            ) : (
              postsToDisplay?.map((post) => {
                return <PostCard post={post} />;
              })
            )}
          </InfiniteScroll>
        </div>
      </div>
    </div>
  );
}
export default Explore;
