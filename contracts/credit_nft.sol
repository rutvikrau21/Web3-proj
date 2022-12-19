// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "./libraries/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract credit_nft is ERC721 {
    using Counters for Counters.Counter;
    using Strings for uint256;
    Counters.Counter private _tokenIds;
    mapping(uint256 => uint256) private _score;

    constructor() ERC721("Credicle", "Credit") {}

    function setCreditScore(address addr, uint256 user_score) public onlyOwner{
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


    function mint()
        public
        returns (uint256)
    {
        require(
            get_own_ID(msg.sender) <= 0,
            "You can only mint once"
        );
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        _mint(msg.sender, newItemId);
        return newItemId;
    }
}