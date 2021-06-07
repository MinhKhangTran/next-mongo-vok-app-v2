import GlobalStyles from "@/styles/global-styles";
import { AppProps } from "next/dist/next-server/lib/router/router";
import NProgress from "nprogress";
import Router from "next/router";
import "@/styles/nprogress.css";

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyles />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
