/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import styles from "@/styles/loginpage.module.scss";
import { useState } from "react";
import { FaFacebook, FaGoogle } from "react-icons/fa";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
  return (
    <div className={styles.login_page}>
      <div className={styles.login_page_component}>
        <div className={styles.social_login}>
          <div className={styles.google_login}>
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
