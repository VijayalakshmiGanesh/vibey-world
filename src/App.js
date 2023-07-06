import Mockman from "mockman-js";
import { Route, Routes, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./App.css";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import RequiresAuth from "./utils/RequiresAuth";
import UserProfile from "./pages/UserProfile";
import Explore from "./pages/Explore";
import Bookmarks from "./pages/Bookmarks";
import PostDetail from "./pages/PostDetail";
import NavBar from "./component/NavBar";
import Aside from "./component/Aside";

function App() {
  const location = useLocation();

  return (
    // <div className="App flex justify-center " >
    <div
      className={`App ${
        location?.pathname !== "/login" && location?.pathname !== "/signup"
          ? "md:flex md:justify-center gridd"
          : ""
      }`}
    >
      <div
        className={` ${
          location?.pathname !== "/login" && location?.pathname !== "/signup"
            ? "block"
            : "hidden"
        }`}
      >
        <NavBar />
      </div>
      <div className="overflow-y-scroll">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/apitest" element={<Mockman />} />
          <Route
            path="/"
            element={
              <RequiresAuth>
                <Home />
              </RequiresAuth>
            }
          />
          <Route
            path="/profile/:usernameid"
            element={
              <RequiresAuth>
                <UserProfile />
              </RequiresAuth>
            }
          />
          <Route
            path="/explore"
            element={
              <RequiresAuth>
                <Explore />
              </RequiresAuth>
            }
          />
          <Route
            path="/bookmarks"
            element={
              <RequiresAuth>
                <Bookmarks />
              </RequiresAuth>
            }
          />
          <Route
            path={`/post/:postId`}
            element={
              <RequiresAuth>
                <PostDetail />
              </RequiresAuth>
            }
          />
        </Routes>
      </div>

      <div
        className={` ${
          location?.pathname !== "/login" && location?.pathname !== "/signup"
            ? "block "
            : "hidden"
        }`}
      >
        <Aside />
        {/* <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        /> */}
      </div>
    </div>
  );
}

export default App;
