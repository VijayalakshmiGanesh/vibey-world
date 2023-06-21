import { createContext, useContext, useReducer, useState } from "react";
import { initialState, userReducer } from "../redux/User";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(userReducer, initialState);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  console.log(state);
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
