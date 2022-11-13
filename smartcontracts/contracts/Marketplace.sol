// SPDX-License-Identifier: MIT
pragma solidity ^0.8.16;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

import "hardhat/console.sol";
import "./Staking.sol";
import "./ItemTypes.sol";

contract Marketplace is ReentrancyGuard, ItemTypes {
    using SafeMath for uint256;

    // Variables
    address payable public immutable feeAccount; // the account that receives fees
    uint public immutable feePercent; // the fee percentage on sales 
    uint public itemCount;
    address payable public stakingContract;

    // itemId -> Item
    mapping(uint => Item) public items;

    constructor(uint _feePercent, address _stakingContract) {
        feeAccount = payable(msg.sender);
        feePercent = _feePercent;
        stakingContract = payable(_stakingContract);
    }

    // Make item to offer on the marketplace
    function makeItem(IERC721 _nft, uint _tokenId, uint _price) external nonReentrant {
        require(_price > 0, "Price must be greater than zero");
        // transfer nft
        _nft.transferFrom(msg.sender, address(this), _tokenId);
        // increment itemCount
        itemCount ++;
        // add new item to items mapping
        items[itemCount] = Item(
            itemCount,
            _nft,
            _tokenId,
            _price,
            _price,
            payable(msg.sender),
            payable(msg.sender),
            block.timestamp,
            false
        );
        // emit Offered event
        emit Offered(
            itemCount,
            address(_nft),
            _tokenId,
            _price,
            msg.sender
        );
    }

    function offerItem(uint _itemId, uint _price) external nonReentrant {
        require(_itemId > 0 && _itemId <= itemCount, "item doesn't exist");
        require( _price > 0, "Price must be greater than zero" );
        items[_itemId].currentPrice = _price;
        items[_itemId].sold = false;

        emit Offered(
            _itemId,
            address(items[_itemId].nft),
            items[_itemId].tokenId,
            _price,
            msg.sender
        );
    }

    function purchaseItem(uint _itemId) external payable nonReentrant {
        uint _totalPrice = getTotalPrice(_itemId);
        Item storage item = items[_itemId];
        require(_itemId > 0 && _itemId <= itemCount, "item doesn't exist");
        require(msg.value >= _totalPrice, "not enough ether to cover item price and market fee");
        require(!item.sold, "item already sold");
        // pay seller and feeAccount

        Staking staking = Staking( stakingContract );
        if( item.currentPrice > item.previousPrice ) {
            uint profit = item.currentPrice.sub(item.previousPrice);
            uint stakeAmount = profit.div(10);
            uint instantPay = item.currentPrice.sub(stakeAmount);
            item.owner.transfer( instantPay );
            stakingContract.transfer( stakeAmount );
            staking.increase( _itemId, stakeAmount );
        } else {
            uint stakeAmount = item.currentPrice.mul(staking.stakingPercent()).div(1000);
            uint instantPay = item.currentPrice.sub(stakeAmount);
            item.owner.transfer( instantPay );
            stakingContract.transfer( stakeAmount );
            Staking( stakingContract ).increase( _itemId, stakeAmount );
        }
        feeAccount.transfer(_totalPrice.sub(item.currentPrice));
        // update item to sold
        item.sold = true;
        // transfer nft to buyer
        item.nft.transferFrom(address(this), msg.sender, item.tokenId);
        item.owner = payable(msg.sender);
        // emit Bought event
        emit Bought(
            _itemId,
            address(item.nft),
            item.tokenId,
            item.currentPrice,
            item.owner,
            msg.sender
        );
    }

    function getTotalPrice(uint _itemId) view public returns(uint) {
        return items[_itemId].currentPrice.add(items[_itemId].currentPrice.mul(feePercent).div(1000));
    }

    function getItem(uint _itemId) view public returns (Item memory) {
        return items[_itemId];
    }

    event Offered(
        uint indexed itemId,
        address indexed nft,
        uint tokenId,
        uint price,
        address indexed seller
    );

    event Bought(
        uint itemId,
        address indexed nft,
        uint tokenId,
        uint price,
        address indexed seller,
        address indexed buyer
    );
}