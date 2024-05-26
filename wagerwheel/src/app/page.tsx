'use client'
import { useContext, useEffect, useState } from "react";
import Web3Context from "../../context/web3-context";
import { Button } from "@headlessui/react";
import Loading from "./components/loading";


export default function Home() {
    const { web3, account, contract } = useContext(Web3Context);
    const [loading,setLoading] = useState<boolean>(false);
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


  const getMessage = async () => {
    try{
        setLoading(true);
        const gas = await contract.methods.rollDice(account, 2, 4).estimateGas({ from: account });
        const response = await contract.methods.rollDice(account, 2, 4).send({ from: account, gas });
        console.log('Roll Dice Response:', response);
    } catch(err) {
        alert("error");
    } finally {
        setLoading(false);
    }
  };

  const getRandomes = async () => {
    try{
        setLoading(true);
        const random = await contract.methods.getRandom().call({from: account});
        console.log(random);
    } finally {
        setLoading(false);
    }
  }

  return (
    <>
        <div>
        <h1>{account}</h1>
        <Button onClick={()=>{getMessage()}}>Roll</Button>
        <Button onClick={()=>{getRandomes()}}>get</Button>
        </div>
        <Loading isVisible={loading}/>
    </>
  );

}
