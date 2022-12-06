import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import {useAccount, usePrepareContractWrite, useContractWrite, useWaitForTransaction} from 'wagmi';
import {calculate_score} from '../assets/javascript/algo'
import contractInterface from '../assets/abi/abi.json'

const Home: NextPage = () => {
  const { address, isConnected } = useAccount();
  const {config} = usePrepareContractWrite({
    address: '0x8d94B2d1319252b8bf928F1739ada00fE3CaBB79',
    abi:contractInterface,
    functionName: 'mint'
  })
  const {data:mintData, write:mint, isLoading: isMintLoading, isSuccess: isMintStarted} = useContractWrite(config);

  const {isSuccess:txSuccess } = useWaitForTransaction({
    hash: mintData?.hash
  })
  const isMinted = txSuccess;
  return (
    <div className={styles.container}>
      <Head>
        <title>Web3 Proj</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
      <h1 className={styles.title}>
          Connect your wallet to get started!
        </h1>
        <ConnectButton showBalance={false} chainStatus='icon'/>
        {isConnected &&
          <div>
            Your credit score: {calculate_score(address)}
          </div>
        }
        {isConnected &&(
            <button 
            style = {{ marginTop:10}} 
            className="button" 
            onClick = {()=> mint?.()} 
            disabled={isMintLoading || isMintStarted || isMinted}
            data-ming-loading ={isMintLoading}
            data-mint-started ={isMintStarted}
          >
            {isMintLoading && 'waiting for approval'}
            {isMintStarted && !isMinted && 'Minting...'}
            {isMinted && 'Minted'}
            {!isMintLoading && !isMintStarted && !isMinted && 'Mint'}
          </button>
        )}
      </main>
    </div>
  );
};

export default Home;
