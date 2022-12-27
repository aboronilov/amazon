import axios from "axios";

import { loginFailure, loginStart, loginSuccess } from "./userRedux";

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
      const authRequest = axios.create({
        baseURL: `${process.env.NEXT_PUBLIC_API_URL}`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const response = await authRequest.get("/api/users/me/");
      dispatch(loginSuccess(response.data));
    } catch (err) {
      dispatch(loginFailure());
    }
  } catch (error) {
    dispatch(loginFailure());
  }
};
