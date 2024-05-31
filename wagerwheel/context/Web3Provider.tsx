'use client'
import { ReactNode, useCallback, useEffect, useState } from "react";
import Web3Context from "./web3-context";
import Web3 from "web3";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import Message from "../../build/contracts/vrfFinal.json";
import { AbiItem } from 'web3-utils';

interface Web3ProviderProps {
  children: ReactNode;
}

export default function Web3Provider({ children }: Web3ProviderProps) {
    const [web3, setWeb3] = useState<Web3 | null>(null);
    const [account, setAccount] = useState<string | null>(null);
    const [contract, setContract] = useState<any>(null);
    const [web3Modal, setWeb3Modal] = useState<Web3Modal | null>(null);
    const [balance, setBalance] = useState<string>('0');
    useEffect(() => {
        const providerOptions = {
            walletconnect: {
                package: WalletConnectProvider,
                options: {
                    rpc: {
                        11155111: "https://eth-sepolia.g.alchemy.com/v2/ZL4q030pLIfQUEc_XDhG1NQH6ocmjZfD"
                    }
                }
            }
        };

        const web3ModalInstance = new Web3Modal({
            cacheProvider: true,
            providerOptions
        });

        setWeb3Modal(web3ModalInstance);
        if (web3ModalInstance.cachedProvider) {
            connectWallet();
        }
    }, []);

    const connectWallet = async () => {
        if (!web3Modal) return;

        try {
            const provider = await web3Modal.connect();
            const web3Instance = new Web3(provider);
            setWeb3(web3Instance);

            const accounts = await web3Instance.eth.getAccounts();
            setAccount(accounts[0]);

            const networkId = await web3Instance.eth.net.getId();
            const deployedNetwork = (Message.networks as { [key: string]: any })[networkId.toString()];

            if (deployedNetwork) {
                const contractInstance = new web3Instance.eth.Contract(Message.abi as AbiItem[], deployedNetwork.address);
                setContract(contractInstance);
            }

            provider.on("accountsChanged", (accounts: string[]) => {
                setAccount(accounts[0]);
            });

            provider.on("chainChanged", () => {
                window.location.reload();
            });

            provider.on("disconnect", () => {
                web3Modal.clearCachedProvider();
                setAccount(null);
                setWeb3(null);
                setContract(null);
            });
        } catch (error) {
            console.error("Could not connect to wallet", error);
        }
    };

    const disconnectWallet = async () => {
        if (!web3 || !web3Modal) return;

        try {
            // Clear cached provider and reset state
            await web3Modal.clearCachedProvider();
            setWeb3(null);
            setAccount(null);
            setContract(null);
        } catch (error) {
            console.error("Could not disconnect wallet", error);
        }
    };


    const fetchBalance = useCallback(async () => {
        if (!contract || !account) return;
    
        try {
            const result = await contract.methods.getBalance().call({from: account});
            setBalance(web3!.utils.fromWei(result, 'ether'));
            console.log(result);
        } catch (error) {
            console.error('Failed to fetch balance:', error);
        }
    }, [contract, account, web3]);

    const updateBalance = async (amount: string, isAdd: boolean) => {
        if(!contract || !account) return ;
        try {
            const amountInWei = web3!.utils.toWei(amount, 'ether');
            const result = await contract.methods.updateBalance(amountInWei,isAdd).send({from: account});
            console.log(result);
        } catch (error) {
            console.error('Failed to update balance:', error);
        }
    }
    useEffect(() => {
    if (contract && account) {
        fetchBalance();
    }
    }, [contract, account, fetchBalance]);
      
    return (
        <Web3Context.Provider value={{ web3, account, contract, connectWallet, disconnectWallet, balance, fetchBalance, updateBalance}}>
            {children}
        </Web3Context.Provider>
    );
}
