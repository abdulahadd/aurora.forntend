import React, { useEffect, useState } from "react";
import { useUserDispatch } from "../../../redux/redux-hooks/hooks";
import { updateUserState } from "../../../redux/slices/users/user-slice";
import { Link } from "react-router-dom";
import bgimg from "../../../assets/pngs/182-_converted_.png";
import axios, { AxiosError } from "axios";
import "react-toastify/dist/ReactToastify.css";
import { Alert } from "@mui/material";
import { AUTH_API_PATHS } from "../../atoms/paths/ApiPaths";

const LoginForm = () => {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const dispatch = useUserDispatch();
  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser({
      ...user,
      username: event.target.value,
    });
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser({
      ...user,
      password: event.target.value,
    });
  };

  async function handleSubmit(e: any) {
    e.preventDefault();

    if (!user.username.trim() || !user.password.trim()) {
      alert("Please enter username or password.");
      return;
    }

    const postData = {
      username: user.username,
      password: user.password,
    };

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_URL}${AUTH_API_PATHS.POST_LOGIN}`,
        postData
      );
      const token = response.data.access_token;
      const org = response.data.payload.orgId;

      try {
        const role = await axios.get(
          `${process.env.REACT_APP_COMMENTS_URL}/roles/${response.data.payload.role}`
        );
        if (token?.length) {
          dispatch(
            updateUserState({
              ...user,
              token: token,
              role: role.data.name,
              orgId: org,
              isLoggedIn: true,
            })
          );
        }
      } catch (error) {
        console.log(error);
      }
    } catch (error:any) {
      alert(error.response.data.message);
    }

    setUser({
      username: "",
      password: "",
    });
  }

  return (
    <div className="h-screen flex items-center justify-center bg-indigo-100">
      <div className="flex h-5/6 w-5/6 bg-white">
        <div className="flex items-center h-full w-7/12 justify-center ">
          <img className="w-full " src={bgimg} alt="/"></img>
        </div>
        <div className="bg-purple-900 flex items-center w-full md:w-5/12 justify-center drop-shadow-2xl">
          <form className="h-3/5 w-3/5 mx-auto p-4 border-2 rounded-xl bg-white  mt-15 drop-shadow-xl">
            <h2 className="text-4xl font-bold text-center py-8">AURORA.</h2>
            <div className="flex flex-col py-2">
              <label className="text-left py-2">Username</label>
              <input
                className="border-2 p-2"
                value={user.username}
                onChange={handleUsernameChange}
                type="text"
              />
            </div>
            <div className="flex flex-col py-2">
              <label className="text-left pb-2">Password</label>
              <input
                className="border-2 p-2"
                value={user.password}
                onChange={handlePasswordChange}
                type="password"
              />
            </div>
            <button
              className=" w-full my-5 py-2 bg-purple-900 hover:bg-indigo-400 text-white"
              onClick={handleSubmit}
            >
              Sign In
            </button>
            <div className="flex justify-between">
              <p className="flex-items-center">
                <input className="mr-2" type="checkbox" /> Remember me
              </p>
              <Link to="/signup">Create an account</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
