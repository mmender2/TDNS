// Import required modules from React and other libraries
import React, { useEffect, useState } from "react";
import { useEthers } from "@usedapp/core";
import { Alchemy, Network, NftSaleMarketplace } from "alchemy-sdk";

// Define a component called "Account"
const Account = () => {
  // Get the connected account using the "useEthers" hook from "@usedapp/core"
  const { account } = useEthers();

  // Define a configuration object for the Alchemy SDK
  const config = {
    apiKey: "VtnN1OT-RIJ6NtmzCvMg7fUTKPpXrSrq", // Replace with your own Alchemy API key
    network: Network.MATIC_MUMBAI, // Use the Polygon Mumbai testnet
  };

  // Initialize a new instance of the Alchemy SDK with the configuration object
  const alchemy = new Alchemy(config);

  // Set the wallet address as a string using the connected account
  const walletAddress: string = `${account}`;

  // Set the contract address of the TNS (The Nifty Store) smart contract
  const tnsContractAddress = "0xb1c52655d6d17Dd3ADb6636bD805B029093F0d74"; // replace with tns contract address

  // Define a component called "GetNft" that takes a wallet address and TNS contract address as props
  const GetNft = ({ walletAddress }: { walletAddress: string; tnsContractAddress: string }) => {
    // Define a state variable "nftRet" that will hold an array of NFT titles
    const [nftRet, setNftRet] = useState<string[]>([]);

    // Use the "useEffect" hook to asynchronously get the NFTs owned by the wallet address and update the state variable
    useEffect(() => {
      const getNfts = async () => {
        const nfts = await alchemy.nft.getNftsForOwner(walletAddress, {
          contractAddresses: [tnsContractAddress],
        });
        const nftList = nfts["ownedNfts"];

        const titles = nftList.map((nft) => nft.title);
        setNftRet(titles);
      };

      getNfts();
    }, [walletAddress, tnsContractAddress]);

    // Render the NFT titles as a comma-separated string
    return <>{nftRet.join(", ")}</>;
  };

  // Define a main function that asynchronously gets the NFTs owned by the wallet address and logs them to the console
  const main = async () => {
    // Check if the code is running in a browser window
    if (typeof window === "undefined") {
      const nfts = await alchemy.nft.getNftsForOwner(walletAddress, {
        contractAddresses: [tnsContractAddress],
      });

      // Parse output
      const numNfts = nfts["totalCount"];
      const nftList = nfts["ownedNfts"];
      console.log(`Total NFTs owned by ${account}: ${numNfts} \n`);

      let i = 1;

      for (let nft of nftList) {
        console.log(`${i}. ${nft.title}`);
        i++;
      }
    }
  };

  // Define a function called "runMain" that executes the main function and handles any errors
  const runMain = async () => {
    try {
      await main();
      process.exit?.(0);
    } catch (error) {
        console.log(error);
        process.exit?.(1);
      }
    };
  
    runMain();
  
    return (
      <>
        <p
          style={{
            width: 600,
            position: "absolute",
            marginTop: 400,
            marginLeft: 135,
            verticalAlign: "middle",
            justifyContent: "center",
          }}
        >
          Account: {account}
        </p>
        <p
          style={{
            width: 600,
            position: "absolute",
            marginTop: 500,
            marginLeft: 135,
            verticalAlign: "middle",
            justifyContent: "center",
          }}
        >
          NFTs: <GetNft walletAddress={walletAddress} tnsContractAddress={tnsContractAddress} />
        </p>
      </>
    );
  };
  
  export default Account;
  
