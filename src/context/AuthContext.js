import { createContext, useContext, useReducer, useState } from "react";
import { initialState, userReducer } from "../redux/User";
import { useEffect } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(userReducer, initialState);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  useEffect(() => {
    if (localStorage.hasOwnProperty("key")) {
      setIsUserLoggedIn(true);
      dispatch({
        type: "SET_CURRENT_USER_DETAILS",
        payload: JSON.parse(localStorage.getItem("user")),
      });
    } else {
      setIsUserLoggedIn(false);
    }
  }, []);
  return (
    <AuthContext.Provider
      value={{
        currentUserDetails: state.currentUserDetails,
        userDispatch: dispatch,
        userDetails: state.userDetails,
        userPosts: state.userPosts,
        allUsers: state.allUsers,
        isUserLoggedIn,
        setIsUserLoggedIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
