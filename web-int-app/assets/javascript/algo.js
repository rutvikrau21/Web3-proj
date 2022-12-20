const etherscan = require('etherscan-api').init('15JUND5PCEJSQ4TMCY2H524HUPEGB9S1T8');
// const FileSystem = require("fs");

// var balance = etherscan.account.balance('0xba7C45CB134aD28b050A362f375A77b4fA2f6703');
// balance.then(function(balanceData){
//   console.log(balanceData);
// });
// var address = '0x7D47AD92f6d86078f1CbEd549E6DC6f963672B17'.toLowerCase();

async function calculate_score(address) {
    var address = address.toLowerCase();
    console.log("address: ", address);
    var transaction_count = 0;
    var transaction_value = 0;
    var life_score = 0;
    var transaction_value_score = 0;
    var transaction_count_score = 0;
    var balance_score = 0;
    var current_block = await etherscan.proxy.eth_blockNumber();
    var transaction = await etherscan.account.txlist(address);
    var balance = await etherscan.account.balance(address);
    var balanceETH = balance.result / 1000000000000000000.00;
    
    var first_block_used = parseInt(transaction.result[0].blockNumber);
    var c_block = parseInt(current_block.result);
    // account life score = 100 - (first_block_used ** n) / (current_block ** n / 100)
    life_score = 100 - (first_block_used ** 2) / ((c_block ** 2) / 100)
    console.log("life_score: ", life_score);
    if (life_score > 75 ) {
        life_score = 150;
    } else if (life_score > 30) {
        life_score = 100;
    } else if (life_score > 10) {
        life_score = 50;
    } else if (life_score > 0) {
        life_score = 0;
    }

    // get transaction count
    // max score transaction = 5000
    // transaction count score = 100 - (transaction ** n) / (5000 ** n / 100)
    transaction_count = transaction.result.length;

    if (transaction_count > 30) {
        transaction_count_score = 200;
    } else if (transaction_count_score > 25) {
        transaction_count = 150;
    } else if (transaction_count > 20) {
        transaction_count_score = 125;
    } else if (transaction_count > 15) {
        transaction_count_score = 100;
    } else if (transaction_count > 10) {
        transaction_count_score = 75;
    } else if (transaction_count > 5) {
        transaction_count_score = 50;
    } else {
        transaction_count_score = 0;
    }

    console.log("transaction_count: ", transaction_count);
    console.log("transaction_count_score: ", transaction_count_score);

    // get transaction value
    // max score value = 1000000000000000000000 (1000 ETH)
    // transaction value score = 100 - (value/1000000000000000000000 ** n) / (1000 ** n / 100)
    for(var i = 0; i < transaction.result.length; i++){
        transaction_value += parseInt(transaction.result[i].value);
    }
    transaction_value_score = 100 - (transaction_value/1000000000000000000000 ** 2) / (1000 ** 2 / 100)
    console.log("transaction_value: ", transaction_value/1000000000000000000.00);
    console.log("transaction_value_score: ", transaction_value_score);


    if (balanceETH > 25) {
        balance_score = 150;
    } else if(balanceETH > 15) {
        balance_score = 120;
    } else if(balanceETH > 10) {
        balance_score = 100;
    } else if(balanceETH > 5) {
        balance_score = 60;
    } else if(balanceETH > 3) {
        balance_score = 30;
    } else {
        balance_score = 0;
    }
    console.log("balanceETH: ", balanceETH);
    
    
    // TODO: filter often used contracts calls
    // way: filter "to" address and match contracts like opensea wyvern exchange
    var score = life_score + transaction_count_score + balance_score + 300;
    console.log("ANS333: ",score);
    return score;
}
/*

(async () => {
    console.log("test score: ", await calculate_score('0x7D47AD92f6d86078f1CbEd549E6DC6f963672B17'));
 })()

 */



 export {calculate_score};



