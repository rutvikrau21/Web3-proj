const credit_nft = artifacts.require('../libraries/credit_nft.sol');
const truffleAssert = require('truffle-assertions');



//change to appropriate addresses to test
const deployerAddress = "0xd3b6Bf30bbd2B438aFE840b8EA376598cF3B998A"
const tokenHolderOneAddress = "0xd3b6Bf30bbd2B438aFE840b8EA376598cF3B998A"//can be the same as deployer
const tokenHolderTwoAddress = "0x2EC964DEDD3e4b53328B00010A15cEefccb81D10"

contract('credit_nft', (accounts) => {
  const [deployerAddress, tokenHolderOneAddress, tokenHolderTwoAddress] = accounts;

  it('Mint NFT', async () => {
    let token = await credit_nft.deployed();
    const id = await token.mint(); //minting works

    await truffleAssert.fails(token.mint()) //only allow user to mint one credit score
    await truffleAssert.passes( //transfer nft
      token.transferFrom(tokenHolderOneAddress, tokenHolderTwoAddress, 0, { from: tokenHolderOneAddress }),
    );
  });

  it('Set and Get and Update Credit Score from address', async () => {
    let token = await credit_nft.deployed();
    const id = await token.mint(); //minting works

    await truffleAssert.passes(
      await token.setCreditScore(deployerAddress, 500) //can be anything

    );
    let score = await token.get_score_by_addr(deployerAddress)
    assert.equals(score, 500)

    await truffleAssert.passes(
      await token.updateCreditscore(deployerAddress, 600)
    );

    score = await token.get_score_by_addr(deployerAddress)
    assert.equals(score, 600)

  });

  it('Set and Get and Update Credit Score from tokenId', async () => {
    let token = await credit_nft.deployed();
    const id = await token.mint(); //minting works

    await truffleAssert.passes(
      await token.setCreditScore(deployerAddress, 500) //can be anything

    );
    let score = await token.get_score_by_id(id)

    await truffleAssert.passes(
      assert.equals(score, 500)
    )
    await truffleAssert.passes(
      await token.updateCreditscore(deployerAddress, 600)
    );

    score = await token.get_score_by_id(id)
    assert.equals(score, 600)

  });



});