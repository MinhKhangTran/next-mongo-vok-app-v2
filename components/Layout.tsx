import Head from "next/head";
import React from "react";
import styled from "styled-components";
import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0";
import { useRouter } from "next/router";

const Layout = ({
  children,
  title = "VokApp",
  description = "a simple app to add vocabularies",
  keywords = "korean, german",
}: {
  children: React.ReactNode;
  title?: string;
  description?: string;
  keywords?: string;
}) => {
  const { user } = useUser();
  // console.log(user, error, isLoading);
  const router = useRouter();
  // console.log(router.pathname);

  return (
    <Wrapper>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description}></meta>
        <meta name="keywords" content={keywords}></meta>
      </Head>
      <div className="navbar">
        <nav className="large">
          <h1>
            <Link href="/">VokApp</Link>
          </h1>
          <ul>
            {user && (
              <>
                <li>
                  <Link href="/create">
                    <a
                      className={router.pathname === "/create" ? "active" : ""}
                    >
                      Hinzufügen
                    </a>
                  </Link>
                </li>
                {/* <li>
                  <Link href="/profile">
                    <a
                      className={router.pathname === "/profile" ? "active" : ""}
                    >
                      Mein Profil
                    </a>
                  </Link>
                </li> */}
              </>
            )}

            {!user && (
              <button className="auth-btn">
                <Link href="/api/auth/login">Login</Link>
              </button>
            )}

            {user && (
              <button className="auth-btn">
                <Link href="/api/auth/logout">Logout</Link>
              </button>
            )}
          </ul>
        </nav>
        {/* Mobile */}
        <nav className="small">
          <h1>
            <Link href="/">VokApp</Link>
          </h1>
          <ul>
            {user && (
              <>
                <li>
                  <Link href="/create">
                    <a
                      className={router.pathname === "/create" ? "active" : ""}
                    >
                      Hinzufügen
                    </a>
                  </Link>
                </li>
                {/* <li>
                  <Link href="/profile">
                    <a
                      className={router.pathname === "/profile" ? "active" : ""}
                    >
                      Mein Profil
                    </a>
                  </Link>
                </li> */}
              </>
            )}

            {!user && (
              <button className="auth-btn">
                <Link href="/api/auth/login">Login</Link>
              </button>
            )}

            {user && (
              <button className="auth-btn">
                <Link href="/api/auth/logout">Logout</Link>
              </button>
            )}
          </ul>
        </nav>
      </div>
      <div className="children-wrapper">{children}</div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .navbar {
    background: var(--primary-300);
  }
  nav {
    width: 90%;
    max-width: 789px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.25rem;
  }
  .auth-btn {
    padding: 0.35rem 1.25rem;
    border-radius: 50px;
    border: none;
    background-color: var(--primary-600);
    transition: all 0.5s;
    /* margin-left: 1rem; */
    a {
      color: var(--primary-50);
    }
    &:hover {
      background-color: var(--primary-500);
    }
  }
  h1 {
    text-shadow: 2px 2px var(--primary-400);
    margin: 0;
    a {
      color: var(--primary-100);
    }
  }
  a {
    color: var(--primary-600);
  }
  .active {
    color: var(--primary-50);
  }

  ul {
    display: flex;
    justify-content: space-between;
    li {
      margin: 0 1rem;
      cursor: pointer;
      transition: all 0.5s;
      position: relative;
      overflow: hidden;

      &:before {
        content: "";
        position: absolute;
        bottom: 0;
        transform: translateX(-100%);
        width: 100%;
        height: 2px;
        background: var(--primary-600);
        transition: all 0.5s;
      }

      &:hover {
        color: var(--primary-700);
        &:before {
          transform: translateX(0%);
        }
      }
    }
  }
  .children-wrapper {
    width: 90%;
    max-width: 789px;
    margin: 1rem auto;
  }
  .small {
    display: none;
  }

  @media (max-width: 768px) {
    .large {
      display: none;
    }
    .small {
      display: flex;
      flex-direction: column;
      ul {
        margin: 1.25rem 0rem;
        font-size: 1.25rem;
      }
    }
  }
`;

export default Layout;
