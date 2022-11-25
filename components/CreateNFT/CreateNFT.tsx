import React, { useEffect, useRef, useState } from "react";
import { NFTStorage, File } from "nft.storage";
import html2canvas from "html2canvas";
import { ethers } from "ethers";
import { ColorRing } from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import tokenAbi from "../../contractData/myToken";
import marketplaceAbi from "../../contractData/marketplaceAbi";

declare var window: any;

function CreateNFT() {
  interface productDataStruct {
    name: string;
    price: any;
    desc: string;
  }
  const [productData, setProductData] = useState<productDataStruct>({
    name: "",
    price: 0,
    desc: "",
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const refContainer = useRef() as React.MutableRefObject<HTMLDivElement>;
  const [colorName, setColorName] = useState<string | null>();
  useEffect(() => {
    if (typeof window !== "undefined") {
      setColorName(window.localStorage.getItem("gradient_color"));
    }
  }, []);

  const createImage = async () => {
    let canvas = await html2canvas(refContainer.current),
      data = canvas.toDataURL("image/png"),
      link = document.createElement("a");
    let myImage = document.createElement("image");
    const myFile = await createImageFile(data, "gradient_color", "image/png");
    console.log(myFile);
    return myFile;
  };

  const createImageFile = async (
    url: string,
    fileName: string,
    mimeType: string
  ) => {
    const res = await fetch(url);
    const buf = await res.arrayBuffer();
    return new File([buf], fileName, { type: mimeType });
  };

  const onchangeProductInput = (
    event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setProductData({
      ...productData,
      [(event.target as HTMLInputElement | HTMLTextAreaElement).name]: (
        event.target as HTMLInputElement | HTMLTextAreaElement
      ).value,
    });
  };

  const createNewNFT = async () => {
    // event.preventDefault();
    try {
      if (!productData.price || !productData.desc || !productData.name){
        toast.error("All fields are required", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
      setIsLoading(true);
      const nftStorage = new NFTStorage({
        token: process.env.NEXT_PUBLIC_NFT_STORAGE_KEY || "",
      });
      const link = await nftStorage.store({
        image: await createImage(),
        name: productData.name,
        description: productData.desc,
        price: productData.price,
      });
      const ipfsURL = `https://ipfs.io/ipfs/${link.url.substr(7)}`;
      toast.info("Please wait for mint your NFT", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer =await provider.getSigner();
      console.log(signer);
      
      let tokenContract = new ethers.Contract(
        process.env.NEXT_PUBLIC_NFTTOKN_CONTRACT_ADDRESS || "",
        tokenAbi,
        signer
      );
      let traction = await tokenContract.createToken(ipfsURL);
      let tx = await traction.wait();
      let event = tx.events[0];
      let value = event.args[2];
      let tokenId = value.toNumber();

      const NFTMarketplaceContract = new ethers.Contract(
        process.env.NEXT_PUBLIC_MARKETPLACE_CONTRACT_ADDRESS || "",
        marketplaceAbi,
        signer
      );
      const price = await ethers.utils.parseUnits(productData.price, "ether");
      let listingPrice = await NFTMarketplaceContract.getListedPrice();
      let newlistingPrice = await listingPrice.toString();
      let NFTTranction = await NFTMarketplaceContract.createToken(
        process.env.NEXT_PUBLIC_NFTTOKN_CONTRACT_ADDRESS,
        tokenId,
        price,
        {
          value: newlistingPrice,
        }
      );
      await NFTTranction.wait();
      console.log(NFTTranction);

      setIsLoading(false);
      toast.success("NFT mint Successfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setProductData({
        price: 0,
        name: "",
        desc: "",
      });
    } catch (error: any) {
      toast.error(error.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };
  return (
    <div className="container px-5 py-10">
      <ToastContainer theme="dark" />
      <div className="flex gap-2">
        <div className="flex flex-col border border-[#ffffff14] p-10 bg-[#24243557] rounded-lg gap-4 w-full">
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="text-[#acacac]">
              NFT Name
            </label>
            <input
              type="text"
              onChange={onchangeProductInput}
              name="name"
              value={productData.name}
              required
              id="name"
              placeholder=" e.g. Digital Awesome NFT"
              className="input-border w-full"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="desc" className="text-[#acacac]">
              Description
            </label>
            <textarea
              id="desc"
              onChange={onchangeProductInput}
              value={productData.desc}
              name="desc"
              placeholder=" Enter NFT Description"
              className="h-36 w-full bg-[#242435] border-2 border-[#ffffff14] text-white rounded-md focus:border focus:border-[#00a3ff]"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="price" className="text-[#acacac]">
              NFT Price
            </label>
            <input
              type="number"
              onChange={(e) =>
                setProductData({ ...productData, price: e.currentTarget.value })
              }
              value={productData.price}
              id="price"
              name="price"
              placeholder=" e.g. 20"
              className="h-12 w-full bg-[#242435] border-2 border-[#ffffff14] text-white rounded-md focus:border focus:border-[#00a3ff]"
            />
          </div>
          <button
            onClick={createNewNFT}
            disabled={isLoading}
            className="bg-[#212e48] py-2 px-2 rounded-xl text-white hover:bg-[#00a3ff]"
          >
            <span className="flex gap-2 justify-center justify-items-center">
              {isLoading && (
                <ColorRing
                  visible={true}
                  height="30"
                  width="30"
                  ariaLabel="blocks-loading"
                  wrapperStyle={{}}
                  wrapperClass="blocks-wrapper"
                  colors={[
                    "#e15b64",
                    "#f47e60",
                    "#f8b26a",
                    "#abbd81",
                    "#849b87",
                  ]}
                />
              )}
              <span>Create NFT</span>
            </span>
          </button>
        </div>
        <div>
          <div
            className="flex border border-black gradient-preview w-44 h-44 md:w-96 md:h-96 ml-10"
            style={colorName ? JSON.parse(colorName) : {}}
            ref={refContainer}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default CreateNFT;
