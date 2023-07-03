import { NavLink } from "react-router-dom";
import { AiOutlineCloseCircle } from "react-icons/ai";
import Avatar from "react-avatar";

function ListModal({ followList, ListName, CloseButton }) {
  return (
    <div className="bg-[#00000080] top-0 left-0 fixed w-full h-full z-40 flex justify-center items-center">
      <div className="bg-primary p-5 w-[25rem]">
        <p className="flex justify-between items-center py-2 my-2 px-3 border-b">
          <span className="text-2xl font-bold">{ListName}</span>
          <button
            className="text-slate-400 hover:text-white hover:font-semibold text-xl"
            onClick={() => CloseButton(false)}
          >
            <AiOutlineCloseCircle />
          </button>
        </p>
        <div className="text-left px-2">
          {followList.map((user) => {
            return (
              <NavLink
                to={`/profile/${user.username}`}
                className="flex items-center border-b border-slate-400 mx-2 my-3 hover:border hover:border-2 hover:border-gray-700 hover:bg-[#2d2f3e]"
              >
                {user.imageURL !== "" ? (
                  <img
                    src={user.imageURL}
                    alt="dp"
                    className="w-[45px] h-[45px] rounded-full object-cover"
                  />
                ) : (
                  <Avatar
                    color={Avatar.getRandomColor("sitebase", [
                      "rose",
                      "blue",
                      // "rgb(251 146 60)",
                      "black",
                    ])}
                    name={`${user.firstName} ${user.lastName}`}
                    size="50"
                    round={true}
                  />
                )}
                <p className="py-2 px-3">
                  <span className="flex flex-col">
                    {user.firstName} {user.lastName}
                  </span>
                  <span className="text-slate-400">@{user.username}</span>
                </p>
              </NavLink>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default ListModal;
