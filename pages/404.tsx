import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Link from "next/link";
import Layout from "@/components/Layout";

export default function NotFound() {
  const router = useRouter();
  const [count, setCount] = useState(4);
  useEffect(() => {
    setTimeout(() => {
      router.push("/");
    }, 4000);
  }, []);
  useEffect(() => {
    const counter = setInterval(() => {
      setCount((oldValue) => {
        return oldValue - 1;
      });
    }, 1000);
    return () => clearInterval(counter);
  }, []);
  return (
    <Layout title="VokApp | ERROR">
      <div>
        <h1>404</h1>
        <p>Diese Seite gibt es (noch) nicht 🥲</p>
        <p>
          Du wirst gleich zur{" "}
          <span>
            <Link href="/">Homepage</Link>
          </span>{" "}
          zurückgeleitet ...{count}
        </p>
      </div>
    </Layout>
  );
}
