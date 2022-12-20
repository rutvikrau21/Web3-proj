// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "./ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract credit_nft is ERC721 {
    using Counters for Counters.Counter;
    using Strings for uint256;
    Counters.Counter private _tokenIds;
    mapping(uint256 => uint256) private _score;
    mapping(address => uint256) private _update_limit;
    uint256 ETH_balance;

    constructor() ERC721("Credicle", "Credit") {}

    function setCreditScore(address addr, uint256 user_score) public onlyOwner{
        require(_update_limit[addr] < 10, "reached maximum free update chance, please recharge");
        _update_limit[addr] += 1;
        _setCreditScore(get_own_ID(addr), user_score);
        emit Setted(addr, user_score);
    }

    function _setCreditScore(uint256 tokenId, uint256 user_score)
        internal
        virtual 
        onlyOwner
    {
        require(
            _exists(tokenId),
            "ERC721Metadata: score query for nonexistent token"
        );

        require(
            _score[tokenId] <= 0,
            "ERC721Metadata: score is already set"
        );
        _score[tokenId] = user_score;
    }

    function updateCreditscore(address addr, uint256 user_score) public onlyOwner{
        require(_update_limit[addr] < 10, "reached maximum free update chance, please recharge");
        _update_limit[addr] += 1;
        _updateCreditscore(get_own_ID(addr), user_score);
        emit Updated(addr, user_score);
    }

    function _updateCreditscore(uint256 tokenId, uint256 user_score)
        internal
        virtual 
        onlyOwner
    {
        require(
            _exists(tokenId),
            "ERC721Metadata: score query for nonexistent token"
        );

        _score[tokenId] = user_score;
    }

    function get_score_by_id(uint256 tokenId)
        public
        view
        virtual
        returns (uint256)
    {
        require(
            _exists(tokenId),
            "ERC721Metadata: score query for nonexistent token"
        );

        uint256 user_score = _score[tokenId];
        return user_score;
    }

    function get_score_by_addr(address addr)
        public
        view
        virtual
        returns (uint256)
    {
        return  get_score_by_id(get_own_ID(addr));
    }

    function recharge() public payable {
        require(msg.value >= 10000000000000000, "need 0.01 ETH to recharge");
        _update_limit[msg.sender] = 0;
    }

    function get_remaining_update(address addr) public view returns (uint256){
        return _update_limit[addr];
    }

    function mint()
        public
        payable
        returns (uint256)
    {
        require(
            get_own_ID(msg.sender) <= 0,
            "You can only mint once"
        );
        require(msg.value >= 10000000000000000, "0.01 ETH is needed to help you update your credit score");
        ETH_balance += 10000000000000000;
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        _mint(msg.sender, newItemId);
        _update_limit[msg.sender] = 0;
        return newItemId;
    }

    function withdraw() public payable onlyOwner {
        payable(owner()).transfer(ETH_balance);
    }
}