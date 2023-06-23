import Avatar from "react-avatar";

function ProfileCard({ name, username, imageURL }) {
  console.log("name in ", name, imageURL);
  return (
    <div className="flex border border-gray-700 p-2 m-1 rounded ">
      <div className="bg-gradient-to-r from-[#054cff] from-10%  to-90% via-85% to-[#ff059b] via-[#ffa111] rounded-full py-1">
        <span className="px-1 rounded-full">
          {!imageURL || imageURL?.length === 0 ? (
            <Avatar
              color={Avatar.getRandomColor("sitebase", [
                "rose",
                "blue",
                // "rgb(251 146 60)",
                "black",
              ])}
              name={name}
              size="50"
              round={true}
            />
          ) : (
            // <p></p>
            <img src={imageURL} alt="display Pic" />
          )}
        </span>
      </div>
      <span className="flex flex-col pl-2">
        <p>{name}</p>
        <p>@{username}</p>
      </span>
    </div>
  );
}
export default ProfileCard;