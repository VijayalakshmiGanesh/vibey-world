import DisplayPic from "./DisplayPic";

function ProfileCard({ name, username, imageURL }) {
  return (
    <div className="flex p-2 m-1 rounded-lg  hover:surface-clr">
      <span className="px-1 rounded-full">
        <DisplayPic imageURL={imageURL} fullName={name} />
      </span>
      <span className="flex flex-col pl-2 text-left">
        <p>{name}</p>
        <p>@{username}</p>
      </span>
    </div>
  );
}
export default ProfileCard;
