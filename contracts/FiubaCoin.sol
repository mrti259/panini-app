// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

/// @title a Crypto-Coin's implementation
/// @author @mrti259/@saantim/@ovr4ulin
/// @notice You can use this contract to mint FiubaCoins
/// @dev This contract inherits ERC20 interface
contract FiubaCoin is ERC20 {
    address owner;
    uint256 public price = 1_000_000 gwei;

    constructor() ERC20("FiubaCoin", "FIU") {
        owner = msg.sender;
    }

    /// @notice Send the contract's ether to the contract's owner
    /// @dev The contract's owner can not be modified
    function withdraw() public {
        payable(owner).transfer(address(this).balance);
    }

    /// @notice Buy  a `quantity` of FiubaCoins.
    /// @dev If the user doesn't send the correct amount of ether, then the function returns an error
    /// @param quantity It's the quantity of FiubaCoins to be minted
    function buy(uint256 quantity) public payable {
        require(quantity * price == msg.value, "wrong amount sent");
        _mint(msg.sender, quantity * 10 ** 18);
    }
}
