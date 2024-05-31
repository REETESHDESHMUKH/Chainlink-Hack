import { Separator } from "./ui/separator";

export const AboutProject = () => {
    const videoOptions = {
        playerVars: {
          autoplay: 1,
          controls: 0,
          rel: 0,
          showinfo: 0,
          mute: 1,
          loop: 1
        },
        width: '480',
        height: '270',
        className: 'rounded-xl'
    };

    return (
        <div className="text-center" id="about">
            <h1 className="pb-4 font-bold tracking-tight text-5xl lg:text-6xl">Empowering Decentralized Innovation with Ethereum and Chainlink VRF</h1>
            <div className="flex items-center justify-center">
                <Separator className="mt-3 bg-slate-100/20 h-0.5 w-40" />
            </div>
            <div className="flex justify-center">
                <p className="mt-8 max-w-3xl text-xl  text-slate-300/40">
                    Our decentralized gaming platform leverages blockchain technology and Chainlink's Verifiable Random Function (VRF) to provide a trustless and transparent gaming experience. The platform hosts various small games such as Rock-Paper-Scissors, Mines, and Spin the Wheel, ensuring fair outcomes through verifiable randomness. By deploying smart contracts on the Sepolia testnet and using Alchemy for seamless blockchain interaction, we ensure that game outcomes are provably fair and secure. Players can enjoy their favorite games with confidence, knowing that each result is random and unmanipulable.
                </p>
            </div>
        </div>
    );
};
