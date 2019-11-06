import axios from "axios";
import jwt_decode from "jwt-decode";
import _ from "lodash";

export const decodeToken = () => {
  if (typeof window !== "undefined" && window.localStorage.getItem("token")) {
    try {
      const jwt = window.localStorage.getItem("token");
      const user = jwt_decode(jwt);
      return user;
    } catch (err) {
      console.log(err);
      return {};
    }
  }
};

export const setUser = () => {
  let user = decodeToken();
  user = JSON.stringify(user);
  window.localStorage.setItem("user", user);
};

export const getUser = () => {
  let user = window.localStorage.getItem("user");
  user = JSON.parse(user);
  if (!_.isEmpty(user)) {
    return user;
  }
  return {};
};

export const logout = () => {
  window.localStorage.removeItem("token");
  window.localStorage.removeItem("user");
  localStorage.setItem("token", {});
};

export const handleLogin = async (access_token, serverEndpoint, provider) => {
  return new Promise(async (resolve, reject) => {
    const serverEndpoint = "http://localhost:5000";
    const provider = "facebook";
    const res = await axios.post(`${serverEndpoint}/users/auth/${provider}`, {
      access_token: access_token
    });
    const jwt = res.headers["x-auth-token"];
    let user;
    // decode and verify token
    try {
      user = jwt_decode(jwt);
      if (window !== undefined) {
        axios.defaults.headers.common["x-auth-token"] = jwt;
      }
      localStorage.setItem("token", jwt);
      return resolve(user);
    } catch (err) {
      return reject(err);
    }
  });
};

export const isLoggedIn = () => {
  let user = window.localStorage.getItem("user");
  user = JSON.parse(user);
  return !_.isEmpty(user);
};
