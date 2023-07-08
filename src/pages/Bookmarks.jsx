import { useNavigate } from "react-router";
import { AiOutlineArrowLeft } from "react-icons/ai";

// import Aside from "../component/Aside";
// import NavBar from "../component/NavBar";
import PostCard from "../component/PostCard";
import { useData } from "../context/DataContext";

function Bookmarks() {
  const { posts, bookmarks } = useData();
  const navigate = useNavigate();

  const getBookmarkedPostsDetails = posts.filter(({ _id }) => {
    return bookmarks.includes(_id);
  });

  return (
    // <div className="flex justify-start">
    //   <div className=" px-5 pr-[13rem]">
    //     <NavBar />
    //   </div>
    <div>
      <div className="w-full min-h-screen">
        <div className="flex justify-start p-3 my-1">
          <button
            onClick={() => navigate(-1)}
            className="p-1 text-2xl hover:border hover:border-2 hover:border-gray-700 hover:bg-[#2d2f3ea8] rounded-lg"
          >
            <AiOutlineArrowLeft />
          </button>
          <p className="flex flex-col items-start px-5 text-xl">Bookmarks</p>
        </div>
        <div className="flex flex-col items-center m-2 flex-wrap">
          {bookmarks.length === 0 ? (
            <p className="bg-yellow-500/[0.3] w-full text-xl p-3 my-3 rounded">
              No bookmarked posts
            </p>
          ) : (
            getBookmarkedPostsDetails.map((post) => <PostCard post={post} />)
          )}
        </div>
      </div>
      {/* <Aside /> */}
    </div>
  );
}

export default Bookmarks;
