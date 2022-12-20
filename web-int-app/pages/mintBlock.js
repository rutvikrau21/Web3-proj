import { ethers } from 'ethers';
import React, { Component } from 'react'
import {useAccount, usePrepareContractWrite, useContractWrite, useWaitForTransaction, 
    usePrepareContractRead, useContractRead} from 'wagmi';
import contractInterface from '../assets/abi/abi.json'

const mintBlock =()=> {
      const {config} = usePrepareContractWrite({
        address: '0x9647a7A834fdbe2a4e6B639eF3be2Ec0abc5D0E1',
        abi:contractInterface,
        functionName: 'mint',
        args:[465],
        overrides:{
          value:ethers.utils.parseEther('0.01'),
        }
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
                {!isMintLoading && !isMintStarted && !isMinted && 'Mint'}
        </button>
        </>
      )
}

export default mintBlock;
