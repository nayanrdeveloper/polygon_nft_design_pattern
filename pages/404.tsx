import Link from "next/link";
import React from "react";

function ErrorPage() {
  return (
    <div className="flex flex-col text-center gap-7 py-20">
      <h4 className="text-8xl font-bold text-[#65676b]">404</h4>
      <p className="text-6xl text-white font-semibold">Page not found!</p>
      <p className="text-[#acacac]">
        The page you are looking for not available.
      </p>
      <Link href={"/"}>
        <button className="p-3 text-white bg-[#00a3ff] w-40 mx-auto rounded-md duration-300 hover:bg-[#212e48]">
          Go back to Home
        </button>
      </Link>
    </div>
  );
}

export default ErrorPage;
