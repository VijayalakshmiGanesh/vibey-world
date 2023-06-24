import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import ProfileCard from "./ProfileCard";

function Aside() {
  const { currentUserDetails, allUsers } = useAuth();
  return (
    <aside className="mx-5">
      {allUsers?.length === 0 ? (
        <p>Loading...</p>
      ) : (
        <>
          {allUsers.map(
            ({ username, firstName, lastName, imageURL }) =>
              username !== currentUserDetails.username && (
                <NavLink to={`/profile/${username}`}>
                  <ProfileCard
                    name={`${firstName} ${lastName}`}
                    username={username}
                    imageURL={imageURL}
                  />
                </NavLink>
              )
          )}
        </>
      )}
    </aside>
  );
}

export default Aside;
