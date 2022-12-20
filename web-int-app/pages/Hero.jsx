import React, {useEffect, useState} from 'react'
import {useAccount} from 'wagmi';
import MyArcProgress from '../assets/arc';
import { calculate_score } from './../assets/javascript/algo';
import mintBlock from './mintBlock'
import US from './updateScore'

const Hero = () => {
    const [score, setScore] = useState(0);
    const { address, isConnected } = useAccount();
    useEffect(() => {
        // Define an async function inside the useEffect hook
        async function fetchData() {
            score = await calculate_score(address);
            score = Math.round(score);
            score = score.toString()
            setScore(score);
        }
        // Call the async function
        fetchData();
        }, [isConnected]);

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
            <MyArcProgress progress={(score - 300)/550} customText = 
            {[{ text:score, size: "45px", color: "gray", x: 150, y: 141 },
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
        <div>
        {isConnected && <mintBlock userScore = {score} />}
        </div>
        <div>
        {isConnected && <US/>}
        </div>
          </ div>
          </ div>

    </ div>
  );
}


export default Hero