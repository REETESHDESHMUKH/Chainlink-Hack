import { createContext } from "react";
import Web3 from 'web3';

interface Web3ContextProps {
    web3: Web3 | null;
    account: string | null;
    contract: any
}

const Web3Context = createContext<Web3ContextProps>({
    web3: null,
    account: null,
    contract: null
});

export default Web3Context;
