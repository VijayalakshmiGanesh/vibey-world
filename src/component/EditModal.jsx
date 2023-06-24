import { useState } from "react";
import { editUserDetails } from "../services/Auth";
import { useAuth } from "../context/AuthContext";

function EditModal({ userDetails, setIsEditBtnClicked }) {
  const [bio, setBio] = useState(userDetails.bio);
  const [link, setLink] = useState(userDetails.link);
  const [imageUrl, setImageUrl] = useState(userDetails.dpURL);
  const { userDispatch } = useAuth();

  const avatars = [
    "https://i.ytimg.com/vi/0nOdwi2Dh3I/maxresdefault.jpg",
    "https://static.vecteezy.com/system/resources/previews/002/158/565/large_2x/avatar-profile-pink-neon-icon-brick-wall-background-pink-neon-icon-vector.jpg",
    "https://thumbs.dreamstime.com/z/avatar-showman-outline-icon-blue-neon-style-signs-symbols-can-be-used-web-logo-mobile-app-ui-ux-black-background-155342408.jpg",
    "https://images.hdqwalls.com/download/mask-neon-guy-8d-1440x900.jpg",
    "https://orig00.deviantart.net/4927/f/2018/214/c/4/neon_poool_by_mikebaut27-dciz196.png",
    "https://i.pinimg.com/originals/21/1b/5e/211b5e6df66b1c67fe208f618cca682d.jpg",
    "http://getwallpapers.com/wallpaper/full/7/1/8/1246513-cool-neon-wallpapers-for-desktop-background-2560x1920-for-mobile-hd.jpg",
    "https://tse1.mm.bing.net/th?id=OIP.1wLzUlHVHganxQbVWXLdhAHaF7&pid=Api&P=0&h=180",
  ];
  console.log("edit", userDetails);
  return (
    <div className="bg-[#00000080] top-0 left-0 fixed w-full h-full z-40 flex justify-center items-center">
      <div className="bg-primary p-5 w-[25rem]">
        <p>Edit Profile</p>
        <form>
          <div className="flex flex-wrap justify-center">
            {avatars.map((avatar, idx) => (
              <>
                <span>
                  <img
                    src={avatar}
                    alt={`avatar ${idx}`}
                    className="h-[5rem] w-[6rem] rounded-full p-3 object-cover cursor-pointer hover:border"
                    onClick={() => setImageUrl(avatar)}
                  />
                </span>
              </>
            ))}
          </div>
          <p className="flex flex-col  my-3">
            <label className="label" for="username">
              Name:
            </label>
            <input
              type="text"
              id="username"
              value={`${userDetails.firstName} ${userDetails.lastName}`}
              className="input-text cursor-not-allowed"
              disabled
              // onChange={(e) => setEnteredUsername(e.target.value)}
            />
          </p>
          <p className="flex flex-col  my-3">
            <label className="label" for="bio">
              Bio
            </label>
            <input
              type="text"
              id="bio"
              value={bio}
              className="input-text"
              onChange={(e) => setBio(e.target.value)}
            />
          </p>
          <p className="flex flex-col  my-3">
            <label className="label" for="url">
              URL
            </label>
            <input
              type="url"
              id="url"
              value={link}
              className="input-text"
              onChange={(e) => setLink(e.target.value)}
            />
          </p>
          {/* <p className="flex flex-col  my-3">
            <label className="label" for="password">
              Password:
            </label>
            <input
              type="password"
              id="password"
              // value={enteredPassword}
              className="input-text"
              // onChange={(e) => setEnteredPassword(e.target.value)}
            />
          </p>
          <p className="flex flex-col  my-3">
            <label className="label" for="confirmPassword">
              Confirm Password:
            </label>
            <input
              type="password"
              id="confirmPassword"
              // value={confirmPassword}
              className="input-text"
              // onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </p> */}

          <p className="flex">
            <button
              onClick={(e) => {
                e.preventDefault();
                editUserDetails(
                  { ...userDetails, bio, link, imageURL: imageUrl },
                  userDispatch
                );
                setIsEditBtnClicked(false);
              }}
              className="btn-primary"
            >
              Save
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                setIsEditBtnClicked(false);
              }}
              className="btn-primary"
            >
              Close
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}

export default EditModal;
