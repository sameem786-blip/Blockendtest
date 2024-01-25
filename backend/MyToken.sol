//SPDX-License-Identifier: MIT

pragma solidity 0.8.24;


import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

import "@openzeppelin/contracts/access/Ownable.sol";


contract MyToken is ERC20{

    function mintFifty() public{

        _mint(msg.sender, 50 * 10**18);

    }
    function transfer(address _to, uint256 _value) public returns (bool) {

        _transfer(msg.sender, _to, _value);

        return true;

    }

}
