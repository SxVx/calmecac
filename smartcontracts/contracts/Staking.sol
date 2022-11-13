// SPDX-License-Identifier: MIT
pragma solidity ^0.8.16;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "./ItemTypes.sol";

contract Staking is ItemTypes, AccessControl, ReentrancyGuard {
    address payable public organization;
    mapping(uint => Stake) stakes;
    uint public immutable stakingPercent;
    using SafeMath for uint256;

    bytes32 public constant INCREASE_ROLE = keccak256("INCREASE");
    bytes32 public constant WITHDRAW_ROLE = keccak256("WITHDRAW");

    struct Stake {
        uint amount;
        uint lastTransfer;
    }

    constructor( uint _stakingPercent, address _organization ) {
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _setupRole(WITHDRAW_ROLE, msg.sender);
        stakingPercent = _stakingPercent;
        organization = payable(_organization);
    }

    function increase(uint itemId, uint256 value) public {
        require(hasRole(INCREASE_ROLE, msg.sender), "Caller has not increase permissions");
        stakes[itemId].amount = stakes[itemId].amount.add(value);
        emit deposit( msg.sender, itemId, stakingPercent, value );
    }

    function getStaking( uint itemId ) public view returns (uint256) {
        return stakes[itemId].amount;
    }

    receive() external payable {}

    function takeBack(uint amount) nonReentrant public {
        require(hasRole(WITHDRAW_ROLE, msg.sender), "Caller has not withdrawal permissions");
        require( amount > 0, "Amount must be greater that zero" );

        payable(msg.sender).transfer( amount );
        emit collect( msg.sender, amount );
    }

    function distribute( Item memory item, address payable referral1, address payable referral2 ) public {
        require(hasRole(WITHDRAW_ROLE, msg.sender), "Caller has not withdrawal permissions");

        Stake storage stake = stakes[item.itemId];
        require( block.timestamp - stake.lastTransfer > 4 weeks, "Too early" );
        uint creatorProfit = stake.amount.div(1); // 1%
        uint ownerProfit = stake.amount.div(1); // 5%
        uint orgProfit = stake.amount.div(100000).mul(467); // 0.467%
        uint referral1Profit = stake.amount.div(10000).mul(3); // 0.03%
        uint referral2Profit = stake.amount.div(100000).mul(3); // 0.003%
        item.creator.transfer( creatorProfit );
        item.owner.transfer( ownerProfit );
        organization.transfer( orgProfit );
        uint totalRoyalties = creatorProfit.add(ownerProfit).add(orgProfit);
        if( address(referral1) != address(0) ){
            referral1.transfer( referral1Profit );
            totalRoyalties = totalRoyalties.add(referral1Profit);
        }
        if( address(referral2) != address(0) ){
            referral2.transfer( referral2Profit );
            totalRoyalties = totalRoyalties.add(referral2Profit);
        }
        stake.lastTransfer = block.timestamp;
        stake.amount = stake.amount.sub( totalRoyalties );
        emit profit( item.creator, item.itemId, creatorProfit );
        emit profit( item.owner, item.itemId, ownerProfit );
        emit profit( organization, item.itemId, orgProfit );
    }

    event deposit( address user, uint itemId, uint percent, uint amount );
    event profit( address user, uint itemId, uint amount );
    event collect( address user, uint amount );
}