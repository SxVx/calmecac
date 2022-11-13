const toWei = (num) => ethers.utils.parseEther(num.toString())
const fromWei = (num) => ethers.utils.formatEther(num)

describe("Staking", function () {

  let nft;
  let staking;
  let marketplace
  let deployer;
  let sellerAddress, buyerAddress, organizationAddress, referral1, referral2;
  const feePercent = 25
  const stakingPercent = 300
  const URI = "sample URI"

  beforeEach(async function () {
    const NFT = await ethers.getContractFactory("NFT");
    const Marketplace = await ethers.getContractFactory("Marketplace");
    const Staking = await ethers.getContractFactory("StakingCumulative");
    [deployer, sellerAddress, buyerAddress, organizationAddress, referral1, referral2] = await ethers.getSigners();

    nft = await NFT.deploy();
    staking = await Staking.deploy(stakingPercent, organizationAddress.address, toWei(0.01), toWei(0.01));
    marketplace = await Marketplace.deploy( feePercent, staking.address );
    const WITHDRAW_ROLE = await staking.connect(deployer).WITHDRAW_ROLE();
    const INCREASE_ROLE = await staking.connect(deployer).INCREASE_ROLE();
    staking.grantRole( WITHDRAW_ROLE, deployer );
    staking.grantRole( INCREASE_ROLE, marketplace.address );
    staking.setMarketplace( marketplace.address );
  });

  describe("Purchasing marketplace items", function () {
    const price = toWei(100);

    beforeEach(async () => {
      await nft.connect(sellerAddress).mint(URI);
      await nft.connect(sellerAddress).setApprovalForAll(marketplace.address, true);
      await marketplace.connect(sellerAddress).makeItem(nft.address, 1, price);
    });

    it("Should buy item", async () => {
      const item = await marketplace.items(1);
      const totalPrice = await marketplace.getTotalPrice(item.itemId);
      await marketplace.connect(buyerAddress).purchaseItem(1, { value: totalPrice });

      console.log( 'Organization Balance: ', fromWei(await organizationAddress.getBalance()) );
      console.log( 'Seller Balance: ', fromWei(await sellerAddress.getBalance()) );
      console.log( 'Buyer Balance: ', fromWei(await buyerAddress.getBalance()) );
      console.log( 'Staking Token 1: ', fromWei(await staking.getStaking(1)) );
      console.log( 'Referral 1: ', fromWei(await referral1.getBalance()) );
      console.log( 'Referral 2: ', fromWei(await referral2.getBalance()) );

      console.log( 'Staking Token 1 before: ', fromWei(await staking.getStaking(1)) );

      await staking.connect(deployer).distribute( item.itemId, referral1.address, referral2.address );

      console.log( 'Staking Token 1 after: ', fromWei(await staking.getStaking(1)) );
      console.log( 'Organization Balance: ', fromWei(await organizationAddress.getBalance()) );
      console.log( 'Staking Creator: ', fromWei(await staking.accountStakes(item.creator)) );
      console.log( 'Staking Owner: ', fromWei(await staking.accountStakes(item.owner)) );
      console.log( 'Staking Org: ', fromWei(await staking.accountStakes(organizationAddress.address)) );
      console.log( 'Staking Referral 1: ', fromWei(await staking.accountStakes(referral1.address)) );
      console.log( 'Staking Referral 2: ', fromWei(await staking.accountStakes(referral2.address)) );

      const events = await staking.queryFilter( staking.filters.Profit() );
      const mapped = events.map( ({ args }) => ({ address: args.user, amount: fromWei(args.amount.toString()), timestamp: args.timestamp.toNumber() }) );
      console.log( 'Events Profit', mapped )

      // await staking.connect(referral1).withdraw(toWei(0.009));
      // await staking.connect(referral1).withdraw(toWei(0.1));
      console.log( 'Seller staking: ', fromWei(await staking.accountStakes(sellerAddress.address)) );
      console.log('Seller balance', fromWei(await sellerAddress.getBalance()));
      await staking.connect(sellerAddress).withdraw(toWei(0.1));
      console.log( 'Seller staking: ', fromWei(await staking.accountStakes(sellerAddress.address)) );
      console.log('Seller balance', fromWei(await sellerAddress.getBalance()));

      const withdrawals = await staking.queryFilter( staking.filters.Withdraw() );
      const withdrawalsMap = withdrawals.map( ({ args }) => ({ address: args.user, amount: fromWei(args.amount.toString()), timestamp: args.timestamp.toNumber() }) );
      console.log( 'Events Withdrawal', withdrawalsMap )
    } )

    /*it( "Should distribute royalties", async () => {
      const item = await marketplace.items(1);
      await staking.connect(deployer).distribute( item.itemId, item.creator, item.owner, referral1.address, referral2.address );
    } )*/
  })
})