import React, { useState } from "react";
import NavLogo from "./NavLogo";
import Link from "next/link";
import Onboard from "@web3-onboard/core";
import injectedModule from "@web3-onboard/injected-wallets";
import { ethers } from "ethers";

declare var window: any;

function Navbar() {
  const [address, setAddress] = useState<string>("");

  const onConnectWallet = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const address = await provider.send("eth_requestAccounts", []);
    setAddress(address[0]);
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
  return (
    <nav className="flex justify-between py-3 border-b border-[#ffffff14] backdrop-blur-[9px] p-5">
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
        {address ? (
          <div className="bg-[#212e48] py-2 px-2 rounded-xl text-white hover:bg-[#00a3ff]">{address}</div>
        ) : (
          <button
            onClick={onConnectWallet}
            className="bg-[#212e48] py-2 px-2 rounded-xl text-white hover:bg-[#00a3ff]"
          >
            Connect Wallet
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
