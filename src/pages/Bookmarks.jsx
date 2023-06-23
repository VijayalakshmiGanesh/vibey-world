import Aside from "../component/Aside";
import NavBar from "../component/NavBar";
import PostCard from "../component/PostCard";
import { useData } from "../context/DataContext";

function Bookmarks() {
  const { posts, bookmarks } = useData();

  const getBookmarkedPostsDetails = posts.filter(({ _id }) => {
    console.log("check", _id, bookmarks);

    return bookmarks.includes(_id);
  });

  console.log("__BOOKMARK__", getBookmarkedPostsDetails, "bookid", bookmarks);

  return (
    <div className="flex justify-center">
      <NavBar />
      <div>
        <p>Bookmarks</p>
        {bookmarks.length === 0 ? (
          <p>No bookmarks</p>
        ) : (
          getBookmarkedPostsDetails.map((post) => <PostCard post={post} />)
        )}
      </div>
      <Aside />
    </div>
  );
}

export default Bookmarks;
