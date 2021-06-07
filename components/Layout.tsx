import Head from "next/head";
import React from "react";
import styled from "styled-components";
import Link from "next/link";

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
  return (
    <Wrapper>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description}></meta>
        <meta name="keywords" content={keywords}></meta>
      </Head>
      <div className="navbar">
        <nav>
          <h1>
            <Link href="/">VokApp</Link>
          </h1>
          <ul>
            <li>
              <Link href="/create">Hinzufügen</Link>
            </li>
            <li>
              <Link href="/profile">Mein Profil</Link>
            </li>
            <li>
              <Link href="/login">Login</Link>
            </li>
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
  h1 {
    text-shadow: 2px 2px var(--primary-400);
    margin: 0;
    a {
      color: var(--primary-100);
    }
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
      a {
        color: var(--primary-600);
      }
    }
  }
  .children-wrapper {
    width: 90%;
    max-width: 789px;
    margin: 1rem auto;
  }
`;

export default Layout;
