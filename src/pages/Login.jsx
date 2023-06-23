import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { login } from "../services/Auth";
import { validateNonEmptyText } from "../utils/regexValidations";
import { useData } from "../context/DataContext";

function Login() {
  const [enteredUsername, setEnteredUsername] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const { datadispatch } = useData();
  const { userDispatch, setIsUserLoggedIn, isUserLoggedIn } = useAuth();
  const navigate = useNavigate();

  const loginHandler = (e) => {
    e.preventDefault();
    validateNonEmptyText(enteredUsername) &&
      validateNonEmptyText(enteredPassword) &&
      login(
        enteredUsername,
        enteredPassword,
        userDispatch,
        setIsUserLoggedIn,
        datadispatch
      );
  };

  useEffect(() => {
    if (isUserLoggedIn) {
      navigate("/");
    }
  }, [isUserLoggedIn, navigate]);
  return (
    <div className="flex flex-col md:flex-row">
      <img
        src="https://images.pexels.com/photos/4021521/pexels-photo-4021521.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        alt="neon lights"
        className="h-[30vh] object-cover md:h-[100vh] md:w-1/2"
      />
      <div className="flex flex-col items-center justify-center md:w-1/2 ">
        <div className="border border-2 border-gray-700 px-3 py-6 my-3">
          <img src="../assests/logo-copy-removebg-preview.png" alt="Logo" />
          <form>
            <p className="flex flex-col my-3">
              <label for="username" className="label">
                Username
              </label>
              <input
                type="text"
                id="username"
                placeholder="adarshbalika"
                value={enteredUsername}
                onChange={(e) => setEnteredUsername(e.target.value)}
                className="input-text"
              />
            </p>
            <p className="flex flex-col my-3">
              <label for="password" className="label">
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="adarshBalika123"
                value={enteredPassword}
                onChange={(e) => setEnteredPassword(e.target.value)}
                className="input-text"
              />
            </p>
            <p className="flex justify-center ">
              <button className="btn-primary" onClick={(e) => loginHandler(e)}>
                Login
              </button>
              <button
                className="btn-primary"
                // className="w-3/4 p-2 m-3 rounded-md border border-2 border-gray-700 bg-[#ff059b]"
                onClick={(e) => {
                  e.preventDefault();
                  setEnteredUsername("adarshbalika");
                  setEnteredPassword("adarshBalika123");
                }}
              >
                Test Credentials
              </button>
            </p>
          </form>
          <p className="my-3">
            Don't have an account? &nbsp;
            <NavLink to="/signup" className="link">
              SignUp
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
}
export default Login;
