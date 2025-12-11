# 🎨 FreshChain - Remix IDE Deployment Guide

## Quick Guide to Deploy FreshChain Using Remix IDE

This guide shows you how to deploy and interact with FreshChain using Remix IDE instead of Hardhat.

## 📋 Prerequisites

1. ✅ **MetaMask** browser extension installed
2. ✅ **Sepolia testnet ETH** (get from [Sepolia Faucet](https://sepoliafaucet.com/))
3. ✅ **MetaMask configured** for Sepolia testnet

## 🦊 Step 1: Configure MetaMask for Sepolia

### Add Sepolia Network (if not already added)

1. Open MetaMask
2. Click the network dropdown at the top
3. Click "Add Network" or "Add a network manually"
4. Enter the following details:

   - **Network Name**: Sepolia
   - **RPC URL**: `https://ethereum-sepolia-rpc.publicnode.com`
   - **Chain ID**: `11155111`
   - **Currency Symbol**: `ETH`
   - **Block Explorer**: `https://sepolia.etherscan.io`

5. Click "Save"
6. Switch to Sepolia network

### Get Sepolia Test ETH

1. Visit [Sepolia Faucet](https://sepoliafaucet.com/)
2. Enter your MetaMask address
3. Request test ETH
4. Wait for confirmation (usually 1-2 minutes)

## 🎨 Step 2: Deploy Contract Using Remix

### 2.1 Open Remix IDE

1. Go to [https://remix.ethereum.org](https://remix.ethereum.org)
2. You'll see the Remix IDE interface

### 2.2 Create the Smart Contract File

1. In the **File Explorer** (left sidebar), click the "+" icon to create a new file
2. Name it: `FreshChain.sol`
3. Copy the entire contract code from `contracts/FreshChain.sol` in this project
4. Paste it into Remix

### 2.3 Compile the Contract

1. Click on the **"Solidity Compiler"** tab (left sidebar, looks like an "S")
2. Select compiler version: **0.8.20** or higher
3. Click **"Compile FreshChain.sol"** button
4. Wait for compilation (you should see a green checkmark)

### 2.4 Deploy the Contract

1. Click on the **"Deploy & Run Transactions"** tab (left sidebar)
2. In the **ENVIRONMENT** dropdown, select **"Injected Provider - MetaMask"**
3. MetaMask will pop up - click **"Connect"** to allow Remix to access your wallet
4. Confirm you're on **Sepolia testnet** in MetaMask
5. Select **"FreshChain"** from the CONTRACT dropdown
6. Click the orange **"Deploy"** button
7. MetaMask will pop up - review the transaction and click **"Confirm"**
8. Wait for deployment (10-30 seconds)

### 2.5 Save Your Contract Address

Once deployed, you'll see the contract under **"Deployed Contracts"**:

1. Click the copy icon next to the contract address
2. **IMPORTANT**: Save this address! You'll need it for the frontend
3. Example: `0x1234567890abcdef1234567890abcdef12345678`

## 🔧 Step 3: Interact with Contract in Remix

### Test Your Contract

In the **Deployed Contracts** section, expand your FreshChain contract:

#### As Admin (Contract Owner):

1. **Register a Producer**:
   - Expand `registerProducer`
   - Enter a test address (or your own): `0xYourTestAddress`
   - Click "transact"
   - Confirm in MetaMask

2. **Register a Transporter**:
   - Expand `registerTransporter`
   - Enter another address
   - Click "transact"

3. **Register other roles** (Distributor, Retailer) the same way

#### As Producer:

1. Switch to your producer account in MetaMask
2. **Create a Batch**:
   - Expand `createBatch`
   - Enter:
     - `batchId`: `101`
     - `productName`: `"Tomatoes"`
     - `quantity`: `100`
   - Click "transact"
   - Confirm in MetaMask

#### View Functions (Anyone):

1. **Get Batch History**:
   - Expand `getBatchHistory`
   - Enter `batchId`: `101`
   - Click "call" (blue button - no gas needed)
   - See the batch information!

## 🌐 Step 4: Update Frontend Configuration

### 4.1 Update Contract Address

Edit `frontend/src/config.js`:

```javascript
// Replace with your deployed contract address from Remix
export const CONTRACT_ADDRESS = "0xYOUR_CONTRACT_ADDRESS_HERE";
```

### 4.2 Verify Network Configuration

Make sure the network config matches Sepolia:

```javascript
export const NETWORK_CONFIG = {
  chainId: '0xaa36a7', // Sepolia testnet
  chainName: 'Sepolia',
  rpcUrls: ['https://ethereum-sepolia-rpc.publicnode.com'],
  blockExplorerUrls: ['https://sepolia.etherscan.io']
};
```

## 🚀 Step 5: Run Frontend

### 5.1 Install Frontend Dependencies

```powershell
cd frontend
npm install
```

### 5.2 Start the Application

```powershell
npm start
```

The application will open at `http://localhost:3000`

### 5.3 Connect MetaMask

1. Click **"Connect MetaMask Wallet"**
2. Approve the connection
3. Make sure you're on **Sepolia network**

## 🎯 Step 6: Test Complete Flow

### As Admin:
1. Select "Admin" role
2. Register addresses for each role (use different MetaMask accounts if you have them)

### As Producer:
1. Switch MetaMask to producer account
2. Select "Producer" role
3. Create a batch (ID: 101, Product: "Tomatoes", Quantity: 100)

### As Transporter:
1. Switch MetaMask to transporter account
2. Select "Transporter" role
3. Add sensor data (Temp: 4, Humidity: 65, Location: "Bursa")

### As Customer:
1. Select "Customer" role
2. Enter batch ID: 101
3. View complete history!

## 📍 Verify on Etherscan

1. Go to [https://sepolia.etherscan.io](https://sepolia.etherscan.io)
2. Paste your contract address
3. View all transactions
4. See contract interactions

## 🔍 Remix Tips & Tricks

### Useful Remix Features:

1. **Debug Transactions**: 
   - Click on any transaction in the terminal
   - Click "Debug" to step through execution

2. **View Events**:
   - Check the Remix terminal at the bottom
   - See emitted events from your transactions

3. **Switch Accounts**:
   - Change accounts in MetaMask
   - Remix will automatically use the new account

4. **Copy Contract ABI**:
   - In the Compiler tab, scroll down
   - Click "ABI" to copy (useful for frontend)

## 🐛 Troubleshooting

### Problem: MetaMask not connecting
- **Solution**: Refresh Remix page, try connecting again

### Problem: "Gas estimation failed"
- **Solution**: Check you're using the right account for the role

### Problem: "User denied transaction"
- **Solution**: Check gas fees aren't too high, approve transaction

### Problem: Contract not appearing after deploy
- **Solution**: Wait a bit longer, check Sepolia Etherscan

### Problem: Function call fails
- **Solution**: Make sure your account is registered for that role

## 📊 Remix vs Hardhat Comparison

| Feature | Remix | Hardhat |
|---------|-------|---------|
| Setup | ✅ Instant (web-based) | Requires npm install |
| Deployment | ✅ Simple (UI-based) | Terminal commands |
| Testing | Manual interaction | Automated tests |
| Development | ✅ Great for learning | Better for production |
| Debugging | ✅ Built-in debugger | Console logs |

## 🎓 Learning with Remix

### Things to Try:

1. **Deploy and interact** with all contract functions
2. **Test access control** by calling functions with wrong roles
3. **Create multiple batches** and track them
4. **View events** in the Remix terminal
5. **Debug transactions** to understand execution

## 📝 Quick Reference Card

### Essential Remix Actions:

```
📁 Create File    → contracts/FreshChain.sol
🔨 Compile        → Solidity Compiler → Compile
🚀 Deploy         → Deploy & Run → Injected Provider → Deploy
🔗 Interact       → Deployed Contracts → Expand functions
👀 View           → Blue buttons (call - free)
✏️ Modify         → Orange buttons (transact - costs gas)
```

### MetaMask Actions:

```
🦊 Connect        → Allow Remix access
🌐 Switch Network → Sepolia
💸 Confirm Tx     → Review and approve
👤 Switch Account → Change active account
```

## 🎉 Success Checklist

- [ ] MetaMask installed and configured for Sepolia
- [ ] Sepolia test ETH in wallet
- [ ] Contract deployed via Remix
- [ ] Contract address saved
- [ ] Tested functions in Remix
- [ ] Frontend config updated
- [ ] Frontend running and connected
- [ ] Can create batches and view history

## 🌟 Next Steps

1. **Register all actors** via Remix or frontend
2. **Create test batches** and track them
3. **Add sensor data** at different locations
4. **Transfer ownership** between actors
5. **Mark as arrived** at retailer
6. **Generate QR codes** for customers
7. **View complete history** on frontend

## 📞 Additional Resources

- **Remix Documentation**: https://remix-ide.readthedocs.io
- **Sepolia Etherscan**: https://sepolia.etherscan.io
- **MetaMask Guide**: https://metamask.io/faqs/
- **Sepolia Faucet**: https://sepoliafaucet.com/

---

**You're now ready to use FreshChain with Remix IDE and Sepolia! 🎉**

**Advantages of Remix:**
- ✅ No local installation needed
- ✅ Instant deployment
- ✅ Built-in debugger
- ✅ Perfect for learning and testing
- ✅ Direct MetaMask integration

Happy coding! 🥬⛓️
