import { createContext, useContext, useReducer } from "react";
import { dataReducer, dataInitialValue } from "../redux/data";
export const DataContext = createContext();
export const DataProvider = ({ children }) => {
  const [state, dispatch] = useReducer(dataReducer, dataInitialValue);

  return (
    <DataContext.Provider
      value={{
        state,
        datadispatch: dispatch,
        posts: state?.posts,
        bookmarks: state?.bookmarkPosts,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
