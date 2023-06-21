import { useState } from "react";
import { editUserDetails } from "../services/Auth";
import { useAuth } from "../context/AuthContext";

function EditModal({ userDetails, setIsEditBtnClicked }) {
  const [bio, setBio] = useState(userDetails.bio);
  const [link, setLink] = useState(userDetails.link);
  const { userDispatch } = useAuth();

  console.log("edit", userDetails);
  return (
    <div className="bg-[#00000080] top-0 left-0 fixed w-full h-full z-40 flex justify-center items-center">
      <div className="bg-primary p-5">
        <p>Edit Profile</p>
        <form>
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
                editUserDetails({ ...userDetails, bio, link }, userDispatch);
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
