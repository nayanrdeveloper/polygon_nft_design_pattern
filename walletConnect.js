import { action, computed, makeObservable, observable } from "mobx";
import Onboard from "@web3-onboard/core";
import injectedModule from "@web3-onboard/injected-wallets";
import { ethers } from "ethers";
// require('dotenv').config();

const injected = injectedModule();

const onboard = Onboard({
  wallets: [injected],
  chains: [
    {
      id: "0x13881",
      token: "MATIC",
      label: "Mumbai Polygon",
      rpcUrl: process.env.NEXT_PUBLIC_API_KEY,
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
  i18n: {
    en: {
      connect: {
        selectingWallet: {
          header: "Please one of this",
          sidebar: {
            heading: "Welcome to ColorSpy App",
            subheading: "Connections your wallet",
            paragraph:
              "ColorSpy are NFT marketplace for user create own design",
          },
        },
      },
      notify: {
        watched: {
          txConfirmed: "you paid a foo {formattedValue} {asset}!",
        },
      },
    },
  },
});

export class Web3Onboard {
  signer;
  constructor() {
    makeObservable(this, {
      connectWallet: action,
    });
  }

  async connectWallet() {
    const wallets = await onboard.connectWallet();
    const ethersProvider = new ethers.providers.Web3Provider(
      wallets[0].provider,
      "any"
    );
    const providerSigner = ethersProvider.getSigner();
    this.signer = providerSigner;
  }

  get getSigner() {
    return this.signer;
  }
}

export default new Web3Onboard();
