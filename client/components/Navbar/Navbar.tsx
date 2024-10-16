"use client"; //

/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
// import { Context } from "Context/Context";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BiMenu, BiX } from "react-icons/bi";
import styles from "./navbar.module.scss";

const Navbar = () => {
  const [toggler, setToggler] = useState(false);
  const [inpVal, setInpVal] = useState("");
  const [selectVal, setSelectVal] = useState("");
  // const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = () => {
      fetch("http://localhost:4000/api/auth/login/success", {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": "true",
        },
      })
        .then((response) => {
          if (response.status === 200) return response.json();
          throw new Error("Authentication failed!");
        })
        .then((resObject) => {
          setUser(resObject);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    getUser();
  }, []);

  console.log(user);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  // const { user, dispatch } = useContext(Context);

  // navigate to login page
  const handleClick = () => {
    // router.push("/login");
    setToggler(false);
  };

  // The handleLogout function logs the user out by dispatching a logout action, redirecting to the home page, removing the JWT token from local storage, and logging a message to the console
  // user logout function.
  // const handleLogout = () => {
  //   dispatch({ type: "LOGOUT" });
  //   router.push("/");
  //   // set the JWT token to null
  //   localStorage.removeItem("jwtToken");
  //   console.log("logged out");
  // };

  const handleLogout = () => {
    window.open("http://localhost4000/api/auth/logout", "_self");
  }; // 1:06m

  const handleChange = (e: any) => {
    setInpVal(e.target.value);
  };

  // search and get data
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      // router.push({
      //   pathname: selectVal === "users" ? "users" : "/",
      //   query: { search: inpVal },
      // });
      // console.log("input:" + inpVal, selectVal === "users" ? "users" : "posts");
    } catch (error) {
      console.log(error);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  };

  const handleClose = () => {
    setInpVal("");
    //   dispatchh({ type: 'SEARCH_CLEAR' })
  };

  return (
    <div className={styles.navbar}>
      <div className={styles.navbar_main}>
        <div className={styles.nav_brand}>
          <Link href="/" style={{ textDecoration: "none", color: "black" }}>
            <h5>AskLoom</h5>
          </Link>
        </div>

        <div className={styles.nav_right}>
          <div className={styles.search}>
            <form onSubmit={handleSubmit} className={styles.search_form}>
              <input
                type="text"
                placeholder="Search Questions.."
                value={inpVal}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
              />

              <button type="button" className={styles.submit_btn}>
                Ask
              </button>
            </form>
          </div>

          <div className={styles.nav_menu}>
            <Link href="/" style={{ textDecoration: "none" }}>
              <p>Questions</p>
            </Link>
            <Link href="/post" style={{ textDecoration: "none" }}>
              <p>ask question</p>
            </Link>

            {user ? (
              <p>
                profile{" "}
                <span onClick={handleLogout} style={{ cursor: "pointer" }}>
                  Log out
                </span>{" "}
              </p>
            ) : (
              <div className={styles.sign_in}>
                <Link href="/login" style={{ textDecoration: "none" }}>
                  Sign In /
                </Link>
                <Link href="/login" style={{ textDecoration: "none" }}>
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* show popup(logour, view profile) on mousehover */}
          {/* <div className={styles.nav_reg}>
            {user ? (
              <>
                <div className={styles.nav_regg}>
                  <Image
                    className={styles.profilePic}
                    src={user.profilePicture ? user.profilePicture : noPhoto}
                    height={35}
                    width={35}
                    alt="user profile"
                  />
                  <div className={styles.username}>{user?.username}</div>
                  <div className={styles.user_popup}>
                    <Link
                      href={`/user/${user.username}`}
                      style={{ textDecoration: "none" }}
                    >
                      <p>View Profile</p>
                    </Link>
                    <p >Log Out</p>
                  </div>
                </div>
              </>
            ) : (
              <button type="button" onClick={handleClick}>
                Log in
              </button>
            )}
          </div> */}

          {/* for responsive device */}
          <div className={styles.res_navbar}>
            {toggler ? (
              <BiX
                size={29}
                onClick={() => setToggler(false)}
                className={styles.res_nav_iconn}
              />
            ) : (
              <BiMenu
                size={29}
                onClick={() => setToggler(true)}
                className={styles.res_nav_iconn}
              />
            )}
            {toggler && (
              <div className={styles.res_nav_menu}>
                <div className={styles.res_nav_menuu}>
                  <Link href="/" style={{ textDecoration: "none" }}>
                    <p onClick={() => setToggler(false)}>Questions</p>
                  </Link>

                  <Link href="/post" style={{ textDecoration: "none" }}>
                    <p onClick={() => setToggler(false)}>ask question</p>
                  </Link>

                  {/* {user && (
                    <Link
                      href={`/user/${user.username}`}
                      style={{ textDecoration: "none" }}
                    >
                      <p onClick={() => setToggler(false)}>Profile</p>
                    </Link>
                  )} */}

                  {user ? (
                    <Link href={`/users`} style={{ textDecoration: "none" }}>
                      <p>profile</p>
                    </Link>
                  ) : (
                    <div className={styles.res_sign_in}>
                      <Link href="/login" style={{ textDecoration: "none" }}>
                        Sign In /
                      </Link>
                      <Link href="/login" style={{ textDecoration: "none" }}>
                        Sign Up
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
