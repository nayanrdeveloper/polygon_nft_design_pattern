import "../styles/globals.css";
import type { AppProps } from "next/app";
import Navbar from "../components/Navbar/Navbar";
import Sidebar from "../components/Sidebar/Sidebar";
// import Footer from "../components/Footer/Footer";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div>
      <div className="md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden shadow-xl flex flex-wrap items-center justify-between relative md:w-60 z-10 py-4 px-6">
        <Sidebar />
      </div>
      <div className="relative md:ml-60">
        <Navbar />
        <Component {...pageProps} />
        {/* <Footer /> */}
      </div>
    </div>
  );
}

export default MyApp;
