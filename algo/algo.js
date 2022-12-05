const etherscan = require('etherscan-api').init('15JUND5PCEJSQ4TMCY2H524HUPEGB9S1T8');
const FileSystem = require("fs");

// var balance = etherscan.account.balance('0xba7C45CB134aD28b050A362f375A77b4fA2f6703');
// balance.then(function(balanceData){
//   console.log(balanceData);
// });
var address = '0x7D47AD92f6d86078f1CbEd549E6DC6f963672B17'.toLowerCase();
var transaction_count = 0;
var transaction_value = 0;
var gas_spent = 0;
var life_score = 0;
var transaction_value_score = 0;

var credit_score = 0;

var current_block = etherscan.proxy.eth_blockNumber();
current_block.then(function(current_block){
    var transaction = etherscan.account.txlist(address);
    transaction.then(function(transaction){
        // FileSystem.writeFile('file.json', JSON.stringify(transaction.result), (error) => {
        //     if (error) throw error;
        // });
        var first_block_used = parseInt(transaction.result[0].blockNumber);
        var c_block = parseInt(current_block.result);
        // account life score = 100 - (first_block_used ^ n) / (current_block ^ n / 100)
        life_score = 100 - (first_block_used ^ 4) / ((c_block ^ 4) / 100)
        console.log("life_score: ", life_score);

        // get transaction count
        transaction_count = transaction.result.length;
        console.log("transaction_count: ", transaction_count);


        // get transaction value
        for(var i = 0; i < transaction.result.length; i++){
            transaction_value += parseInt(transaction.result[i].value);
        }
        console.log("transaction_value: ", transaction_value/1000000000000000000.00);
        
        // get total gas spent
        for(var i = 0; i < transaction.result.length; i++){
            if(transaction.result[i].from === address){
                gas_spent = gas_spent + parseInt(transaction.result[i].gas) * parseInt(transaction.result[i].gasPrice);
            }
        }
        console.log("gas_spent: ", gas_spent);
        // TODO: filter often used contracts calls
        // way: filter "to" address and match contracts like opensea wyvern exchange
    });
});




// function calculate_score(address){
    
// }
// module.exports = {calculate_score};