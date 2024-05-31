import { createContext } from "react";
import Web3 from 'web3';

interface Web3ContextProps {
    web3: Web3 | null;
    account: string | null;
    contract: any;
    connectWallet: () => void;
    disconnectWallet: () => void;
    balance: string;
    fetchBalance: () => void;
    updateBalance: (amount: string,isAdd: boolean) => void;
}

const Web3Context = createContext<Web3ContextProps>({
    web3: null,
    account: null,
    contract: null,
    connectWallet: () => {},
    disconnectWallet: () => {},
    balance: '0',
    fetchBalance: () => {},
    updateBalance: (amount: string,isAdd: boolean) => {}
});

export default Web3Context;
