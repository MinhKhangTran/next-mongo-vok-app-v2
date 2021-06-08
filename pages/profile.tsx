import Layout from "@/components/Layout";
import { useUser } from "@auth0/nextjs-auth0";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import React from "react";

const ProfilePage = () => {
  const { user } = useUser();
  return (
    <Layout>
      <h1>hi {user?.name}</h1>
    </Layout>
  );
};

export default ProfilePage;
export const getServerSideProps = withPageAuthRequired();
