import Layout from "@/components/Layout";
import VokForm from "@/components/VokForm";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import React from "react";

const CreatePage = () => {
  return (
    <Layout title="VokApp | Hinzufügen">
      <VokForm />
    </Layout>
  );
};

export default CreatePage;
export const getServerSideProps = withPageAuthRequired();
