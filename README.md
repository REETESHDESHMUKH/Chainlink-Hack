# Wager Wheel
<p> decentralised and trusted gaming platform </p>

![landing page](https://github.com/REETESHDESHMUKH/Chainlink-Hack/assets/76653982/de626842-988a-4568-89bf-0f2be25e060e)

Tutorial: 

## Technology Stack

- [Next Js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Chainlink VRF](https://docs.chain.link/vrf)
- [Sepolia Testnet]
- [Alchemy](https://www.alchemy.com/)

<br/>
## Problem Statment 
Traditional online gaming platforms often suffer from issues of trust and transparency. Players cannot be sure if the outcomes of games are genuinely random or if they have been manipulated. This lack of trust discourages users from participating, especially when it comes to games involving real money or valuable digital assets. Moreover, centralized control over game mechanics and data can lead to security vulnerabilities and single points of failure.

## Solution
Our decentralized gaming platform leverages blockchain technology and Chainlink's Verifiable Random Function (VRF) to provide a trustless and transparent gaming experience. The platform hosts various small games such as Rock-Paper-Scissors, Mines, and Spin the Wheel, ensuring fair outcomes through verifiable randomness. By deploying smart contracts on the Sepolia testnet and using Alchemy for seamless blockchain interaction, we ensure that game outcomes are provably fair and secure. Players can enjoy their favorite games with confidence, knowing that each result is random and unmanipulable.

### Advantages
- Transparency and Trust: Each game's outcome is determined using Chainlink's VRF, providing cryptographic proof of fairness.
Players can independently verify the randomness of game results, enhancing trust in the platform.

- Security: The decentralized nature of the platform eliminates single points of failure, reducing the risk of hacking and manipulation.
Smart contracts deployed on the blockchain ensure that game logic is immutable and tamper-proof.

- User Confidence: With verifiable proof of randomness and fairness, users can play games with greater confidence.
The platform's transparency attracts a wider audience, fostering a loyal and engaged user base.

- Innovative Use of Technology: Leveraging blockchain and Chainlink VRF showcases the innovative potential of decentralized applications (dApps) in the gaming industry.
The platform demonstrates the practical applications of smart contracts and decentralized oracles.

## Flow Diagram

## Team Members

- Reetesh Deshmukh
- Raunak Somani
- Kartikeya Ranjan
- M Sai Srinivas

## Setup 

Requirement : 
  1. Project Id/ API key : This can be obtained through Alchemy. 
  2. Mnemonic : This is security phrase of your wallet account.
     ***note** use this in .env file or directly in truffle.config.js and web3Provider.js files

1. `npm i`
2. `truffle compile`
3. `truffle migrate --reset --network sepolia`
4. `cd wagerwheel`
5. `npm i`
6. `npm run dev`
