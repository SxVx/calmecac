# Calmecac 🤓💻

`Calmecac` is an educational platform that through the use of `Web 3.0` technology requires the payment of a fee to access the courses we offer.

## Inspiration

We are a `Dapp` that allows `students` to delegate capital for their studies, at the end of their course, they get 100% of their money back, making `education` much more accessible to certain `social groups`.

## What it does

Facilitate access to `education` for `students` from all over Latin America without the need to lose their invested capital.
Encourage the new economies proposed by `Web 3.0` technology Become a `Dapp` work to help.

## Challenges we ran into

According to UNESCO data, in the `last three years 100 million students dropped out of school`, and education is subject to the context of the countries resulting in an educational restlessness. With better educational offerings you have better job prospects, better salaries and therefore a better lifestyle.

With this in mind, we propose a capital delegation program where the student at no time loses his investment and can continue with his studies.

## Accomplishments that we're proud of

We're proud to have created the real-time connection of the `Dapp`, creating the smart contracts of the platform and the base architecture of the project; `front-end`, `back-end` and the `smart contracts` development using `Hardhat`.

## What we learned

We learned about Blockchain, Smart Contracts (continue..)

## What's next for Calmecac

(add nexts contributions or proccess about applications..)

## Intructions to run the projects

- FrontEnd
```bash

cd app (continue...)

```
- BackEnd:
```bash

cd server (continue...)

```
- Blockchain:
```bash

cd smartcontracts
npx hardhat test
npx hardhat run scripts/deployStaking.js --network fuji

To deploy the contracts on the Fuji testnet you need the RPC URL and the Private Key of the wallet
to use:

FUJI_RPC_URL="FUJI_RPC_URL" // RPC URL FUJI Test Network
PRIVATE_KEY='PRIVATE_KEY' // your private key 
```
Note: 
```bash 
    Item memory item = marketplace.getItem(itemId);
    //require( block.timestamp - item.createdAt > 4 weeks, "You must wait at least 4 weeks to distribute royalties" );
    // To run the tests it is necessary to comment this validation and run them

    To run the tests correctly, it is necessary to comment line 74 of the StakingCumulative.sol smart contract. Because it has restrictions to every 4 weeks of staking time.
```
 ## Staking 

 As a first version, Staking was added to receive commission as follows:
 ```bash
 - creator profit: 1%.
 - owner profit = 0.5%
 - org profit = 0.467%
 - referral 1 profit = 0.03%
 - referral 2 profit = 0.003%
```
Features :
```bash
- Referrals (second version)
- Marketplace of sales on NFTs with access, benefits and royalties (second version)
```
## Contributing ✨

When contributing to this repository, please first discuss the change you wish to make via issue, email or any other method with the owners of this repository before making a change.
Contributions are what make the open-source community such an amazing place to learn, inspire and create. Any contributions you make are greatly appreciated

You can learn more about how you can contribute to this project in the [contribution guide](https://docs.github.com/en/communities/setting-up-your-project-for-healthy-contributions/setting-guidelines-for-repository-contributors).

## Supporting 🍺

I believe in Unicorns 🦄 Support me, if you do too.

Donate ETH, BNB, AVAX, MATIC, DOT :

Wallet address: 0x86a35225248fdD2049F9F0072255E4d16F5697Ae

Please let us know your contributions! 🙏🏻

## Happy Coding 💯

Made with ❤️

## Meet the Team

- [Enrique Sevilla](https://github.com/SxVx)
- [Luis Lucena](https://bio.link/luislucena)
- [Emmanuel Canto](https://github.com/Oblivion95)
- [Alex Ramos](https://www.linkedin.com/in/alejandro-ramos-morales-68a3b0227/)
- [Laura Fajardo](https://www.instagram.com/_lausof_/)