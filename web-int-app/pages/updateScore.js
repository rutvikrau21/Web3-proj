import React, { Component } from 'react'
import {useAccount, usePrepareContractWrite, useContractWrite, useWaitForTransaction, 
    usePrepareContractRead, useContractRead} from 'wagmi';
import contractInterface from '../assets/abi/abi.json'

const updateScore = () => {
      const {config} = usePrepareContractWrite({
        address: '0xE20090a866A699B80C6774690762907863CC7f2c',
        abi:contractInterface,
        functionName: 'mint'
      });
      const {data:mintData, write:mint, isLoading: isMintLoading, isSuccess: isMintStarted} = useContractWrite(config);
    
      const {isSuccess:txSuccess } = useWaitForTransaction({
        hash: mintData?.hash
      })
      const isMinted = txSuccess;


    return (
        <>
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
                {!isMintLoading && !isMintStarted && !isMinted && 'Update'}
        </button>
        </>
      )
}

export default updateScore;
