import Avatar from "react-avatar";

function DisplayPic({ fullName, imageURL }) {
  return (
    <>
      {!imageURL || imageURL?.length === 0 ? (
        <Avatar
          color={Avatar.getRandomColor("sitebase", [
            // "rgb(251 146 60)",
            "black",

            "blue",
            "pink",
          ])}
          name={fullName}
          size="50"
          round={true}
        />
      ) : (
        <img
          src={imageURL}
          alt="dp"
          className="w-[60px] min-w-[60px] h-[50px] px-1 rounded-full object-cover"
        />
      )}
    </>
  );
}

export default DisplayPic;
