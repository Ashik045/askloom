/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Context } from "@/Context/Context";
import styles from "@/styles/loginpage.module.scss";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { FaFacebook, FaGoogle } from "react-icons/fa";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessages, setErrorMessages] = useState<string[]>([]);
  const router = useRouter();

  const { dispatch } = useContext(Context);

  const handleLogin = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    dispatch({ type: "LOGIN_START" });

    // Perform client-side validation here

    try {
      const response = await axios.post(
        "https://askloom-api.onrender.com/api/auth/login/manual",
        { email, password }
      );
      setLoading(false);
      // console.log(response.data.user);

      if (response.data.user) {
        localStorage.setItem("jwttoken", response.data.token);

        // Dispatch the success action with user data
        dispatch({ type: "LOGIN_SUCCESS", payload: response.data.user });

        setPassword("");
        router.push("/");
      }

      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      setErrorMessages(error.response?.data.error);
      dispatch({ type: "LOGIN_FAILURE", payload: error.response.data.error });
    }
  };

  const googleLogin = async () => {
    try {
      // Dispatch loading state
      dispatch({ type: "LOGIN_START" });

      // Open Google login and wait for the redirect back to the app
      window.open("https://askloom-api.onrender.com/api/auth/google", "_self");

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
          "https://askloom-api.onrender.com/api/auth/login/success",
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

          router.push("/");

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

  return (
    <div className={styles.login_page}>
      <div className={styles.login_page_component}>
        <div className={styles.social_login}>
          <div className={styles.google_login} onClick={googleLogin}>
            <FaGoogle style={{ marginRight: "8px" }} />
            Log In With Google
          </div>

          <div
            className={styles.facebook_login}
            style={{ cursor: "not-allowed" }}
          >
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
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            placeholder="Password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />

          {errorMessages && (
            <p
              className={styles.f_errors}
              style={{ marginBottom: "-16px", marginTop: "5px", color: "red" }}
            >
              {errorMessages}
            </p>
          )}
          <button type="submit">{loading ? "Loading..." : "Submit"}</button>
        </form>

        <p className={styles.reg_p}>
          <Link href={"/registration"}>
            {" "}
            Don&apos;t have an account? Sign Up now.
          </Link>
        </p>
      </div>
    </div>
  );
}
