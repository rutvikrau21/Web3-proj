import React, { Component, useState } from 'react'
import {useAccount, useWaitForTransaction, useContractRead} from 'wagmi';
import contractInterface from '../assets/abi/abi.json'

const updateScore = () => {
  var score_now = "?";
  const { address, isConnected } = useAccount();
  const {data: score_data, isLoading: score_loading, isError: score_error, isSuccess: score_success} = useContractRead({
    address: '0x9647a7A834fdbe2a4e6B639eF3be2Ec0abc5D0E1',
    abi:contractInterface,
    functionName: 'get_score_by_addr',
    args: [address]
  });
  const [count, setCount] = useState(score_now);
  if(score_error){
    return;
  }else{
    return (
      <div>
        <button
          onClick = {()=> {if(!score_error){setCount(score_data.toString())}}}>
          update
        </button>
        {!score_error && <div>Your score is: {count}</div>}
      </div>
      )
  }
  }



export default updateScore;
