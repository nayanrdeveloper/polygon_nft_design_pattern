import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import AOS from "aos";
import "aos/dist/aos.css";

function CrossDots() {
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);
  const router = useRouter();
  interface colorInputStruct {
    backgroundColor: string;
    lineColor: string;
    dotColor: string;
  }
  interface originalPropertyStruct {
    backgroundSize: string;
    backgroundPosition: string;
  }
  const [colorInputs, setColorInputs] = useState<colorInputStruct>({
    backgroundColor: "#ffffff",
    lineColor: "#a4a4a4",
    dotColor: "#000000",
  });
  const [originalProperty, setOriginalProperty] =
    useState<originalPropertyStruct>({
      backgroundSize:
        "109px 109px, 109px 109px,100% 6px, 109px 109px, 109px 109px",
      backgroundPosition: "54px 55px, 0px 0px, 0px 0px, 0px 0px, 0px 0px",
    });

  const [crossBackgroundColor, setCrossBackgroundColor] = useState<string>(
    `radial-gradient(${colorInputs.dotColor} 3px, transparent 4px),radial-gradient(${colorInputs.dotColor} 3px, transparent 4px),linear-gradient(${colorInputs.backgroundColor} 4px, transparent 0),linear-gradient(45deg, transparent 74px, transparent 75px, ${colorInputs.lineColor} 75px, ${colorInputs.lineColor} 76px, transparent 77px, transparent 109px),linear-gradient(-45deg, transparent 75px, transparent 76px, ${colorInputs.lineColor} 76px, ${colorInputs.lineColor} 77px, transparent 78px, transparent 109px)`
  );

  const onClickHandler = () => {
    navigator.clipboard.writeText(stringProperty);
  };

  const [stringProperty, setStringProperty] = useState<string>(
    `background-image:${crossBackgroundColor}; background-size: ${originalProperty.backgroundSize}; background-position: ${originalProperty.backgroundPosition};background-color: ${colorInputs.backgroundColor}}`
  );

  const updateStringProperty = () => {
    setStringProperty(
      `background-image : ${crossBackgroundColor}; background-size:109px 109px, 109px 109px,100% 6px, 109px 109px, 109px 109px; background-position: 54px 55px, 0px 0px, 0px 0px, 0px 0px, 0px 0px; background-color: ${colorInputs.backgroundColor}`
    );
  };

  const updateOriginalProperty = () => {
    setCrossBackgroundColor(
      `radial-gradient(${colorInputs.dotColor} 3px, transparent 4px),radial-gradient(${colorInputs.dotColor} 3px, transparent 4px),linear-gradient(${colorInputs.backgroundColor} 4px, transparent 0),linear-gradient(45deg, transparent 74px, transparent 75px, ${colorInputs.lineColor} 75px, ${colorInputs.lineColor} 76px, transparent 77px, transparent 109px),linear-gradient(-45deg, transparent 75px, transparent 76px, ${colorInputs.lineColor} 76px, ${colorInputs.lineColor} 77px, transparent 78px, transparent 109px)`
    );
  };

  const createNFT = () => {
    const property = {
      backgroundColor: colorInputs.backgroundColor,
      backgroundImage: crossBackgroundColor,
      backgroundSize: originalProperty.backgroundSize,
      backgroundPosition: originalProperty.backgroundPosition,
    };
    window.localStorage.setItem("gradient_color", JSON.stringify(property));
    router.push({
      pathname: `create_nft`,
    });
  };
  return (
    <div className="container px-5 py-10">
      <div className="fade-in-text">
        <div className="flex gap-4 md:gap-2 flex-wrap">
          <div
            className="flex flex-col gap-2 justify-items-center"
            data-aos="fade-right"
          >
            <div className="flex justify-items-center justify-between">
              <label htmlFor="gradient-type" className="mr-2 text-gray-500">
                Background-color:
              </label>
              <input
                type={"color"}
                className="input-border"
                value={colorInputs.backgroundColor}
                onChange={(e) => {
                  updateOriginalProperty();
                  updateStringProperty();
                  setColorInputs({
                    ...colorInputs,
                    backgroundColor: e.currentTarget.value,
                  });
                }}
              />
            </div>
            <div className="flex justify-items-center justify-between">
              <label htmlFor="gradient-type" className="mr-2 text-gray-500">
                Dot Color:
              </label>
              <input
                type={"color"}
                className="input-border"
                value={colorInputs.dotColor}
                onChange={(e) => {
                  updateOriginalProperty();
                  updateStringProperty();
                  setColorInputs({
                    ...colorInputs,
                    dotColor: e.currentTarget.value,
                  });
                }}
              />
            </div>
            <div className="flex justify-items-center justify-between">
              <label htmlFor="gradient-type" className="mr-2 text-gray-500">
                Line Color:
              </label>
              <input
                type={"color"}
                className="input-border"
                value={colorInputs.lineColor}
                onChange={(e) => {
                  updateOriginalProperty();
                  updateStringProperty();
                  setColorInputs({
                    ...colorInputs,
                    lineColor: e.currentTarget.value,
                  });
                }}
              />
            </div>
            <button
              onClick={createNFT}
              className="hover:bg-[#212e48] w-40 py-2 px-2 rounded-xl text-white bg-[#00a3ff] duration-300"
            >
              Create NFT
            </button>
          </div>
          <div>
            <div
              data-aos="fade-left"
              className="flex border border-black gradient-preview w-44 h-44 md:w-96 md:h-96 md:ml-52"
              style={{
                backgroundColor: colorInputs.backgroundColor,
                backgroundImage: crossBackgroundColor,
                backgroundSize: originalProperty.backgroundSize,
                backgroundPosition: originalProperty.backgroundPosition,
              }}
              onClick={onClickHandler}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CrossDots;
