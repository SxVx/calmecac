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

We learned about `Blockchain`, `Smart Contracts`, `Hardhat`, `Avalanche`, `ORM Sequelize`, `MariaDB`, `Express`, `AWS`, `Docker`, `React`, `React Native`, `Styled Components`, `Axios`.
## What's next for Calmecac

- Referrals
- Marketplace of sales on NFTs with access, benefits and royalties
- The next steps on our roadmap
- Verification in 2 steps to all users
- Implement security against cross-site  scripting (XSS)
- Use Lens Protocol to make a community
- Have 50 users at month
- Storage on IPFS
- Implement: Tech courses, Design courses and languages courses
- Active notification to the users with push protocol

## Intructions to run the projects

- FrontEnd
```bash

cd app && yarn/npm && yarn/npm android

By using the sequence of commands aboves, the project for android will be bundled and ready to work on.

```
- BackEnd:
```bash

cd server

# Create the .env file to start the project from the .env.example it is necessary to include an S3 bucket service
cp .env.example .env
# Install packages npm
npm i
# Crate BD en MariaDB and access phpmyadmin,for more information check config docker-compose-yml
docker-compose up .
# Create and initialize the database
npm run db:drop && npm run db:create && npm run migrate && npm run seed
# run project in development, check package.json for others scripts
npm run dev

#Note:If you don't have docker configured you can manually add the environment variables for mariadb

There is a file "Camecal.postman_collection.json" that can provisionally serve as a reference to use the api.
This file is to work with POSTMAN, the authenticated is by Bearer Token
```
- Blockchain:
```bash

$ cd smartcontracts
$ npx hardhat test
$ npx hardhat run scripts/deployStaking.js --network fuji
```
To deploy the contracts on the Fuji testnet you need the RPC URL and the Private Key of the wallet
to use:

```bash
FUJI_RPC_URL="FUJI_RPC_URL" // RPC URL FUJI Test Network
PRIVATE_KEY='PRIVATE_KEY' // your private key
```
Note:
```bash
    Item memory item = marketplace.getItem(itemId);
    //require( block.timestamp - item.createdAt > 4 weeks, "You must wait at least 4 weeks to distribute royalties" );
    // To run the tests it is necessary to comment this validation and run them

To run the tests correctly, it is necessary to comment line 74 of the StakingCumulative.sol smart contract.
Because it has restrictions to every 4 weeks of staking time.
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