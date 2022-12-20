import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import {useAccount, usePrepareContractWrite, useContractWrite, useWaitForTransaction} from 'wagmi';
import {calculate_score} from '../assets/javascript/algo.js'
import contractInterface from '../assets/abi/abi.json'
import Header from './header';
import Hero from './Hero';

const Home: NextPage = () => {
  
  return (
    <>
    <div className="bg-black">
    <Header />
    </ div>
    <div className="bg-white">
    <Hero />
    
  </div>
  </>
  );
};

export default Home;
