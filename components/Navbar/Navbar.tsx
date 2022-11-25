import React from "react";
import NavLogo from "./NavLogo";
import Link from "next/link";
// import walletConnect from "../../walletConnect";


function Navbar() {
    const onConnectWallet = () => {
        // walletConnect.connectWallet();
      };
  const navItems = [
    {
      name: "Home",
      to: "/",
    },
    {
      name: "About",
      to: "/about",
    },
    {
      name: "All NFT",
      to: "/getallnft",
    },
    {
      name: "My NFT",
      to: "/mynft",
    },
  ];
  return <nav className="flex justify-between py-3 border-b border-[#ffffff14] backdrop-blur-[9px] p-5">
  <ul className="flex my-auto ml-7">
    {navItems.map((item) => {
      return (
        <span key={item.name}>
          <Link href={item.to}>
            <li className="text-[#acacac] px-4 text-center py-1 cursor-pointer">
              {item.name}
            </li>
          </Link>
        </span>
      );
    })}
  </ul>
  <div className="my-auto flex">
    <button
      onClick={onConnectWallet}
      className="bg-[#212e48] py-2 px-2 rounded-xl text-white hover:bg-[#00a3ff]"
    >
      Connect Wallet
    </button>
  </div>
</nav>;
}

export default Navbar;
