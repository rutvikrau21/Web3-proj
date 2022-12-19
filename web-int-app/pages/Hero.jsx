import React, {useEffect, useState} from 'react'
import {useAccount} from 'wagmi';
import MyArcProgress from './../assets/MyArcProgress';
import { calculate_score } from './../assets/javascript/algo';
import MintBlock from './mintBlock'

const Hero = () => {
    const [score, setScore] = useState(null);
    const { address, isConnected } = useAccount();

  return (
    <div>
        <div className="flex flex-col justify-center items-center mx-auto py-10">
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-black text-5xl font-bold text-center">
            <span className="text-gradient">Web3</span> Credit Score
          </h1>
          <div className="rounded-xl border-2 border-cred-light-blue-opacity-0.2 m-4  ">
            <div className="p-6 h-[calc(100%-8px-24px-24px)]">
            {isConnected && <div> 
            <MyArcProgress progress={0.3} customText = 
            {[{ text: 465, size: "45px", color: "gray", x: 150, y: 141 },
            { text: "300", size: "20px", color: "gray", x: 52.5, y: 255 },
            { text: "850", size: "20px", color: "gray", x: 250, y: 255 }]} />
            </div>
            }

            {!isConnected && 
            <MyArcProgress progress={0.0} customText = 
            {[{ text: "Connect wallet for score", size: "20px", color: "gray", x: 150, y: 141 },
            { text: "300", size: "20px", color: "gray", x: 52.5, y: 255 },
            { text: "850", size: "20px", color: "gray", x: 250, y: 255 }]}/>
                }
        </div>
        </div>
        {isConnected && <MintBlock/>}
    
          </ div>
          </ div>

    </ div>
  );
}

async function getScore(address) {
      var score = await calculate_score(address);
      score = Math.round(score);
      return score.toString();
}

export default Hero