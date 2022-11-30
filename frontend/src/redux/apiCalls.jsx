import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import { loginFailure, loginStart, loginSuccess, logout } from "./userRedux";

export const login = async (dispatch, { email, password }) => {
  dispatch(loginStart());
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/api/auth/token/`,
      {
        email,
        password,
      }
    );
    const accessToken = response.data.access;
    localStorage.setItem("token", accessToken);

    try {
      const authAxios = axios.create({
        baseURL: `${process.env.NEXT_PUBLIC_API_URL}`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const response = await authAxios.get("/api/users/me/");
      // console.log(response.data);
      dispatch(loginSuccess(response.data));
    } catch (err) {
      dispatch(loginFailure());
    }
  } catch (error) {
    dispatch(loginFailure());
  }
};


