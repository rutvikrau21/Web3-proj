# Web3-proj
Web3 Class Project for Leo, Aaron and Rutvik

# Tasks
# Rutvik
## Web interface
### Connect wallet
### UI/UX

# Leo
## Process account data
### Get account data
### Algorithm to calculate data

# Aaron
## Smart Contract to issue fund and manage repay
### DAO governance
### Lending pool

# How to run
```
cd web-int-app
npm install
npm run
```

# How to use
```
Connect your wallet first
Then you will see your credit score on the screen
This is calculated dynamically by the algorithm
Click mint to mint an NFT with the credit score you got
After mint, you will see an update button, this is to update the credit score you have on chain (Metadata of your NFT)
```



# Credit Score Calculation

```
Credit Score Calculation

We have created our Web3 credit score by analyzing blockchain transaction history and have the score in the same range as the traditional finance credit score from 300 - 850. 
We measure a couple of factors to calculate your score and we weight the score to get it into the range. 

We used etherscan’s API to query blockchain data from a wallet address and started computation. 

 ⁃ Length of wallet history: 30% of score value, 150 points. We calculate the amount of time a particular user has had their wallet by looking at the current block - the first block that the user has interacted with. Through this we are able to get a sense of how many block cycles has this wallet been active for. We then use a function to compute a score from 0 - 100 on this measure. If the score is above 75 we give it a full score of 150 points. If the score is between 30 - 75 we give it 100, if it is between 10-20 we give it 50 and below 10 it is considered as 0. We had such a scale so that we can ensure that older wallets are given a score closer to 150 and newer ones close to 0. 
 
 ⁃ Number of transactions: 40% of score value. 200 points. We go through all the transactions a wallet has had over its life span and calculate the sum of them. Depending on what the sum is, we give a score for the number of transactions. If the wallet has over 30 transactions, we give it a score of 200, if it has score between 30 -25 we give it 150, between 25-20 we give it 125, between 20 - 15 we give it 100, between 10 and 15, we give it 75 and between 5 -1 10 as 50 and below at 0. We used this approach as the number of transactions was the most important factor we felt to consider the score. As even if the value of a wallet is not high, if they have been an adamant user of Defi we want to reward them with their transaction count. 

 ⁃ Current value of wallet in ETH: 30% of score. 150 points. Using the etherscan API, we fetch the current score of the user and convert that to ETH tokens. If you hav more than 25 ETH you get a score of 150, if you have between 25 - 15 ETH you get a score of 120, if you have between 15 - 10 we get a score of 100, if its between 5 - 10 we get a score of 60 and between 3-5 value of 30. We used this metric by researching the average value of a crypto wallet which was $5,000 and using that as a basis for analysis. 

This score allows a lender to know if the user they are interacting with has a good sense of the ecosystem and has been a consistent user in the space.
```