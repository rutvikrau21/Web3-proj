const credit_nft = artifacts.require('../libraries/credit_nft.sol');
const truffleAssert = require('truffle-assertions');


contract('credit_nft', (accounts) => {
    const [deployerAddress, tokenHolderOneAddress, tokenHolderTwoAddress] = accounts;

    it('Mint NFT', async () => {
        let token = await credit_nft.deployed();
        const id=await token.mint(); //minting works

        await truffleAssert.fails(token.transferFrom(deployerAddress, tokenHolderOneAddress, 0)); //transferring for others doesn't work
        await truffleAssert.fails(token.mint()) //only allow user to mint one credit score
        await truffleAssert.passes( //transfer nft
            token.transferFrom(tokenHolderOneAddress, tokenHolderTwoAddress, 0, { from: tokenHolderOneAddress }),
        );
    });

    it('Set and Get and Update Credit Score from address', async () => {
        let token = await credit_nft.deployed();
        const id=await token.mint(); //minting works

        await truffleAssert.passes(
          await token.setCreditScore(deployerAddress, 500) //can be anything
           
        );
        await truffleAssert.passes( 
          const score=await token.get_score_by_addr(deployerAddress)
          assert.equals(score,500)
        )
        await truffleAssert.passes(
          await token.updateCreditscore(deployerAddress,600);
       );

       await truffleAssert.passes(
         const score=await token.get_score_by_addr(deployerAddress)
         assert.equals(score,600)
       )
    });

    it('Set and Get and Update Credit Score from tokenId', async () => {
      let token = await credit_nft.deployed();
      const id=await token.mint(); //minting works

      await truffleAssert.passes(
        await token.setCreditScore(deployerAddress, 500) //can be anything
         
      );
      await truffleAssert.passes(
        const score=await token.get_score_by_id(id)
        assert.equals(score,500)
      )
      await truffleAssert.passes(
        await token.updateCreditscore(deployerAddress,600);
     );

     await truffleAssert.passes(
       const score=await token.get_score_by_id(id)
       assert.equals(score,600)
     )
  });


    
});