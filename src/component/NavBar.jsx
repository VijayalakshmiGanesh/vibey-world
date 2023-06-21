import { NavLink } from "react-router-dom";
import { AiOutlineHome, AiOutlineSearch } from "react-icons/ai";
import { BiBookmark } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import ProfileCard from "./ProfileCard";
import { useAuth } from "../context/AuthContext";

function NavBar() {
  const { currentUserDetails } = useAuth();
  return (
    <nav className="flex flex-col justify-between h-[90vh]">
      <div className="flex flex-col">
        <NavLink
          to="/"
          className="flex items-center text-lg p-2 m-1 hover:border hover:border-2 hover:border-gray-700 hover:bg-[#2d2f3e] rounded-lg"
        >
          <img
            src="../assests/logo-copy-removebg-preview.png"
            alt="logo"
            height={100}
            width={135}
          />
        </NavLink>
        <NavLink
          to="/"
          className="flex items-center text-lg p-2 m-1 hover:border hover:border-2 hover:border-gray-700 hover:bg-[#2d2f3e] rounded-lg"
        >
          <span className="px-1 text-2xl">
            <AiOutlineHome />
          </span>
          <span className="hidden md:inline"> Home</span>
        </NavLink>
        <NavLink
          to="/explore"
          className="flex items-center text-lg p-2 m-1 hover:border hover:border-2 hover:border-gray-700 hover:bg-[#2d2f3e] rounded-lg"
        >
          <span className="px-1 text-2xl">
            <AiOutlineSearch />
          </span>
          <span className="hidden md:inline"> Explore</span>
        </NavLink>
        <NavLink
          to="/bookmarks"
          className="flex items-center text-lg p-2 m-1 hover:border hover:border-2 hover:border-gray-700 hover:bg-[#2d2f3e] rounded-lg"
        >
          <span className="px-1 text-2xl">
            <BiBookmark />
          </span>
          <span className="hidden md:inline"> Bookmarks</span>
        </NavLink>
        <NavLink
          to={`/profile/${currentUserDetails.username}`}
          className="flex items-center text-lg p-2 m-1 hover:border hover:border-2 hover:border-gray-700 hover:bg-[#2d2f3e] rounded-lg"
        >
          <span className="px-1 text-2xl">
            <CgProfile />
          </span>
          <span className="hidden md:inline"> Profile</span>
        </NavLink>
      </div>
      <NavLink to={`/profile/${currentUserDetails.username}`}>
        <ProfileCard
          name={`${currentUserDetails.firstName} ${currentUserDetails.lastName}`}
          username={currentUserDetails.username}
        />
      </NavLink>
    </nav>
  );
}

export default NavBar;
