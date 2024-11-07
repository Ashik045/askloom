"use client"; //

/* eslint-disable @typescript-eslint/no-explicit-any */
// import { Context } from "Context/Context";
import { Context } from "@/Context/Context";
import noPhoto from "@/public/images/no-photo.png";
import { useTag } from "@/TagContext/TagContext";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { BiMenu, BiX } from "react-icons/bi";
import styles from "./navbar.module.scss";

const Navbar = () => {
  const [toggler, setToggler] = useState(false);
  const [inpVal, setInpVal] = useState("");
  // const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  const { user, dispatch } = useContext(Context);
  const { setTagVal } = useTag();
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  const handleLogout = () => {
    if (user?.googleId) {
      window.open(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/auth/logout`,
        "_self"
      );
    }

    dispatch({ type: "LOGOUT" });

    localStorage.removeItem("jwttoken");
  };

  const handleChange = (e: any) => {
    setInpVal(e.target.value);
  };

  // search and get data
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      // const questions = await getAllQuestions(inpVal);
      // console.log(questions);
      router.push(`/questions?search=${inpVal}`);
    } catch (error) {
      console.log(error);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  };

  return (
    <div className={styles.navbar}>
      <div className={styles.navbar_main}>
        <div className={styles.nav_brand} onClick={() => setTagVal("")}>
          <Link href="/" style={{ textDecoration: "none", color: "black" }}>
            <h5>AskLoom</h5>
          </Link>
        </div>

        <div className={styles.nav_right}>
          <div className={styles.nav_menu_item}>
            <Link href="/questions" style={{ textDecoration: "none" }}>
              <p onClick={() => setTagVal("")}>Questions</p>
            </Link>
            <Link href="/createquestion" style={{ textDecoration: "none" }}>
              <p>ask question</p>
            </Link>
          </div>

          <div className={styles.nav_menu}>
            <div className={styles.search}>
              <form className={styles.search_form}>
                <input
                  type="text"
                  placeholder="Search Questions.."
                  value={inpVal}
                  onChange={handleChange}
                  onKeyDown={handleKeyDown}
                />

                <button
                  type="button"
                  onClick={handleSubmit}
                  className={styles.submit_btn}
                >
                  Ask
                </button>
              </form>
            </div>

            {user ? (
              <div className={styles.nav_menu_user}>
                <div className={styles.login_user}>
                  <Link href={`/profile/${user._id}`}>
                    <Image
                      className={styles.profilePic}
                      src={user.photoUrl ? user.photoUrl : noPhoto}
                      height={35}
                      width={35}
                      alt="askloom profile"
                    />
                  </Link>
                </div>
                <p className={styles.username}>
                  <Link
                    href={`/profile/${user._id}`}
                    style={{ textDecoration: "none" }}
                  >
                    {user.displayName}
                  </Link>
                </p>
                <span onClick={handleLogout} style={{ cursor: "pointer" }}>
                  Log out
                </span>
              </div>
            ) : (
              <div className={styles.sign_in}>
                <Link href="/login" style={{ textDecoration: "none" }}>
                  Sign In /{" "}
                </Link>
                <Link href="/registration" style={{ textDecoration: "none" }}>
                  Sign Up
                </Link>
              </div>
            )}
          </div>

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
                  <Link href="/questions" style={{ textDecoration: "none" }}>
                    <p onClick={() => setToggler(false)}>Questions</p>
                  </Link>

                  <Link
                    href="/createquestion"
                    style={{ textDecoration: "none" }}
                  >
                    <p onClick={() => setToggler(false)}>ask question</p>
                  </Link>

                  {user ? (
                    <div
                      className={styles.res_nav_menu_user}
                      onClick={() => setToggler(false)}
                    >
                      <div className={styles.login_user}>
                        <Link href={`/profile/${user._id}`}>
                          <Image
                            className={styles.profilePic}
                            src={user.photoUrl ? user.photoUrl : noPhoto}
                            height={30}
                            width={30}
                            alt="askloom profile"
                          />
                        </Link>
                      </div>
                      <p className={styles.username}>
                        <Link
                          href={`/profile/${user._id}`}
                          style={{ textDecoration: "none" }}
                        >
                          {user.displayName}
                        </Link>
                      </p>
                      <span
                        onClick={handleLogout}
                        style={{ cursor: "pointer" }}
                      >
                        Log out
                      </span>
                    </div>
                  ) : (
                    <div
                      className={styles.res_sign_in}
                      onClick={() => setToggler(false)}
                    >
                      <Link href="/login" style={{ textDecoration: "none" }}>
                        Sign In /{" "}
                      </Link>
                      <Link
                        href="/registration"
                        style={{ textDecoration: "none" }}
                      >
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
