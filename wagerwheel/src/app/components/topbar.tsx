"use client"
import { useContext, useEffect, useState } from "react";
import { Disclosure, DisclosureButton } from "@headlessui/react";
import { Bars3Icon, XMarkIcon, MagnifyingGlassCircleIcon, PlusIcon } from "@heroicons/react/24/outline";
import Web3Context from "../../../context/web3-context";
import AddBalanceModal from "./addBalanceModal";
import WithdrawBalanceModal from "./withdrawBalanceModal";

export default function Topbar() {
    const { web3, contract, account, balance, fetchBalance, connectWallet, disconnectWallet ,updateBalance} = useContext(Web3Context);
    const [ addBalanceModalOpen, setAddBalanceOpen ] = useState<boolean>(false);
    const [ withdrawBalanceModalOpen, setWithdrawBalanceOpen ] = useState<boolean>(false);

    const onClose = () => {
        setAddBalanceOpen(false);
        setWithdrawBalanceOpen(false);
    }
    const onSubmitAdd = async (amount: string) => {
        try {
            const amountInWei = web3!.utils.toWei(amount, 'ether');
            const response = await contract.methods.addEthers().send({ from: account, value: amountInWei });
            alert('Transaction successful!');
            console.log(response);
            onClose();
        } catch (error) {
            console.error('Transaction failed:', error);
            alert('Transaction failed');
        }
    }

    const onSubmitWithdraw = async (amount: string) => {
        try {
            const amountInWei = web3!.utils.toWei(amount, 'ether');
            const response = await contract.methods.withdrawBalance(amountInWei).send({ from: account });
            alert('Withdrawl successful!');
            console.log(response);
            onClose();
        } catch (error) {
            console.error('Withdrawl failed:', error);
            alert('Withdrawl failed');
        }
    }
    useEffect(()=>{
        fetchBalance();
    },[fetchBalance]);

    const walletHandler = () => {
        if(account) {
            disconnectWallet();
        } else {
            connectWallet();
        }
    }
    return (
        <Disclosure as="header" className="bg-gray-800 shadow divide-y-1 border-b border-gray-700">
            {({ open }) => (
                <>
                    <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:divide-y lg:divide-gray-200 lg:px-8">
                        <div className="relative h-16 flex justify-between">
                            <div className="relative z-10 px-2 flex lg:px-0">
                                <a className="flex-shrink-0 flex items-center" href="/">
                                    {/* <a href="/"> */}
                                    <img
                                        className="block h-10 pb-1 w-auto"
                                        src="/logo.png"
                                        alt="Workflow"
                                    />
                                    <span className="flex text-gray-300 font-semibold px-2 text-xl">Wager Wheels</span>
                                    {/* </a> */}
                                </a>
                            </div>
                            <div className="relative z-0 flex-1 px-2 flex items-center justify-center sm:absolute sm:inset-0">
                                <div className="w-1/4 sm:max-w-xs relative">
                                    <div
                                        className="block pl-12 text-gray-400 bg-white border border-gray-300 p-2 text-sm placeholder-gray-500 focus:outline-none focus:text-gray-900 focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    >
                                        {Number(Number(balance).toPrecision(4))} ETH
                                    </div>
                                    <div className="absolute inset-y-0 right-20 px-3 flex items-center cursor-pointer ">
                                        <img
                                            className="block h-6 w-auto"
                                            src="/plus.png"
                                            alt="Workflow"
                                            onClick={()=>{setAddBalanceOpen(true);}}
                                        />
                                    </div>
                                    <div className="absolute inset-y-0 right-9 px-3 flex items-center cursor-pointer ">
                                        <img
                                            className="block h-8 pb-1 w-auto"
                                            src="/withdraw.png"
                                            alt="Workflow"
                                            onClick={()=>{setWithdrawBalanceOpen(true)}}
                                        />
                                    </div>
                                    <div className="absolute inset-y-0 right-0 px-3 flex items-center cursor-pointer "
                                        >
                                        <img
                                            className="block h-6 w-auto"
                                            src="/refresh.png"
                                            alt="Workflow"
                                            onClick={fetchBalance}
                                        />
                                    </div>
                                    <AddBalanceModal isOpen={addBalanceModalOpen} onClose={onClose} onSubmit={onSubmitAdd}/>
                                    <WithdrawBalanceModal isOpen={withdrawBalanceModalOpen} onClose={onClose} onSubmit={onSubmitWithdraw}/>
                                </div>
                            </div>
                            <div className="relative z-10 flex items-center lg:hidden">
                                {/* Mobile menu button */}
                                <DisclosureButton className="rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                                    <span className="sr-only">Open menu</span>
                                    {open ? (
                                        <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                                    ) : (
                                        <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                                    )}
                                </DisclosureButton>
                            </div>
                            <div className="hidden lg:relative lg:z-10 lg:ml-4 lg:flex lg:items-center">
                                {account ? 
                                <div className="text-gray-200 border p-2 rounded-md border-gray-100">
                                    {account}
                                </div>
                                : 
                                    <button
                                    type="button"
                                    className="flex-shrink-0 bg-gray-300 rounded-md px-2 py-2 text-gray-600 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    onClick={connectWallet}
                                    >
                                    <div className="flex-shrink-0 flex items-center">
                                        <img
                                            className="block h-5 pr-2 w-auto"
                                            src="/wallet.png"
                                            alt="Workflow"
                                        />
                                        {account ? 'Disconnect' : 'Connect Wallet'}
                                    </div>
                                    </button>
                                }
                                {/* #626262 */}
                            </div>
                        </div>
                    </div>
                </>
            )}
        </Disclosure>
    )
}
