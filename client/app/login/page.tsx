/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Context } from "@/Context/Context";
import styles from "@/styles/loginpage.module.scss";
import { useContext, useEffect, useState } from "react";
import { FaFacebook, FaGoogle } from "react-icons/fa";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [user, setUser] = useState(null);

  const { dispatch } = useContext(Context);

  const handleLogin = async (e: any) => {
    e.preventDefault();
    // Perform client-side validation here

    // Send login request to the server API route
    const res = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      // Handle successful login
    } else {
      // Handle error
    }
  };

  const googleLogin = async () => {
    try {
      // Dispatch loading state
      dispatch({ type: "LOGIN_START" });

      // Open Google login and wait for the redirect back to the app
      window.open("http://localhost:4000/api/auth/google", "_self");

      // Wait for the redirection to complete, then check the login success
    } catch (error: unknown) {
      let errorMessage = "An unknown error occurred.";

      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (typeof error === "string") {
        errorMessage = error;
      }

      dispatch({ type: "LOGIN_FAILURE", payload: errorMessage });
    }
  };

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await fetch(
          "http://localhost:4000/api/auth/login/success",
          {
            method: "GET",
            credentials: "include",
          }
        );

        if (response.ok) {
          const data = await response.json();
          const { user, token } = data;

          // Store the JWT token in localStorage
          localStorage.setItem("jwttoken", token);
          localStorage.setItem("user", JSON.stringify(user));

          // Dispatch the success action with user data
          dispatch({ type: "LOGIN_SUCCESS", payload: user });
        } else {
          dispatch({ type: "LOGIN_FAILURE", payload: "Login failed!" });
        }
      } catch (error) {
        dispatch({ type: "LOGIN_FAILURE", payload: "An error occurred." });
      }
    };

    // Call the checkLoginStatus function when the component mounts or when user changes
    checkLoginStatus();
  }, []); // Make sure to add dependencies as necessary

  // const googleLogin = async () => {
  //   try {
  //     // Dispatch loading state
  //     dispatch({ type: "LOGIN_START" });

  //     // Open Google login and wait for the redirect back to the app
  //     window.open("http://localhost:4000/api/auth/google", "_self");

  //     // Use an API request to check the login success
  //     const response = await fetch(
  //       "http://localhost:4000/api/auth/login/success",
  //       {
  //         method: "GET",
  //         credentials: "include", // Include cookies for session handling
  //       }
  //     );

  //     console.log(await response.json());

  //     if (response.ok) {
  //       const data = await response.json();
  //       const { user } = data;

  //       setUser(user);

  //       // Store the JWT token in localStorage
  //       localStorage.setItem("jwttoken", data.token);
  //       localStorage.setItem("user", JSON.stringify(user));

  //       // Dispatch the success action with user data
  //       dispatch({ type: "LOGIN_SUCCESS", payload: user });
  //     } else {
  //       // If login fails, dispatch error
  //       dispatch({ type: "LOGIN_FAILURE", payload: "Login failed!" });
  //     }
  //   } catch (error: unknown) {
  //     let errorMessage = "An unknown error occurred.";

  //     if (error instanceof Error) {
  //       errorMessage = error.message;
  //     } else if (typeof error === "string") {
  //       errorMessage = error;
  //     }

  //     dispatch({ type: "LOGIN_FAILURE", payload: errorMessage });
  //   }
  // };

  // console.log(user);

  return (
    <div className={styles.login_page}>
      <div className={styles.login_page_component}>
        <div className={styles.social_login}>
          <div className={styles.google_login} onClick={googleLogin}>
            <FaGoogle style={{ marginRight: "8px" }} />
            Log In With Google
          </div>

          <div className={styles.facebook_login}>
            {" "}
            <FaFacebook style={{ marginRight: "8px" }} />
            Log In With Facebook
          </div>
        </div>

        <p className={styles.s_or_e}>or</p>
        <form onSubmit={handleLogin} className={styles.login_form}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            placeholder="Email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}
