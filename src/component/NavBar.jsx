import { NavLink, useNavigate } from "react-router-dom";
import { AiOutlineHome, AiOutlineSearch } from "react-icons/ai";
import { BiBookmark, BiLogOut } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { MdLogout } from "react-icons/md";
import ProfileCard from "./ProfileCard";
import { useAuth } from "../context/AuthContext";
import { logout } from "../services/Auth";

function NavBar() {
  const { currentUserDetails, setIsUserLoggedIn, userDispatch } = useAuth();
  const navigate = useNavigate();

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
        <button
          onClick={() => {
            logout(userDispatch, setIsUserLoggedIn);
            navigate("/login");
          }}
          className="flex items-center text-lg p-2 m-1 hover:border hover:border-2 hover:border-gray-700 hover:bg-[#2d2f3e] rounded-lg"
        >
          <span className="px-1 text-2xl">
            <MdLogout />
          </span>
          <span className="hidden md:inline"> Logout</span>
        </button>
      </div>
      <NavLink to={`/profile/${currentUserDetails.username}`}>
        <ProfileCard
          name={`${currentUserDetails.firstName} ${currentUserDetails.lastName}`}
          username={currentUserDetails.username}
          imageURL={currentUserDetails.imageURL}
        />
      </NavLink>
    </nav>
  );
}

export default NavBar;
