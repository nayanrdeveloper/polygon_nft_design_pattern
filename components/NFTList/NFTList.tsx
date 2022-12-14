import React, { useEffect, useState } from "react";
import Loader from "../Loader/Loader";
import NFTCard from "./NFTCard";
import { ethers } from "ethers";
import axios from "axios";
// import connectWallet from "../../walletConnect";
import tokenAbi from "../../contractData/myToken";
import marketplaceAbi from "../../contractData/marketplaceAbi";
import { RotatingLines } from "react-loader-spinner";
// import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

declare var window: any;

function NFTList() {
  const [NFTData, setNFTData] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const getItems = async () => {
    setIsLoading(true);
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = await provider.getSigner();
    try {
      // await connectWallet.connectWallet();
      let marketplaceContract = new ethers.Contract(
        process.env.NEXT_PUBLIC_MARKETPLACE_CONTRACT_ADDRESS || "",
        marketplaceAbi,
        signer
      );
      let tokenContract = new ethers.Contract(
        process.env.NEXT_PUBLIC_NFTTOKN_CONTRACT_ADDRESS || "",
        tokenAbi,
        signer
      );
      const data = await marketplaceContract.getAllNFTs();
      console.log(data);

      // const data1 = await marketplaceContract.idToListedToken;
      // console.log(await marketplaceContract.getMyNfts());

      let newItems = await Promise.all(
        data.map(async (d: any) => {
          const tokenUri = await tokenContract.tokenURI(d._tokenId);
          console.log(tokenUri);
          const meta = await axios.get(tokenUri);
          const price = ethers.utils.formatUnits(d.price.toString(), "ether");
          const imageUrl = `https://ipfs.io/ipfs/${meta.data.image.substr(7)}`;
          return {
            price,
            tokenId: d._tokenId.toNumber(),
            seller: d.seller,
            owner: d.owner,
            image: imageUrl,
            name: meta.data.name,
            desc: meta.data.description,
          };
          // const tokenUri = await contract.tokenURI(d.tokenId);
        })
      );
      setNFTData(newItems);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getItems();
  }, []);

  return (
    <div className="container my-8">
      <div className="">
        <span className="text-white text-3xl font-bold">All NFT</span>
        <div>
          <div className={`grid ${NFTData ? "grid-cols-3" : ""} gap-9 mt-8`}>
            {NFTData ? (
              NFTData.map((NFTCardData: any) => {
                return <NFTCard key={NFTCardData.tokenId} {...NFTCardData} />;
              })
            ) : (
              <div className="flex justify-center my-auto">
              <RotatingLines
                strokeColor="grey"
                strokeWidth="5"
                animationDuration="0.75"
                width="96"
                visible={true}
              />
              </div>
            )}
            {/* {NFTCardList.map((NFTCardData) => {
              return <NFTCard key={NFTCardData.title} data={NFTCardData} />;
            })} */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default NFTList;
