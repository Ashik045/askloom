/* eslint-disable @typescript-eslint/no-unused-vars */
import { State } from "@/types.global";

export const LoginStart = () => ({
  type: "LOGIN_START",
});

export const LoginSuccess = (user: State["user"]) => ({
  type: "LOGIN_SUCCESS",
  payload: user,
});

export const LoginFailure = (error: string) => ({
  type: "LOGIN_FAILURE",
  payload: error,
});
export const Logout = () => ({
  type: "LOGOUT",
});

export const UserUpdateStart = () => ({
  type: "USER_UPDATE_START",
});

export const UserUpdateSuccess = (user: State["user"]) => ({
  type: "USER_UPDATE_SUCCESS",
  payload: user,
});

export const UserUpdateFailure = (error: string) => ({
  type: "USER_UPDATE_FAILURE",
  payload: error,
});
