import React from "react";
import NavLogo from "./NavLogo";
import Link from "next/link";
import Onboard from "@web3-onboard/core";
import injectedModule from "@web3-onboard/injected-wallets";
import { ethers } from "ethers";
// import walletConnect from "../../walletConnect";


function Navbar() {
const injected = injectedModule();
  const onboard = Onboard({
    wallets: [injected],
    chains: [
      {
        id: "0x13881",
        token: "MATIC",
        label: "Mumbai Polygon",
        rpcUrl: process.env.NEXT_PUBLIC_API_KEY || "",
      },
    ],
    appMetadata: {
      name: "ColorSpy",
      icon: "/logo-no-background.ico",
      logo: "/logo-color.png",
      description: "ColorSpy Wallet Network",
      agreement: {
        version: "1.0.0",
        termsUrl: "https://www.google.com",
        privacyUrl: "https://www.yahoo.com",
      },
      recommendedInjectedWallets: [
        { name: "Coinbase", url: "https://wallet.coinbase.com/" },
        { name: "MetaMask", url: "https://metamask.io" },
      ],
    },
    // i18n: {
    //   en: {
    //     connect: {
    //         selectingWallet: {
    //             header: "Available Wallets",
    //             sidebar: {
    //               heading: "Get Started",
    //               subheading: "Connect your wallet",
    //               paragraph: "Connecting your wallet is like “logging in” to Web3. Select your wallet from the options to get started."
    //             },
    //             recommendedWalletsPart1: "{app} only supports",
    //             recommendedWalletsPart2: "on this platform. Please use or install one of the supported wallets to continue",
    //             installWallet: "You do not have any wallets installed that {app} supports, please use a supported wallet",
    //             agreement: {
    //               agree: "I agree to the",
    //               terms: "Terms & Conditions",
    //               and: "and",
    //               privacy: "Privacy Policy"
    //             },
    //           },
    //   },
    // },
  });
  const onConnectWallet = async () => {
    // walletConnect.connectWallet();
    const wallets = await onboard.connectWallet();
    const ethersProvider = new ethers.providers.Web3Provider(
      wallets[0].provider,
      "any"
    );
    const providerSigner = ethersProvider.getSigner();
    const signer = providerSigner;
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
        <button
          onClick={onConnectWallet}
          className="bg-[#212e48] py-2 px-2 rounded-xl text-white hover:bg-[#00a3ff]"
        >
          Connect Wallet
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
