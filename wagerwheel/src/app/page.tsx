'use client'
import { useContext, useEffect, useState } from "react";
import Web3Context from "../../context/web3-context";
import { Button } from "@headlessui/react";


export default function Home() {
    const { web3, account, contract } = useContext(Web3Context);

//   useEffect(() => {
//     // if (web3 && account && contract) {
//       // You can interact with web3, contract, account, and user here
//       console.log('Web3 instance: ', web3);
//       console.log('User account: ', account);
//       console.log('Contract instance: ', contract);
//     // } else {

//     // }
//   }, [web3, account, contract]);

//   return (
//     <div>
//       <p>Account: {account}</p>
//     </div>
//   );

const [message, setMessage] = useState("");

  const getMessage = async () => {
    const message = await contract.methods.getMessage().call();
    setMessage(message);
  };

  const setMessageValue = async () => {
    await contract.methods.setMessage("Hello, world!").send({ from: (await web3!.eth.getAccounts())[0] });
    getMessage();
  };

  return (
    <div>
      <h1>Message</h1>
      <p>{message}</p>
      <button onClick={getMessage}>Get Message</button>
      <button onClick={setMessageValue}>Set Message</button>
    </div>
  );

}
