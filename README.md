# Token-Contract-for-Digital-Assets

## Description

The token name is Dalas, its symbol is DLS and its supply is 1,000,000. 
It has minting and transferring functionality and event log that tracks all transactions.
The URL to the landing page is https://token-contract-for-digital-assets-m9i2.vercel.app/ 

## Features

- **The token name is Dalas, its symbol is DLS and its total supply is 1,000,000.**
- **Minting and Transferring Functionality:** Supports minting new tokens and transferring tokens between users.
- **Event Log:** Records transaction details for minting and transferring tokens.

## Tech Stack

- **Language:** Solidity, JavaScript
- **Framework:** React, Avalanche, Node.js
- **Tools:** Hardhat

## Setup Instructions

### 1. Clone the repository:

```bash
git clone https://github.com/Avalanche-Team1-DAO-Kenya/Token-Contract-for-Digital-Assets.git 
```
### 2. Install Dependencies:
```bash
npm installl
```
### 3. Compile the Contracts: 
```bash
npx hardhat compile
```
### 4. Configure the Avalanche Network
Open the ```hardhat.config.js ```file and add your Avalanche network details under the networks section.
### 5. Deploy to Avalanche network:
```bash
npx hardhat run scripts/deploy.js --network avalanche
```
6. Run the Application Locally
```
npm start
```
Team Members
### 1. Bevon Mokua - Creating the landing page
### 2.Irene Nditi - Editing README.md
### 3. Kevin Kyuli - Deploying to the Avalanche C-chain
### 4. Dealan Wanganga - Creating the backend
### 5. Austine Karanja - Team Leader 

