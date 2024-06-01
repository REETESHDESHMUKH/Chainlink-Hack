# Wager Wheel
<p> Play Fair, Play Secure: Trustless Gaming powered by blockchain and Chainlink VRF </p>

### Landing Page

<hr>

![Screenshot 2024-06-01 220110](https://github.com/REETESHDESHMUKH/Chainlink-Hack/assets/76653982/07c8ed8c-4ada-4f77-b36e-5b50afa3dfea)

### Games

<hr>

![Screenshot 2024-06-01 220541](https://github.com/REETESHDESHMUKH/Chainlink-Hack/assets/76653982/5582fae2-5712-4ea9-8597-818d967800ab)

![Screenshot 2024-06-01 220410](https://github.com/REETESHDESHMUKH/Chainlink-Hack/assets/76653982/76ff9087-4bf5-430e-8fdc-9b0f43cc1dd8)

![Screenshot 2024-06-01 220521](https://github.com/REETESHDESHMUKH/Chainlink-Hack/assets/76653982/a480c043-103c-487a-8242-6c9e9b058d3f)

Tutorial: [Youtube Link](https://youtu.be/3e1gIILZ5h4)

## Technology Stack

- [Next Js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Chainlink VRF](https://docs.chain.link/vrf)
- [Truffle](https://archive.trufflesuite.com/docs/)
- Sepolia Testnet
- [Alchemy](https://www.alchemy.com/)

## Problem Statement 
Traditional online gaming platforms often suffer from issues of trust and transparency. Players cannot be sure if the outcomes of games are genuinely random or if they have been manipulated. This lack of trust discourages users from participating, especially when it comes to games involving real money or valuable digital assets. Moreover, centralized control over game mechanics and data can lead to security vulnerabilities and single points of failure.

## Solution
Our decentralized gaming platform leverages blockchain technology and Chainlink's Verifiable Random Function (VRF) to provide a trustless and transparent gaming experience. The platform hosts various small games such as Rock-Paper-Scissors, Mines, and Spin the Wheel, ensuring fair outcomes through verifiable randomness. By deploying smart contracts on the Sepolia testnet and using Alchemy for seamless blockchain interaction, we ensure that game outcomes are provably fair and secure. Players can enjoy their favorite games with confidence, knowing that each result is random and unmanipulable.

### Advantages
- **Transparency and Trust** : Each game's outcome is determined using Chainlink's VRF, providing cryptographic proof of fairness.
Players can independently verify the randomness of game results, enhancing trust in the platform.

- **Security** : The decentralized nature of the platform eliminates single points of failure, reducing the risk of hacking and manipulation.
Smart contracts deployed on the blockchain ensure that game logic is immutable and tamper-proof.

- **User Confidence** : With verifiable proof of randomness and fairness, users can play games with greater confidence.
The platform's transparency attracts a wider audience, fostering a loyal and engaged user base.

- **Innovative Use of Technology** : Leveraging blockchain and Chainlink VRF showcases the innovative potential of decentralized applications (dApps) in the gaming industry.
The platform demonstrates the practical applications of smart contracts and decentralized oracles.

## How we built it

Wager Wheels is built using a combination of smart contracts deployed on the Sepolia testnet and front-end development with [Next.js](https://nextjs.org/docs). We integrated Chainlink VRF to generate verifiable random numbers for game outcomes, ensuring transparency and fairness. [Alchemy](https://www.alchemy.com/) was used to facilitate seamless blockchain interaction, providing robust and efficient access to the Ethereum network.

For the Mines game, we implemented the Fisher–Yates Shuffle Algorithm to avoid repeatable random numbers. This algorithm is designed to produce a random permutation of a finite sequence—in this case, the placement of mines. The Fisher–Yates Shuffle works as follows:

- Start with an array of elements.
- Iterate through the array from the last element to the first.
- For each element, generate a random index within the portion of the array that has not been shuffled yet.
- Swap the current element with the element at the randomly generated index.

By using the Fisher–Yates Shuffle, we ensure that each placement of mines is unique and unpredictable, enhancing the fairness and enjoyment of the game.

```
function fisherYatesShuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
```

## Team Members

- Reetesh Deshmukh
- Raunak Somani
- Kartikeya Ranjan
- M Sai Srinivas

## Setup 
### Requirement 
  1. API key : This can be obtained through Alchemy. 
  2. Contract Address :

### Smart Contract :
  1. `npm i`
  2. `truffle compile`
  3. `truffle migrate --reset --network sepolia`

### Frontend : 
1. `cd wagerwheel`
2. `npm i`
3. `npm run dev`
