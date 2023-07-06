/* eslint-disable react-hooks/exhaustive-deps */
import { NavLink, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import ProfileCard from "./ProfileCard";
import { useState } from "react";
import { useEffect } from "react";
import { followUser } from "../services/Auth";
import DisplayPic from "./DisplayPic";

function Aside() {
  const { currentUserDetails, allUsers, userDispatch } = useAuth();
  const [userToSearch, setUserToSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [whoToFollowList, setWhoToFollowList] = useState(allUsers);
  const location = useLocation();

  useEffect(() => {
    currentUserDetails &&
      setWhoToFollowList(
        allUsers?.filter(
          ({ username }) =>
            !currentUserDetails?.following
              ?.map(({ username }) => username)
              ?.includes(username) && currentUserDetails.username !== username
        )
      );
  }, [currentUserDetails?.following, allUsers]);

  useEffect(() => {
    setSearchResults(
      allUsers.filter(
        ({ username, firstName, lastName }) =>
          username.includes(userToSearch) ||
          firstName.includes(userToSearch) ||
          lastName.includes(userToSearch)
      )
    );
  }, [userToSearch]);

  useEffect(() => {
    setUserToSearch("");
    setSearchResults([]);
  }, [location?.pathname]);

  return (
    // <aside className="mx-7"> fixed top-0 right-[6rem] hidden lg:block
    <aside className="mx-5 hidden md:block">
      <p>Search users</p>
      <input
        type="text"
        className="input-text w-[20rem]"
        onChange={(e) => {
          setUserToSearch(e.target.value);
        }}
        placeholder="Search Vibey World"
        value={userToSearch}
      />
      {userToSearch.trim().length >= 1 && (
        <>
          {searchResults.length > 0 ? (
            <div className=" md:border-gray-700 md:border md:shadow md:shadow-gray-500/40 mb-3 mt-1">
              <p className="font-semibold py-3 ">Search Results</p>
              {searchResults?.map(
                ({ firstName, lastName, username, _id, imageURL }) => (
                  <NavLink to={`/profile/${username}`}>
                    <div key={_id} className="flex items-center ">
                      <span className="mx-3 px-2">
                        <DisplayPic
                          imageURL={imageURL}
                          fullName={`${firstName} ${lastName}`}
                        />
                      </span>

                      <div className="p-3">
                        <p>
                          {firstName} {lastName}
                        </p>
                        <p>@{username}</p>
                      </div>
                    </div>
                  </NavLink>
                )
              )}
            </div>
          ) : (
            <p className="bg-red-500/[0.3] w-full text-xl p-3 my-3 rounded">
              No users
            </p>
          )}
        </>
      )}
      <div className="border border-gray-700 py-3 rounded my-3">
        <p className="text-xl font-semibold">Who to follow</p>
        {whoToFollowList?.length === 0 ? (
          <p className="bg-red-500/[0.3] text-xl p-3 my-3 rounded ">
            No more suggestions
          </p>
        ) : (
          <>
            {whoToFollowList.map(
              ({ username, firstName, lastName, imageURL, _id }, index) =>
                username !== currentUserDetails.username &&
                index < 3 && (
                  <div
                    className=" flex items-center justify-between text-sm hover:surface-clr"
                    key={_id}
                  >
                    <NavLink to={`/profile/${username}`}>
                      <ProfileCard
                        name={`${firstName} ${lastName}`}
                        username={username}
                        imageURL={imageURL}
                      />
                    </NavLink>
                    <button
                      className="bg-pink-700 text-white rounded-full px-3 py-2 mr-3 "
                      onClick={() => followUser(_id, userDispatch)}
                    >
                      Follow
                    </button>
                  </div>
                )
            )}
          </>
        )}
      </div>
    </aside>
  );
}

export default Aside;
