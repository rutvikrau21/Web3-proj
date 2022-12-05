import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import {useAccount, usePrepareContractWrite } from 'wagmi';

const Home: NextPage = () => {
  const { address, isConnected } = useAccount();
  // const {config} = usePrepareContractWrite({
  //   addressOrName: '',
  //   contractInterface: abi.json file,
  //   functionName: 'mint'
  // })
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
            Your credit score: 1000
          </div>
        }

        {isConnected &&
          <button style = {{ marginTop:10}} className="button">
            Mint
          </button>
        }
      </main>
    </div>
  );
};

export default Home;
