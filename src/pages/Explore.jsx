import { AiOutlineArrowLeft } from "react-icons/ai";

import Aside from "../component/Aside";
import NavBar from "../component/NavBar";
import { useData } from "../context/DataContext";
import PostCard from "../component/PostCard";
import { useNavigate } from "react-router";

function Explore() {
  const { posts } = useData();
  const navigate = useNavigate();
  const filteredPosts = [...posts.sort((a, b) => b.createdAt - a.createdAt)];

  return (
    // <div className="flex justify-start">
    //   <div className=" px-5 pr-[13rem]">
    //     <NavBar />
    //   </div>
    <div>
      <div className="w-[40rem]">
        <div className="flex justify-start p-3 my-1">
          <button
            onClick={() => navigate(-1)}
            className="p-1 text-2xl hover:border hover:border-2 hover:border-gray-700 hover:bg-[#2d2f3ea8] rounded-lg"
          >
            <AiOutlineArrowLeft />
          </button>
          <p className="flex flex-col items-start px-5 text-xl">Explore</p>
        </div>
        <div className="flex flex-col items-center m-2 flex-wrap">
          {filteredPosts?.length === 0 ? (
            <p className="bg-red-500/[0.3] w-full text-xl p-3 my-3 rounded">
              No Posts
            </p>
          ) : (
            filteredPosts?.map((post) => {
              return <PostCard post={post} />;
            })
          )}
        </div>
      </div>
      {/* <Aside /> */}
    </div>
  );
}
export default Explore;
