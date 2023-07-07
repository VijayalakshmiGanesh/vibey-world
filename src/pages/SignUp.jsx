import { useEffect, useState } from "react";
import { BiHide, BiShow } from "react-icons/bi";
import { useNavigate } from "react-router";
import { NavLink } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import { signUp } from "../services/Auth";
import { validateNonEmptyText } from "../utils/regexValidations";
import { useData } from "../context/DataContext";

function SignUp() {
  const [enteredUsername, setEnteredUsername] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const { datadispatch } = useData();
  const { userDispatch, setIsUserLoggedIn, isUserLoggedIn } = useAuth();
  const navigate = useNavigate();

  const signupHandler = (e) => {
    e.preventDefault();
    validateNonEmptyText(enteredUsername) &&
      validateNonEmptyText(enteredPassword) &&
      validateNonEmptyText(firstName) &&
      validateNonEmptyText(lastName) &&
      signUp(
        enteredUsername,
        enteredPassword,
        firstName,
        lastName,
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
    <>
      <div className="flex flex-col md:flex-row">
        <img
          src="https://images.pexels.com/photos/4021521/pexels-photo-4021521.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="neon lights"
          className="h-[30vh] object-cover md:h-[100vh] md:w-1/2"
        />
        <div className="flex flex-col items-center justify-center  md:w-1/2 ">
          <div className="border border-2 border-gray-700 px-3 py-6 my-3 w-[90vw] md:w-auto shadow-md shadow-gray-600/50">
            <span className="flex items-center justify-center">
              <img
                src="../assests/logo-copy-removebg-preview.png"
                alt="Logo"
                height="200"
                className="self-center"
              />
            </span>
            <form>
              <p className="flex flex-col  my-3">
                <label className="label" htmlFor="username">
                  Username:
                </label>
                <input
                  type="text"
                  id="username"
                  value={enteredUsername}
                  className="input-text"
                  onChange={(e) => setEnteredUsername(e.target.value)}
                />
              </p>
              <p className="flex flex-col md:flex-row my-3">
                <span className="flex flex-col">
                  <label className="label" htmlFor="firstName">
                    First Name:
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    value={firstName}
                    className="input-text"
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </span>
                <span className="flex flex-col">
                  <label className="label" htmlFor="lastName">
                    Last Name:
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    value={lastName}
                    className="input-text"
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </span>
              </p>
              <p className="flex flex-col  my-3">
                <label className="label" htmlFor="password">
                  Password:
                </label>
                <span className="relative flex items-center">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    value={enteredPassword}
                    className="input-text w-full"
                    onChange={(e) => setEnteredPassword(e.target.value)}
                  />
                  <button
                    className="absolute right-0 p-2 text-lg"
                    onClick={(e) => {
                      e.preventDefault();
                      setShowPassword((prev) => !prev);
                    }}
                  >
                    {showPassword ? <BiHide /> : <BiShow />}
                  </button>
                </span>
              </p>
              <p className="flex flex-col  my-3">
                <label className="label" htmlFor="confirmPassword">
                  Confirm Password:
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  id="confirmPassword"
                  value={confirmPassword}
                  className="input-text"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </p>
              {confirmPassword.length > 0 &&
                confirmPassword !== enteredPassword && (
                  <p>Passwords not matching. Please check</p>
                )}
              <p>
                <button
                  onClick={(e) => signupHandler(e)}
                  className="btn-primary "
                >
                  SignUp
                </button>
              </p>
            </form>
            <p className="mt-3">
              Already have an account? &nbsp;
              <NavLink to="/login" className="link">
                Login
              </NavLink>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
export default SignUp;
