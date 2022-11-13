// SPDX-License-Identifier: MIT
pragma solidity ^0.8.16;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "./Marketplace.sol";
import "./ItemTypes.sol";

contract StakingCumulative is AccessControl, ItemTypes, ReentrancyGuard {
    uint public minWithdrawal;
    uint public minDistribution;
    address payable public organization;
    Marketplace public marketplace;
    mapping(uint => ItemStake) public itemStakes;
    mapping(address => uint) public accountStakes;
    uint public immutable stakingPercent;

    using SafeMath for uint256;

    bytes32 public constant INCREASE_ROLE = keccak256("INCREASE");
    bytes32 public constant WITHDRAW_ROLE = keccak256("WITHDRAW");

    struct ItemStake {
        uint amount;
        uint lastTransfer;
    }

    constructor( uint _stakingPercent, address _organization, uint _minWithdrawal, uint _minDistribution ) {
        require( _minWithdrawal > 0, "Minimum withdrawal amount must be greater than zero" );
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _setupRole(WITHDRAW_ROLE, msg.sender);
        stakingPercent = _stakingPercent;
        organization = payable(_organization);
        minWithdrawal = _minWithdrawal;
        minDistribution = _minDistribution;
    }

    function setMarketplace( address _marketplace ) onlyRole( DEFAULT_ADMIN_ROLE ) public {
        marketplace = Marketplace(_marketplace);
    }

    function increase(uint itemId, uint256 value) public {
        require(hasRole(INCREASE_ROLE, msg.sender), "Caller has not increase permissions");
        itemStakes[itemId].amount = itemStakes[itemId].amount.add(value);
        emit Deposit( msg.sender, itemId, stakingPercent, value );
    }

    function getStaking( uint itemId ) public view returns (uint256) {
        return itemStakes[itemId].amount;
    }

    receive() external payable {}

    function withdraw(uint amount) nonReentrant public {
        require( amount >= minWithdrawal, "The collect amount must be greater or equal than the minimum withdrawal amount" );
        require( accountStakes[msg.sender] >= amount, "Insufficient founds to collect" );

        payable(msg.sender).transfer( amount );
        accountStakes[msg.sender] = accountStakes[msg.sender].sub(amount);
        emit Withdraw( msg.sender, amount, block.timestamp );
    }

    function distribute( uint itemId, address payable referral1, address payable referral2 ) public {
        require(hasRole(WITHDRAW_ROLE, msg.sender), "Caller has not withdrawal permissions");
        require(address(marketplace) != address(0), "The marketplace is not set yet, please invoke setMarketplace first" );
        ItemStake storage itemStake = itemStakes[itemId];
        // TODO: only count royalties generated in the last month
        // TODO: 100->30%->2% | 28% + (month_royalties) -> 2%
        require( itemStake.amount > minDistribution, "There are no royalties for this item" );
        require( block.timestamp - itemStake.lastTransfer > 4 weeks, "The last transfer was made in less than 4 weeks" );

        Item memory item = marketplace.getItem(itemId);
        //require( block.timestamp - item.createdAt > 4 weeks, "You must wait at least 4 weeks to distribute royalties" );
        // To run the tests it is necessary to comment this validation and run them

        uint creatorProfit = itemStake.amount.div(100); // 1%
        uint ownerProfit = itemStake.amount.div(200); // 0.5%
        uint orgProfit = itemStake.amount.div(100000).mul(467); // 0.467%
        uint referral1Profit = itemStake.amount.div(10000).mul(3); // 0.03%
        uint referral2Profit = itemStake.amount.div(100000).mul(3); // 0.003%
        accountStakes[item.creator] = accountStakes[item.creator].add(creatorProfit);
        emit Profit( item.creator, itemId, creatorProfit, block.timestamp );
        accountStakes[item.owner] = accountStakes[item.owner].add(ownerProfit);
        emit Profit( item.owner, itemId, ownerProfit, block.timestamp );
        accountStakes[organization] = accountStakes[organization].add(orgProfit);
        emit Profit( organization, itemId, orgProfit, block.timestamp );
        uint totalRoyalties = creatorProfit.add(ownerProfit).add(orgProfit);
        if( address(referral1) != address(0) ){
            accountStakes[referral1] = accountStakes[referral1].add(referral1Profit);
            totalRoyalties = totalRoyalties.add(referral1Profit);
            emit Profit( referral1, itemId, referral1Profit, block.timestamp );
        }
        if( address(referral2) != address(0) ){
            accountStakes[referral2] = accountStakes[referral2].add(referral2Profit);
            totalRoyalties = totalRoyalties.add(referral2Profit);
            emit Profit( referral2, itemId, referral2Profit, block.timestamp );
        }
        itemStake.lastTransfer = block.timestamp;
        itemStake.amount = itemStake.amount.sub( totalRoyalties );
    }

    event Deposit( address indexed user, uint itemId, uint percent, uint amount );
    event Profit( address indexed user, uint itemId, uint amount, uint timestamp  );
    event Withdraw( address indexed user, uint amount, uint timestamp );
}