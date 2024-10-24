"use client";

import { State } from "@/types.global";
import React, { createContext, useEffect, useReducer } from "react";
import { Reducer } from "./Reducer";

type Props = {
  children: React.ReactNode;
};

// Check if we're on the client side
const isServer = typeof window !== "undefined";

/* Initial state of the application */
export const INITIAL_STATE: State = {
  user:
    isServer && localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user") as string)
      : null,
  isLoading: false,
  error: null,
  dispatch: () => null,
};

export const Context = createContext(INITIAL_STATE);

export const ContextProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, INITIAL_STATE);

  /* The `useEffect` hook is used to perform side effects in a functional component. In this case, it is used to save the `state.user` value to the `localStorage` whenever it changes. */
  useEffect(() => {
    if (state.user) {
      localStorage.setItem("user", JSON.stringify(state.user));
    } else {
      localStorage.removeItem("user"); // Clear user from localStorage if null
    }
  }, [state.user]);

  return (
    <Context.Provider
      value={{
        user: state.user,
        isLoading: state.isLoading,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </Context.Provider>
  );
};
