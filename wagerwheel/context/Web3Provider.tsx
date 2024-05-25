'use client'
import { ReactNode, useEffect, useState } from "react";
import Web3Context from "./web3-context";
import Web3 from "web3";
import Message from "../../build/contracts/Message.json";
import HDWalletProvider from "@truffle/hdwallet-provider";

interface Web3ProviderProps {
children: ReactNode;
}

export default function Web3Provider({ children }: Web3ProviderProps) {
    const [web3, setWeb3] = useState<Web3 | null>(null);
    const [account, setAccount] = useState<string | null>(null);
    const [contract, setContract] = useState<any>(null);

  useEffect(() => {
    const provider = new HDWalletProvider({
    mnemonic: {
        phrase: "",
    },
    providerOrUrl: "https://eth-sepolia.g.alchemy.com/v2/BoX83v1qt3Xb36s8H4B0Bf-ZM5Vg0ABY",
    });
    async function init() {
      const web3 = new Web3(provider as any);
      setWeb3(web3);

      const networkId = Number(await web3.eth.net.getId());
      const deployedNetwork = (Message.networks as { [key: string]: any })[networkId.toString()]; // Use optional chaining here

      const contract = new web3.eth.Contract(Message.abi, deployedNetwork.address);
      setContract(contract);

      const accounts = await web3.eth.getAccounts();
      setAccount(accounts[0]);

    }
    init();
  }, []);

  return (
    <Web3Context.Provider value={{ web3, contract, account}}>
      {children}
    </Web3Context.Provider>
  );
}
