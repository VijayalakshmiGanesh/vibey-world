import Aside from "../component/Aside";
import NavBar from "../component/NavBar";
import { useData } from "../context/DataContext";
import PostCard from "../component/PostCard";

function Explore() {
  const { posts } = useData();
  const filteredPosts = [...posts.sort((a, b) => b.createdAt - a.createdAt)];
  return (
    <div className="flex justify-center">
      <NavBar />
      <div>
        <p>EXPLORE</p>
        <div className="flex flex-col items-center m-2 flex-wrap">
          {posts?.length === 0 ? (
            <p>No Posts</p>
          ) : (
            filteredPosts?.map((post) => {
              return <PostCard post={post} />;
            })
          )}
        </div>
      </div>
      <Aside />
    </div>
  );
}
export default Explore;
