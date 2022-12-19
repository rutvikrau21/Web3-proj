import React, { Component } from 'react'
import {useAccount, usePrepareContractWrite, useContractWrite, useWaitForTransaction} from 'wagmi';
import contractInterface from '../assets/abi/abi.json'

const mintBlock =()=> {
      const {config} = usePrepareContractWrite({
        address: '0x8d94B2d1319252b8bf928F1739ada00fE3CaBB79',
        abi:contractInterface,
        functionName: 'mint'
      });
      const {data:mintData, write:mint, isLoading: isMintLoading, isSuccess: isMintStarted} = useContractWrite(config);
    
      const {isSuccess:txSuccess } = useWaitForTransaction({
        hash: mintData?.hash
      })
      const isMinted = txSuccess;
    return (
      <button
      className="shadow-xl shadow-black text-white
      bg-[#e32970] hover:bg-[#bd255f] p-2
      rounded-full cursor-pointer my-4"
                style = {{ marginTop:10}} 
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
      )
}

export default mintBlock;
