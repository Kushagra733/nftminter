pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract nft is ERC721, Ownable{
    using Counters for Counters.Counter;
    using Strings for uint256;
    Counters.Counter _tokenIds;
    mapping(uint256 => string) _tokenURIs;

    struct RenderToken{
        uint256 id;
        string uri;
    }

    constructor() ERC721("nft","KM"){

    }

    function _setTokenURI(uint256 tokenId,string memory _tokenURI) internal{
        _tokenURIs[tokenId] = _tokenURI;
    }
    function tokenURI(uint256 tokenId) public view virtual override returns (string memory){
        require(_exists(tokenId));
        return _tokenURIs[tokenId];
    }
    function getAllTokens() public view returns(RenderToken[] memory)
    {
        uint counter = 0;
        RenderToken[] memory  res = new RenderToken[](_tokenIds.current());
        for(uint i=0;i<_tokenIds.current();i++)
        {
            if(_exists(counter))
            {
                string memory uri = tokenURI(counter);
                res[counter] = RenderToken(counter,uri);
            }
            counter++;
        }

        return res;

    }

    function mint(address recipient,string memory uri) public returns(uint256)
    {
            uint256 newId = _tokenIds.current();
            _mint(recipient,newId);
            _tokenIds.increment();
            _setTokenURI(newId,uri);
            return newId;
    }
}
