# 🚀 FreshChain Quick Start Guide

Get FreshChain up and running fast!

## Choose Your Path

### 🎨 **Option 1: Remix IDE (5 Minutes - Easiest!)**

**Perfect for beginners - No installation needed!**

✅ Deploy in browser  
✅ No local setup  
✅ MetaMask only  

👉 **[Jump to Remix Quick Start](#remix-quick-start)** or see **[Full Remix Guide](REMIX_GUIDE.md)**

---

### ⚡ **Option 2: Hardhat (10 Minutes - Advanced)**

**For full development environment**

✅ Local testing  
✅ Automated deployment  
✅ Complete tooling  

👉 **[Continue to Hardhat Setup](#hardhat-setup)**

---

## 🎨 Remix Quick Start

### Prerequisites (2 minutes)

- [ ] MetaMask browser extension installed - [Install](https://metamask.io/)
- [ ] Sepolia testnet ETH in your wallet - [Get from faucet](https://sepoliafaucet.com/)

### Steps (3 minutes)

1. **Open Remix**: Go to [https://remix.ethereum.org](https://remix.ethereum.org)

2. **Create file**: Create `FreshChain.sol` and paste contract code from `contracts/FreshChain.sol`

3. **Compile**: Click Solidity Compiler → Select 0.8.20 → Compile

4. **Deploy**: 
   - Click Deploy & Run
   - Select "Injected Provider - MetaMask"
   - Connect MetaMask (Sepolia network)
   - Click Deploy
   - Confirm transaction

5. **Save address**: Copy the deployed contract address!

6. **Update frontend**: Edit `frontend/src/config.js` with your contract address

7. **Run frontend**:
   ```powershell
   cd frontend
   npm install
   npm start
   ```

**Done! 🎉** See full details in [REMIX_GUIDE.md](REMIX_GUIDE.md)

---

## ⚡ Hardhat Setup

### Prerequisites Checklist

- [ ] Node.js installed (check: `node --version`)
- [ ] MetaMask browser extension installed
- [ ] Sepolia testnet ETH in your wallet ([Get from faucet](https://sepoliafaucet.com/))
- [ ] Alchemy account created ([Sign up](https://www.alchemy.com/))

## Step-by-Step Setup

### 1️⃣ Install Dependencies (2 minutes)

```powershell
# In project root
npm install

# In frontend folder
cd frontend
npm install
cd ..
```

### 2️⃣ Configure Environment (2 minutes)

```powershell
# Copy the example file
Copy-Item .env.example .env
```

Edit `.env` with your details:
```
SEPOLIA_RPC_URL=https://eth-sepolia.g.alchemy.com/v2/YOUR-ALCHEMY-KEY
PRIVATE_KEY=your_metamask_private_key_without_0x
ETHERSCAN_API_KEY=your_etherscan_key_optional
```

### 3️⃣ Compile & Test (2 minutes)

```powershell
# Compile the smart contract
npx hardhat compile

# Run tests to verify everything works
npx hardhat test
```

Expected output: All tests should pass ✓

### 4️⃣ Deploy to Sepolia (2 minutes)

```powershell
npx hardhat run scripts/deploy.js --network sepolia
```

**IMPORTANT**: Save the contract address from the output!

### 5️⃣ Update Frontend Config (1 minute)

Edit `frontend/src/config.js`:

```javascript
export const CONTRACT_ADDRESS = "YOUR_CONTRACT_ADDRESS_HERE";
```

Replace `YOUR_CONTRACT_ADDRESS_HERE` with the address from step 4.

### 6️⃣ Start Frontend (1 minute)

```powershell
cd frontend
npm start
```

Browser will open at `http://localhost:3000` 🎉

## First Time Usage

### Connect Your Wallet
1. Click "Connect MetaMask Wallet"
2. Approve the connection
3. Ensure you're on Sepolia testnet

### Register Actors (Admin Only)
If you're the contract deployer:
1. Select "Admin" role
2. Register addresses for each role:
   - Producer (use your test account or create new one)
   - Transporter
   - Distributor
   - Retailer

### Test the Flow

**As Producer:**
1. Switch to "Producer" role
2. Create a batch (ID: 101, Product: "Tomatoes", Quantity: 100)
3. Note the batch ID

**As Transporter:**
1. Get ownership of the batch first
2. Switch to "Transporter" role
3. Add sensor data (Temp: 4, Humidity: 65, Location: "Bursa")

**As Customer:**
1. Switch to "Customer" role
2. Enter batch ID (101)
3. Click "View Batch History"
4. See the complete supply chain!

## Common Issues & Quick Fixes

### ❌ "Cannot find module"
```powershell
npm install
```

### ❌ "Wrong network"
Open MetaMask → Click network dropdown → Select "Sepolia"

### ❌ "Insufficient funds"
Get Sepolia ETH from: https://sepoliafaucet.com/

### ❌ "Transaction failed"
Check that you're registered for the role you're trying to use

### ❌ "Contract not deployed"
Make sure you completed step 4 and updated the contract address in step 5

## Useful Commands

```powershell
# Run tests
npx hardhat test

# Compile contracts
npx hardhat compile

# Deploy to local network
npx hardhat node                                    # Terminal 1
npx hardhat run scripts/deploy.js --network localhost  # Terminal 2

# Deploy to Sepolia
npx hardhat run scripts/deploy.js --network sepolia

# Verify on Etherscan
npx hardhat verify --network sepolia YOUR_CONTRACT_ADDRESS

# Start frontend
cd frontend; npm start
```

## Testing Multiple Roles

To test different roles, you'll need multiple MetaMask accounts:

1. **Create Test Accounts**:
   - Open MetaMask
   - Click your account icon
   - "Create Account" (repeat 4 times)

2. **Register Each Account**:
   - Use Admin panel to register each account
   - Account 1: Producer
   - Account 2: Transporter
   - Account 3: Distributor
   - Account 4: Retailer

3. **Switch Accounts**:
   - Click MetaMask extension
   - Select different account
   - Refresh the page
   - Perform role-specific actions

## Next Steps

1. ✅ Read the full README.md for detailed documentation
2. ✅ Review the smart contract code in `contracts/FreshChain.sol`
3. ✅ Explore the frontend code in `frontend/src/App.js`
4. ✅ Check out the test file in `test/FreshChain.test.js`
5. ✅ Read the project report in `PROJECT_REPORT.md`

## Support

Stuck? Check:
- 📖 README.md - Full documentation
- 🧪 Test files - Working examples
- 🔍 Hardhat docs - https://hardhat.org/docs
- 🦊 MetaMask docs - https://docs.metamask.io

## Project Structure Quick Reference

```
project_v1/
├── contracts/          → Smart contracts
├── scripts/           → Deployment scripts
├── test/              → Test files
├── frontend/          → React application
│   └── src/
│       ├── App.js     → Main component
│       └── config.js  → Contract config
├── hardhat.config.js  → Hardhat configuration
└── .env               → Your secrets (never commit!)
```

---

**Time to Complete**: ~10 minutes  
**Difficulty**: Beginner-friendly  
**Cost**: ~0.01 Sepolia ETH (free from faucet)

Happy building! 🥬⛓️
