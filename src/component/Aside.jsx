/* eslint-disable react-hooks/exhaustive-deps */
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import ProfileCard from "./ProfileCard";
import { useState } from "react";
import { useEffect } from "react";
import { followUser } from "../services/Auth";

function Aside() {
  const { currentUserDetails, allUsers, userDispatch } = useAuth();
  const [userToSearch, setUserToSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [whoToFollowList, setWhoToFollowList] = useState(allUsers);

  useEffect(() => {
    setWhoToFollowList(
      allUsers.filter(
        ({ username }) =>
          !currentUserDetails.following
            .map(({ username }) => username)
            .includes(username) && currentUserDetails.username !== username
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
  return (
    // <aside className="mx-7"> fixed top-0 right-[6rem] hidden lg:block
    <aside className="mx-5 hidden md:block">
      <p>Search users</p>
      <input
        type="text"
        className="input-text w-[20rem]"
        onChange={(e) => setUserToSearch(e.target.value)}
        value={userToSearch}
      />
      {userToSearch.trim().length > 0 && searchResults.length > 0 ? (
        <div>
          <p>Search Results</p>
          {searchResults?.map(({ firstName, lastName, username }) => (
            <div>
              <p>
                {firstName} {lastName}
              </p>
              <p>@{username}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No users</p>
      )}
      <div className="border border-gray-700 py-3 rounded">
        <p className="text-xl font-semibold">Who to follow</p>
        {whoToFollowList?.length === 0 ? (
          <p className="bg-red-500/[0.3] text-xl p-3 my-3 rounded ">
            No more suggestions
          </p>
        ) : (
          <>
            {whoToFollowList.map(
              ({ username, firstName, lastName, imageURL, _id }) =>
                username !== currentUserDetails.username && (
                  <div
                    className=" flex items-center justify-between text-sm hover:surface-clr "
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
