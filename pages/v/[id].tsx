import Card from "@/components/Card";
import Layout from "@/components/Layout";
import VokForm from "@/components/VokForm";
import { IVok } from "@/interfaces/Vok";
import { useUser, withPageAuthRequired } from "@auth0/nextjs-auth0";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import useSWR from "swr";

const VokDetailPage = () => {
  const router = useRouter();
  // console.log(id);

  const user = useUser();
  const { data, error }: { data?: IVok; error?: any } = useSWR(
    `/api/voks/${router.query.id}`
  );
  // console.log(data?.userId);
  // console.log(user.user?.sub);
  useEffect(() => {
    if (data?.userId !== user.user?.sub) {
      router.push("/");
    }
  }, [data]);

  if (error) return <Layout>Es gab ein Fehler</Layout>;
  if (!data) return <Layout>Lädt ...</Layout>;
  return (
    <Layout title={`VokApp | ${data?.koreanisch}`}>
      <VokForm vok={data} />
    </Layout>
  );
};

export default VokDetailPage;
export const getServerSideProps = withPageAuthRequired();
