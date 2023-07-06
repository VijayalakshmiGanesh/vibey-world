import { NavLink, useNavigate } from "react-router-dom";
import { AiOutlineHome, AiOutlineCompass } from "react-icons/ai";
import { BiBookmark } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { MdLogout } from "react-icons/md";
import ProfileCard from "./ProfileCard";
import { useAuth } from "../context/AuthContext";
import { logout } from "../services/Auth";

function NavBar() {
  const { currentUserDetails, setIsUserLoggedIn, userDispatch } = useAuth();
  const navigate = useNavigate();

  return (
    <nav className="bg-[#000000c2] md:bg-inherit w-full md:flex md:flex-col md:justify-between md:h-screen md:mx-5">
      <div className="flex bg-[#000000c2] fixed bottom-0 left-0 justify-around items-center md:static w-full  py-4 md:flex-col md:bg-inherit md:items-start md:justify-start md:py-1 md:gap-3 ">
        <NavLink
          to="/"
          className="hidden md:block md:flex md:items-center md:text-lg md:p-2 md:m-1 md:hover:border md:hover:border-2 md:hover:border-gray-700 md:hover:bg-[#2d2f3ea8] md:rounded-lg"
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
          className="flex items-center md:flex md:items-center md:text-lg md:p-2 md:m-1 md:hover:border md:hover:border-2 md:hover:border-gray-700 md:hover:bg-[#2d2f3ea8] md:rounded-lg"
        >
          <span className="text-2xl md:px-1 ">
            <AiOutlineHome />
          </span>
          <span className="hidden lg:inline"> Home</span>
        </NavLink>
        <NavLink
          to="/explore"
          className="flex items-center md:flex md:items-center md:text-lg md:p-2 md:m-1 md:hover:border md:hover:border-2 md:hover:border-gray-700 md:hover:bg-[#2d2f3ea8] md:rounded-lg"
        >
          <span className="text-2xl md:px-1">
            <AiOutlineCompass />
          </span>
          <span className="hidden lg:inline"> Explore</span>
        </NavLink>
        <NavLink
          to="/bookmarks"
          className="flex items-center md:flex md:items-center md:text-lg md:p-2 md:m-1 md:hover:border md:hover:border-2 md:hover:border-gray-700 md:hover:bg-[#2d2f3ea8] md:rounded-lg"
        >
          <span className="text-2xl md:px-1">
            <BiBookmark />
          </span>
          <span className="hidden lg:inline"> Bookmarks</span>
        </NavLink>
        <NavLink
          to={`/profile/${currentUserDetails.username}`}
          className="flex items-center md:flex md:items-center md:text-lg md:p-2 md:m-1 md:hover:border md:hover:border-2 md:hover:border-gray-700 md:hover:bg-[#2d2f3ea8] md:rounded-lg"
        >
          <span className="text-2xl md:px-1">
            <CgProfile />
          </span>
          <span className="hidden lg:inline"> Profile</span>
        </NavLink>
        <button
          onClick={() => {
            logout(userDispatch, setIsUserLoggedIn);
            navigate("/login");
          }}
          className="flex items-center md:flex md:items-center md:text-lg md:p-2 md:m-1 md:hover:border md:hover:border-2 md:hover:border-gray-700 md:hover:bg-[#2d2f3ea8] md:rounded-lg"
        >
          <span className="text-2xl md:px-1">
            <MdLogout />
          </span>
          <span className="hidden lg:inline"> Logout</span>
        </button>
      </div>
      <div className="hidden lg:inline">
        <NavLink to={`/profile/${currentUserDetails.username}`}>
          <ProfileCard
            name={`${currentUserDetails.firstName} ${currentUserDetails.lastName}`}
            username={currentUserDetails.username}
            imageURL={currentUserDetails.imageURL}
          />
        </NavLink>
      </div>
    </nav>
  );
}

export default NavBar;
