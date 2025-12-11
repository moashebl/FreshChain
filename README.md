# 🥬 FreshChain - Blockchain-Based Food Traceability System

A decentralized supply chain tracking system built on Ethereum Sepolia blockchain for tracking perishable food products from farm to customer.

## 🌐 Live Demo

**Website:** [https://moashebl.github.io/FreshChain](https://moashebl.github.io/FreshChain)  
**GitHub:** [https://github.com/moashebl/FreshChain](https://github.com/moashebl/FreshChain)  
**Contract:** [0xBBeEd68A4754C2bdb5e94940285382aB5DFA198C](https://sepolia.etherscan.io/address/0xBBeEd68A4754C2bdb5e94940285382aB5DFA198C)  
**Network:** Sepolia Testnet

## 🚀 Quick Start Options

Choose your preferred deployment method:

- **🌐 [Deploy to GitHub Pages](DEPLOYMENT_COMMANDS.md)** - Publish your website online (Recommended for submission)
- **🎨 [Remix IDE (Recommended for Beginners)](REMIX_GUIDE.md)** - No installation needed, deploy in browser
- **⚡ Hardhat (Advanced)** - Full development environment (instructions below)

## 📋 Project Overview

**FreshChain** is a blockchain-based food traceability and quality verification system that enables complete transparency in the food supply chain. Each batch of product is tracked through multiple actors with tamper-proof records stored on the blockchain.

### Key Features

- ✅ **Multi-Actor System**: Admin, Producer, Transporter, Distributor, Retailer, Customer
- ✅ **Batch Tracking**: Unique identification and tracking of food batches
- ✅ **Environmental Monitoring**: Temperature and humidity logging during transport
- ✅ **Ownership Transfer**: Transparent transfer of batch ownership
- ✅ **Quality Inspection**: Final inspection by retailer before sale
- ✅ **QR Code Integration**: Customer-friendly product history viewing
- ✅ **Tamper-Proof Records**: Immutable blockchain storage

## 🏗️ System Architecture

### Supply Chain Flow

```
Farmer → Transporter → Distributor → Retailer → Customer
   ↓          ↓            ↓            ↓          ↓
[Create]  [Monitor]   [Receive]    [Inspect]   [Verify]
[Transfer] [Transfer]  [Transfer]   [QR Code]   [View]
```

### Smart Contract Structure

- **Role Management**: Admin registers all supply chain actors
- **Batch Creation**: Farmers initialize product batches
- **Sensor Data**: Transporters log environmental conditions
- **Ownership Transfer**: Transparent transfer between actors
- **Quality Control**: Retailer inspection and approval
- **Customer View**: Public access to complete batch history

## 📁 Project Structure

```
project_v1/
├── contracts/
│   └── FreshChain.sol          # Main smart contract
├── scripts/
│   └── deploy.js               # Deployment script
├── test/
│   └── FreshChain.test.js      # Contract tests
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── App.js              # Main React component
│   │   ├── App.css             # Styling
│   │   ├── index.js            # React entry point
│   │   └── config.js           # Contract configuration
│   └── package.json
├── hardhat.config.js           # Hardhat configuration
├── package.json                # Node.js dependencies
├── .env.example                # Environment variables template
└── README.md                   # This file
```

## 🚀 Installation & Setup

### ⚡ Quick Start with Remix IDE (Recommended)

**Want to deploy quickly without local setup?**

👉 **[Follow the Remix IDE Guide](REMIX_GUIDE.md)** for instant deployment using your browser!

No installation needed - just MetaMask and your browser! 🎨

---

### 🔧 Advanced Setup with Hardhat

For full development environment with testing and automation:

### Prerequisites

- Node.js (v16 or higher) - [Download](https://nodejs.org/)
- MetaMask wallet extension - [Install](https://metamask.io/)
- Sepolia testnet ETH - [Get from Faucet](https://sepoliafaucet.com/)

### Step 1: Install Dependencies

```powershell
# Install Hardhat dependencies
npm install

# Install frontend dependencies
cd frontend
npm install
cd ..
```

### Step 2: Configure Environment

1. Copy `.env.example` to `.env`:
```powershell
Copy-Item .env.example .env
```

2. Edit `.env` and add your credentials:
```
SEPOLIA_RPC_URL=https://eth-sepolia.g.alchemy.com/v2/YOUR-API-KEY
PRIVATE_KEY=your_private_key_without_0x_prefix
ETHERSCAN_API_KEY=your_etherscan_api_key
```

**Getting Your Credentials:**

- **Sepolia RPC URL**: 
  1. Sign up at [Alchemy](https://www.alchemy.com/)
  2. Create a new app on Sepolia testnet
  3. Copy the HTTPS URL

- **Private Key**: 
  1. Open MetaMask
  2. Click the three dots → Account details → Export Private Key
  3. **⚠️ NEVER share this key!**

- **Etherscan API Key**:
  1. Sign up at [Etherscan](https://etherscan.io/)
  2. Go to API-KEYs section
  3. Create a new API key

### Step 3: Compile Smart Contract

```powershell
npx hardhat compile
```

### Step 4: Run Tests

```powershell
npx hardhat test
```

### Step 5: Deploy to Sepolia

```powershell
npx hardhat run scripts/deploy.js --network sepolia
```

**Save the contract address** from the output!

### Step 6: Update Frontend Configuration

Edit `frontend/src/config.js`:

```javascript
export const CONTRACT_ADDRESS = "YOUR_DEPLOYED_CONTRACT_ADDRESS";
```

### Step 7: Start Frontend

```powershell
cd frontend
npm start
```

The application will open at `http://localhost:3000`

## 📖 User Guide

### Admin Role

**Purpose**: Register all supply chain actors

**Actions**:
1. Connect MetaMask wallet (must be contract owner)
2. Select "Admin" role
3. Enter actor's wallet address
4. Click the appropriate register button:
   - Register Producer
   - Register Transporter
   - Register Distributor
   - Register Retailer

### Producer (Farmer) Role

**Purpose**: Create product batches and transfer to transporters

**Actions**:

1. **Create New Batch**:
   - Enter unique Batch ID (e.g., 101)
   - Enter Product Name (e.g., "Tomatoes")
   - Enter Quantity in kg (e.g., 100)
   - Click "Create Batch"

2. **Transfer Batch**:
   - Enter Batch ID
   - Enter Transporter's wallet address
   - Click "Transfer Ownership"

### Transporter Role

**Purpose**: Log environmental data and transfer batches

**Actions**:

1. **Add Sensor Data**:
   - Enter Batch ID
   - Enter Temperature (-10°C to 40°C)
   - Enter Humidity (0% to 100%)
   - Enter Current Location (e.g., "Bursa")
   - Click "Add Sensor Data"
   - Repeat for each checkpoint

2. **Transfer to Distributor**:
   - Enter Batch ID
   - Enter Distributor's wallet address
   - Click "Transfer Ownership"

### Distributor Role

**Purpose**: Receive and transfer batches to retailers

**Actions**:
1. Receive batch from transporter (ownership transferred automatically)
2. **Transfer to Retailer**:
   - Enter Batch ID
   - Enter Retailer's wallet address
   - Click "Transfer Ownership"

### Retailer Role

**Purpose**: Final inspection and QR code generation

**Actions**:

1. **Mark Batch as Arrived**:
   - Enter Batch ID
   - Select Inspection Result (Passed/Failed)
   - Click "Mark as Arrived"

2. **Generate QR Code**:
   - Enter Batch ID
   - QR code will be displayed
   - Print or display QR code on product

### Customer Role

**Purpose**: View complete product history

**Actions**:
1. Scan QR code on product (or manually enter Batch ID)
2. Click "View Batch History"
3. View complete information:
   - Product details
   - Producer information
   - Ownership history
   - Temperature/humidity logs
   - Quality inspection result

## 🔧 Smart Contract Functions

### Admin Functions

```solidity
function registerProducer(address producer) external onlyOwner
function registerTransporter(address transporter) external onlyOwner
function registerDistributor(address distributor) external onlyOwner
function registerRetailer(address retailer) external onlyOwner
```

### Producer Functions

```solidity
function createBatch(uint batchId, string memory productName, uint quantity) external onlyProducer
```

### Transporter Functions

```solidity
function addSensorData(uint batchId, int temperature, int humidity, string memory location) external onlyTransporter
```

### Transfer Functions (Multiple Actors)

```solidity
function transferOwnership(uint batchId, address newOwner) external
```

### Retailer Functions

```solidity
function markAsArrived(uint batchId, bool passedInspection) external onlyRetailer
```

### View Functions (Public)

```solidity
function getBatchHistory(uint batchId) public view returns (...)
function getSensorReadings(uint batchId) public view returns (...)
function getBatchInfo(uint batchId) public view returns (...)
function getActorRole(address actor) public view returns (string memory)
```

## 📊 Example Data Flow

### Complete Supply Chain Example

```
1. ADMIN registers all actors
   - Producer: 0x1234...
   - Transporter: 0x5678...
   - Distributor: 0x9abc...
   - Retailer: 0xdef0...

2. PRODUCER creates Batch #101
   - Product: "Tomatoes"
   - Quantity: 100 kg
   
3. PRODUCER transfers to TRANSPORTER

4. TRANSPORTER logs sensor data
   - Stop 1: 4°C, 65%, Bursa
   - Stop 2: 5°C, 68%, Kocaeli
   - Stop 3: 6°C, 70%, Istanbul

5. TRANSPORTER transfers to DISTRIBUTOR

6. DISTRIBUTOR transfers to RETAILER

7. RETAILER marks as arrived
   - Inspection: PASSED ✓

8. RETAILER generates QR code

9. CUSTOMER scans QR code
   - Views complete history
   - Sees all sensor readings
   - Verifies quality inspection
```

## 🔒 Security Features

- **Role-Based Access Control**: Only authorized actors can perform specific actions
- **Owner-Only Registration**: Only contract owner can register new actors
- **Current Owner Validation**: Only current owner can transfer batch
- **Batch Existence Checks**: Prevents operations on non-existent batches
- **Input Validation**: Temperature and humidity ranges validated
- **Immutable Records**: Blockchain ensures data cannot be altered

## 🧪 Testing

Run the comprehensive test suite:

```powershell
npx hardhat test
```

Test coverage includes:
- Actor registration
- Batch creation
- Sensor data logging
- Ownership transfers
- Retailer inspection
- Access control validation
- Input validation

## 🌐 Deployment

### Local Hardhat Network (Development)

```powershell
# Terminal 1: Start local node
npx hardhat node

# Terminal 2: Deploy
npx hardhat run scripts/deploy.js --network localhost
```

### Sepolia Testnet (Testing)

```powershell
npx hardhat run scripts/deploy.js --network sepolia
```

### Verify on Etherscan

```powershell
npx hardhat verify --network sepolia YOUR_CONTRACT_ADDRESS
```

## 📱 Frontend Features

### Technology Stack
- **React**: UI framework
- **ethers.js**: Blockchain interaction
- **qrcode.react**: QR code generation
- **CSS3**: Modern styling with gradients

### Key Features
- Wallet connection with MetaMask
- Role-based interface
- Real-time transaction feedback
- QR code generation and display
- Responsive design
- Form validation
- Loading states
- Error handling

## 🐛 Troubleshooting

### Common Issues

**Problem**: "MetaMask not connected"
- **Solution**: Install MetaMask extension and create/import wallet

**Problem**: "Wrong network"
- **Solution**: Switch to Sepolia testnet in MetaMask

**Problem**: "Insufficient funds"
- **Solution**: Get Sepolia ETH from [faucet](https://sepoliafaucet.com/)

**Problem**: "Transaction failed"
- **Solution**: Check that you're registered for the role you're trying to use

**Problem**: "Contract address not set"
- **Solution**: Update `frontend/src/config.js` with deployed contract address

**Problem**: "Temperature out of range"
- **Solution**: Ensure temperature is between -10°C and 40°C

**Problem**: "Only owner can call this"
- **Solution**: Use the wallet address that deployed the contract for admin functions

## 📈 Future Enhancements

- [ ] Add IPFS integration for product images
- [ ] Implement GPS tracking
- [ ] Add automated alerts for temperature violations
- [ ] Create mobile app version
- [ ] Add multi-language support
- [ ] Implement analytics dashboard
- [ ] Add NFT certificates for batches
- [ ] Integrate IoT sensor devices

## 📄 License

MIT License - See LICENSE file for details

## 👥 Project Team

**Course**: Blockchain Development  
**Project**: FreshChain Food Traceability System  
**Year**: 2025

## 📞 Support

For issues or questions:
1. Check troubleshooting section
2. Review Hardhat documentation: https://hardhat.org/docs
3. Check ethers.js documentation: https://docs.ethers.org
4. Sepolia Etherscan: https://sepolia.etherscan.io

## 🎯 Project Deliverables Checklist

- [x] Smart Contract (Solidity)
  - [x] Batch struct with all required fields
  - [x] Events for all major actions
  - [x] Role-based access control
  - [x] All required functions implemented

- [x] Frontend UI
  - [x] Role selection menu
  - [x] Admin panel for registration
  - [x] Producer panel for batch creation
  - [x] Transporter panel for sensor data
  - [x] Distributor panel for transfers
  - [x] Retailer panel with QR generation
  - [x] Customer panel for viewing history
  - [x] MetaMask integration
  - [x] Form validation

- [x] Documentation
  - [x] Installation instructions
  - [x] User guide for each role
  - [x] Deployment instructions
  - [x] Example data flow
  - [x] Troubleshooting guide

---

**Built with ❤️ using Ethereum, Hardhat, React, and ethers.js**
