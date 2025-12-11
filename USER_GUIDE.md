# 📖 FreshChain Complete User Guide

## Table of Contents
1. [Getting Started](#getting-started)
2. [Admin Role - Complete Guide](#admin-role)
3. [Producer Role - Complete Guide](#producer-role)
4. [Transporter Role - Complete Guide](#transporter-role)
5. [Distributor Role - Complete Guide](#distributor-role)
6. [Retailer Role - Complete Guide](#retailer-role)
7. [Customer Role - Complete Guide](#customer-role)
8. [Testing Complete Supply Chain Flow](#testing-flow)
9. [Troubleshooting](#troubleshooting)

---

## 🚀 Getting Started {#getting-started}

### Prerequisites Checklist

Before you start, make sure you have:

- ✅ **MetaMask installed** in your browser
- ✅ **Sepolia testnet configured** in MetaMask
- ✅ **Test ETH** in your wallet (get from [Sepolia Faucet](https://sepoliafaucet.com/))
- ✅ **Contract deployed** at: `0x7f0c7f13908Cff58207637Cba7a3FE12105f9b56`
- ✅ **Frontend running** at: `http://localhost:3000`

### Initial Setup Steps

#### Step 1: Configure MetaMask for Sepolia

1. Open MetaMask
2. Click the network dropdown (top left)
3. Click "Add Network" or "Show test networks"
4. Select "Sepolia Test Network"
5. Make sure you see "Sepolia" at the top

**Network Details:**
- Network Name: Sepolia
- RPC URL: https://ethereum-sepolia-rpc.publicnode.com
- Chain ID: 11155111
- Currency Symbol: ETH
- Block Explorer: https://sepolia.etherscan.io

#### Step 2: Get Test ETH

1. Go to [https://sepoliafaucet.com/](https://sepoliafaucet.com/)
2. Enter your MetaMask wallet address
3. Click "Send Me ETH"
4. Wait 1-2 minutes for ETH to arrive
5. Check your MetaMask balance

**How much ETH do you need?**
- Admin operations: ~0.01 ETH (for registering actors)
- Producer operations: ~0.005 ETH per batch
- Other roles: ~0.002 ETH per transaction
- **Recommended:** Get at least 0.05 ETH for full testing

#### Step 3: Start the Frontend

```powershell
# Navigate to frontend folder
cd C:\Users\Royal\Desktop\blockchain\project_v1\frontend

# Start the development server
npm start
```

The application will open at `http://localhost:3000`

#### Step 4: Connect Your Wallet

1. Open `http://localhost:3000` in your browser
2. Click the **"Connect Wallet"** button
3. MetaMask will pop up - click **"Next"**
4. Click **"Connect"**
5. You should see your wallet address displayed

**What you'll see:**
```
Connected: 0x1234...5678
Network: Sepolia (11155111)
Your Role: [Will show your role if registered]
```

---

## 👑 Admin Role - Complete Guide {#admin-role}

### Who is the Admin?

The **Admin** is the person who deployed the smart contract. This is the ONLY address that can register other actors in the system.

**Your Admin Address:** The wallet you used to deploy the contract on Remix

### Admin Responsibilities

✅ Register Producers (Farmers)
✅ Register Transporters (Logistics companies)
✅ Register Distributors (Warehouses)
✅ Register Retailers (Shops)
✅ Monitor the system
✅ View all batches and actors

### How to Use Admin Panel

#### Step 1: Connect as Admin

1. Open MetaMask
2. **Switch to the wallet address that deployed the contract**
3. Go to `http://localhost:3000`
4. Click "Connect Wallet"
5. You should see: **"Your Role: Owner (Admin)"**

**If you don't see "Owner (Admin)":**
- You're using the wrong wallet address
- Switch to the address that deployed the contract in Remix

#### Step 2: Register a Producer

**Scenario:** A farmer named "Green Valley Farm" wants to join the system.

1. In the **Admin Panel**, find the **"Register Producer"** section
2. Ask the farmer for their MetaMask wallet address
3. Enter the address in the input field
   - Example: `0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb`
4. Click **"Register Producer"**
5. MetaMask will pop up asking you to confirm the transaction
6. Review the gas fee (should be ~0.002-0.005 ETH)
7. Click **"Confirm"**
8. Wait for transaction confirmation (10-30 seconds)
9. You'll see a success message: ✅ **"Producer registered successfully!"**

**What happens behind the scenes:**
```solidity
// The smart contract marks this address as a producer
isProducer[0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb] = true;
```

**Transaction Details:**
- Gas Used: ~50,000 gas
- Cost: ~0.003 ETH
- Confirmation Time: 10-30 seconds

#### Step 3: Register a Transporter

**Scenario:** A logistics company "FastDeliver" wants to join.

1. Get the transporter's wallet address
2. In the **"Register Transporter"** section
3. Enter the address: `0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199`
4. Click **"Register Transporter"**
5. Confirm in MetaMask
6. Wait for confirmation
7. Success: ✅ **"Transporter registered successfully!"**

#### Step 4: Register a Distributor

**Scenario:** A warehouse "ColdStorage Inc." wants to join.

1. Get the distributor's wallet address
2. In the **"Register Distributor"** section
3. Enter the address: `0xdD2FD4581271e230360230F9337D5c0430Bf44C0`
4. Click **"Register Distributor"**
5. Confirm in MetaMask
6. Success: ✅ **"Distributor registered successfully!"**

#### Step 5: Register a Retailer

**Scenario:** A grocery store "FreshMart" wants to join.

1. Get the retailer's wallet address
2. In the **"Register Retailer"** section
3. Enter the address: `0xbDA5747bFD65F08deb54cb465eB87D40e51B197E`
4. Click **"Register Retailer"**
5. Confirm in MetaMask
6. Success: ✅ **"Retailer registered successfully!"**

### Admin Best Practices

✅ **Keep a list of registered addresses**
   - Document who owns each address
   - Include company names and contact info

✅ **Verify identities before registration**
   - Confirm the business exists
   - Verify wallet ownership

✅ **Monitor the system regularly**
   - Check batch creation and transfers
   - Look for suspicious activity

✅ **Keep your admin wallet secure**
   - Never share your private key
   - Use a hardware wallet for production

### Common Admin Tasks

#### Check if an Address is Registered

1. Go to **"Check Actor Role"** section
2. Enter any wallet address
3. Click **"Check Role"**
4. You'll see one of:
   - "Owner (Admin)"
   - "Producer"
   - "Transporter"
   - "Distributor"
   - "Retailer"
   - "Not Registered"

#### View All Batches

1. In the **"All Batches"** section
2. Enter a batch ID (e.g., "BATCH001")
3. Click **"View Batch Details"**
4. You'll see:
   - Product name and quantity
   - Current owner
   - Creation timestamp
   - Full ownership history
   - All sensor readings

---

## 🌾 Producer Role - Complete Guide {#producer-role}

### Who is a Producer?

A **Producer** (farmer) is the starting point of the supply chain. They create product batches and transfer them to transporters.

### Producer Responsibilities

✅ Create new product batches
✅ Transfer batches to transporters
✅ Provide accurate product information
✅ Mark batches as ready for shipment

### How to Use Producer Panel

#### Step 1: Connect as Producer

1. Open MetaMask
2. **Switch to a wallet address that was registered as a Producer**
3. Go to `http://localhost:3000`
4. Click "Connect Wallet"
5. You should see: **"Your Role: Producer"**

**If you don't see "Producer":**
- Your address is not registered yet
- Ask the Admin to register your address
- Make sure you're on the correct network (Sepolia)

#### Step 2: Create Your First Batch

**Scenario:** You harvested organic tomatoes and want to create a batch.

1. In the **Producer Panel**, find **"Create New Batch"** section
2. Fill in the batch details:

   **Batch ID:** `BATCH001`
   - Must be unique
   - Use a system like: `BATCH001`, `BATCH002`, etc.
   - Or use dates: `TOM-2025-12-10-001`

   **Product Name:** `Organic Tomatoes`
   - Be descriptive
   - Include variety if relevant: "Roma Tomatoes"

   **Quantity:** `500`
   - Enter the number (in kg, units, boxes, etc.)
   - Choose your unit system and be consistent

3. Click **"Create Batch"**
4. MetaMask will pop up
5. Review the transaction:
   - Gas fee: ~0.005 ETH
   - Function: `createBatch`
6. Click **"Confirm"**
7. Wait 10-30 seconds
8. Success: ✅ **"Batch BATCH001 created successfully!"**

**What happens behind the scenes:**
```solidity
// Smart contract creates a new batch
batches[BATCH001] = Batch({
    batchId: "BATCH001",
    productName: "Organic Tomatoes",
    quantity: 500,
    currentOwner: 0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb, // Your address
    producer: 0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb,
    creationTime: 1702224000 // Current timestamp
    // ... other fields
});
```

#### Step 3: Transfer Batch to Transporter

**Scenario:** FastDeliver will pick up your tomatoes.

1. In the **"Transfer Batch"** section
2. Enter the batch ID: `BATCH001`
3. Enter the transporter's address: `0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199`
4. Click **"Transfer to Transporter"**
5. MetaMask confirmation appears
6. Click **"Confirm"**
7. Wait for confirmation
8. Success: ✅ **"Batch transferred to transporter!"**

**What happens:**
- Ownership changes from Producer → Transporter
- Current owner is now the transporter
- Ownership history is recorded
- Transfer timestamp is saved

#### Step 4: View Your Batches

1. In the **"Your Batches"** section
2. Enter batch ID: `BATCH001`
3. Click **"View Details"**
4. You'll see:
   ```
   Batch ID: BATCH001
   Product: Organic Tomatoes
   Quantity: 500 kg
   Current Owner: 0x8626...1199 (Transporter)
   Created By: You (0x742d...bEb)
   Created At: Dec 10, 2025, 10:30 AM
   
   Ownership History:
   1. Producer → Transporter (Dec 10, 2025, 11:00 AM)
   
   Status: In Transit
   ```

### Producer Tips

✅ **Use consistent batch IDs**
   - Example system: `PRODUCT-DATE-SEQUENCE`
   - `TOM-20251210-001`, `TOM-20251210-002`

✅ **Provide accurate quantities**
   - This affects the entire supply chain
   - Be honest about the amount

✅ **Create batches promptly**
   - Right after harvest/packaging
   - Fresh timestamp is important

✅ **Keep records offline too**
   - Write down batch IDs
   - Match them to your physical products

### Common Producer Scenarios

#### Scenario: Creating Multiple Batches

If you harvest multiple products:

1. Create `BATCH001` for Tomatoes
2. Create `BATCH002` for Lettuce
3. Create `BATCH003` for Cucumbers

Each batch is tracked independently!

#### Scenario: Batch Already Exists

If you try to create `BATCH001` again:
- ❌ Transaction will fail
- Error: "Batch ID already exists"
- Solution: Use `BATCH002` or a new unique ID

---

## 🚚 Transporter Role - Complete Guide {#transporter-role}

### Who is a Transporter?

A **Transporter** handles logistics and is responsible for monitoring environmental conditions during transit.

### Transporter Responsibilities

✅ Accept batches from producers
✅ Monitor temperature and humidity
✅ Log sensor readings regularly
✅ Transfer batches to distributors
✅ Ensure product quality during transit

### How to Use Transporter Panel

#### Step 1: Connect as Transporter

1. Open MetaMask
2. **Switch to your registered transporter address**
3. Go to `http://localhost:3000`
4. Click "Connect Wallet"
5. You should see: **"Your Role: Transporter"**

#### Step 2: Accept a Batch

When a producer transfers a batch to you:
- You automatically become the current owner
- You can now add sensor data
- You're responsible for the batch until you transfer it

#### Step 3: Add Sensor Data

**Scenario:** You're transporting BATCH001 and need to log conditions every hour.

**First Reading (Starting Point):**

1. In the **"Add Sensor Data"** section
2. Enter batch ID: `BATCH001`
3. Enter temperature: `4`
   - Range: -10°C to 40°C
   - For perishables: 2°C to 8°C is ideal
4. Enter humidity: `85`
   - Range: 0% to 100%
   - For vegetables: 80-95% is good
5. Enter location: `Producer Farm - Loading Area`
   - Be specific: include city, facility name
6. Click **"Add Sensor Data"**
7. Confirm in MetaMask
8. Success: ✅ **"Sensor data added!"**

**Second Reading (After 1 Hour):**

1. Same batch ID: `BATCH001`
2. Temperature: `5` (slightly warmed)
3. Humidity: `83`
4. Location: `Highway A1 - Mile Marker 45`
5. Add data
6. Confirm transaction

**Third Reading (Arrival):**

1. Batch ID: `BATCH001`
2. Temperature: `6`
3. Humidity: `82`
4. Location: `ColdStorage Inc. - Receiving Bay`
5. Add data

**What happens behind the scenes:**
```solidity
// Each sensor reading is stored in the blockchain
sensorData[BATCH001].push(SensorData({
    temperature: 4,
    humidity: 85,
    location: "Producer Farm - Loading Area",
    timestamp: 1702224000,
    recordedBy: 0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199
}));
```

#### Step 4: Mark Batch as Arrived

**Before transferring to distributor, mark arrival:**

1. In the **"Mark Arrived"** section
2. Enter batch ID: `BATCH001`
3. Click **"Mark as Arrived"**
4. Confirm in MetaMask
5. Success: ✅ **"Batch marked as arrived!"**

**What this does:**
- Sets `hasArrived = true` in the smart contract
- Signals that transport is complete
- Prepares batch for next stage

#### Step 5: Transfer to Distributor

**Scenario:** Delivering to ColdStorage Inc.

1. In the **"Transfer Batch"** section
2. Enter batch ID: `BATCH001`
3. Enter distributor address: `0xdD2FD4581271e230360230F9337D5c0430Bf44C0`
4. Click **"Transfer to Distributor"**
5. Confirm in MetaMask
6. Success: ✅ **"Batch transferred to distributor!"**

### Transporter Best Practices

✅ **Log sensor data regularly**
   - Every hour during transport
   - At every stop/checkpoint
   - When loading/unloading

✅ **Monitor temperature carefully**
   - Keep perishables cold (2-8°C)
   - Check refrigeration equipment
   - Alert if temperature rises

✅ **Valid temperature range: -10°C to 40°C**
   - Transaction will fail if outside this range
   - This is a safety feature

✅ **Valid humidity range: 0% to 100%**
   - Transaction will fail if outside this range
   - Always enter accurate readings

✅ **Be specific with locations**
   - Include GPS coordinates if possible
   - Use landmarks and addresses
   - Help trace the route

### Understanding Sensor Validation

The smart contract has built-in validation:

```solidity
require(temperature >= -10 && temperature <= 40, "Invalid temperature");
require(humidity >= 0 && humidity <= 100, "Invalid humidity");
```

**If you enter invalid values:**
- ❌ Transaction will revert
- You'll lose gas fees
- Error message will show why
- Fix the values and try again

### Viewing Sensor History

1. In the **"View Sensor Data"** section
2. Enter batch ID: `BATCH001`
3. Click **"View Sensor Readings"**
4. You'll see all readings:
   ```
   Reading 1:
   Temperature: 4°C
   Humidity: 85%
   Location: Producer Farm - Loading Area
   Time: Dec 10, 2025, 11:15 AM
   Recorded By: 0x8626...1199
   
   Reading 2:
   Temperature: 5°C
   Humidity: 83%
   Location: Highway A1 - Mile Marker 45
   Time: Dec 10, 2025, 12:15 PM
   Recorded By: 0x8626...1199
   
   Reading 3:
   Temperature: 6°C
   Humidity: 82%
   Location: ColdStorage Inc. - Receiving Bay
   Time: Dec 10, 2025, 1:15 PM
   Recorded By: 0x8626...1199
   ```

---

## 🏭 Distributor Role - Complete Guide {#distributor-role}

### Who is a Distributor?

A **Distributor** (warehouse, wholesaler) receives batches from transporters and stores them before sending to retailers.

### Distributor Responsibilities

✅ Accept batches from transporters
✅ Store products properly
✅ Monitor storage conditions
✅ Transfer batches to retailers
✅ Maintain cold chain if needed

### How to Use Distributor Panel

#### Step 1: Connect as Distributor

1. Open MetaMask
2. **Switch to your registered distributor address**
3. Go to `http://localhost:3000`
4. Click "Connect Wallet"
5. You should see: **"Your Role: Distributor"**

#### Step 2: Receive a Batch

When a transporter transfers a batch to you:
- You automatically become the current owner
- The batch is now in your warehouse
- You can add sensor data from storage
- You can transfer to retailers

#### Step 3: Add Storage Sensor Data

**Scenario:** BATCH001 is in your cold storage facility.

**Daily Storage Check:**

1. In the **"Add Sensor Data"** section
2. Enter batch ID: `BATCH001`
3. Temperature: `3` (cold storage)
4. Humidity: `90` (maintained)
5. Location: `ColdStorage Inc. - Bay 12, Shelf A3`
6. Click **"Add Sensor Data"**
7. Confirm in MetaMask
8. Success: ✅ **"Storage conditions logged!"**

**Why log storage data?**
- Proves proper storage conditions
- Shows cold chain was maintained
- Provides evidence for quality claims
- Required for food safety compliance

#### Step 4: Mark as Arrived (Optional)

If you want to mark that the batch arrived at your facility:

1. Enter batch ID: `BATCH001`
2. Click **"Mark as Arrived"**
3. Confirm in MetaMask

#### Step 5: Transfer to Retailer

**Scenario:** FreshMart orders the batch.

1. In the **"Transfer Batch"** section
2. Enter batch ID: `BATCH001`
3. Enter retailer address: `0xbDA5747bFD65F08deb54cb465eB87D40e51B197E`
4. Click **"Transfer to Retailer"**
5. Confirm in MetaMask
6. Wait for confirmation
7. Success: ✅ **"Batch transferred to retailer!"**

### Distributor Best Practices

✅ **Log conditions daily**
   - Morning and evening checks
   - After any equipment maintenance
   - During temperature fluctuations

✅ **Maintain proper storage**
   - Cold chain for perishables
   - Dry storage for non-perishables
   - Separate areas for different products

✅ **Inspect upon arrival**
   - Check product quality
   - Verify quantity matches records
   - Look for damage

✅ **Document storage location**
   - Include warehouse section
   - Note shelf/pallet number
   - Helps with inventory tracking

---

## 🏪 Retailer Role - Complete Guide {#retailer-role}

### Who is a Retailer?

A **Retailer** (grocery store, shop) is the final point before the customer. They inspect products and generate QR codes for customer verification.

### Retailer Responsibilities

✅ Accept batches from distributors
✅ Conduct final quality inspection
✅ Inspect product before sale
✅ Generate QR codes for customers
✅ Display product information

### How to Use Retailer Panel

#### Step 1: Connect as Retailer

1. Open MetaMask
2. **Switch to your registered retailer address**
3. Go to `http://localhost:3000`
4. Click "Connect Wallet"
5. You should see: **"Your Role: Retailer"**

#### Step 2: Receive a Batch

When a distributor transfers a batch to you:
- You become the current owner
- The batch is now in your store
- You can inspect it
- You can generate QR codes

#### Step 3: Inspect the Batch

**Scenario:** BATCH001 arrived at your store. You need to inspect it.

1. In the **"Inspect Batch"** section
2. Enter batch ID: `BATCH001`
3. **Physically inspect the product:**
   - Check for damage
   - Verify quantity (should be 500 kg)
   - Check freshness
   - Look for contamination
4. If everything is good, click **"Inspect & Approve"**
5. Confirm in MetaMask
6. Success: ✅ **"Batch inspection completed!"**

**What happens:**
```solidity
// Smart contract records the inspection
batches[BATCH001].hasBeenInspected = true;
batches[BATCH001].inspectionTime = block.timestamp;
```

**If the product is bad:**
- Don't approve the inspection
- Contact the distributor
- Document the issue
- Consider rejecting the batch

#### Step 4: Add Display Location

**Optional but helpful:**

1. In **"Add Sensor Data"** section
2. Enter batch ID: `BATCH001`
3. Temperature: `2` (refrigerated display)
4. Humidity: `75`
5. Location: `FreshMart Store - Produce Section, Display Case 3`
6. Add data
7. This shows customers where the product is

#### Step 5: Generate QR Code

**For customer scanning:**

1. In the **"Generate QR Code"** section
2. Enter batch ID: `BATCH001`
3. Click **"Generate QR Code"**
4. A QR code image will appear on screen

**What to do with the QR code:**
- **Print it out** (right-click → Save image)
- **Attach it to the product display**
- Customers can scan with their phones
- They'll see complete batch history

**QR Code contains:**
- Batch ID
- Link to view batch on blockchain
- All the history information

#### Step 6: View Complete History

Before putting products on display, review the history:

1. In **"View Batch History"** section
2. Enter batch ID: `BATCH001`
3. Click **"View Full History"**
4. You'll see:

```
=== BATCH DETAILS ===
Batch ID: BATCH001
Product: Organic Tomatoes
Quantity: 500 kg
Producer: 0x742d...bEb
Created: Dec 10, 2025, 10:30 AM
Current Owner: You (FreshMart)
Inspected: Yes ✅

=== OWNERSHIP HISTORY ===
1. Created by Producer: Dec 10, 2025, 10:30 AM
2. Transferred to Transporter: Dec 10, 2025, 11:00 AM
3. Transferred to Distributor: Dec 10, 2025, 1:30 PM
4. Transferred to Retailer (You): Dec 10, 2025, 3:00 PM

=== SENSOR READINGS (8 total) ===
Reading 1: 4°C, 85%, Producer Farm (10:35 AM)
Reading 2: 5°C, 83%, Highway A1 (11:15 AM)
Reading 3: 6°C, 82%, ColdStorage (1:15 PM)
Reading 4: 3°C, 90%, ColdStorage Bay 12 (2:00 PM)
Reading 5: 2°C, 75%, FreshMart Display (3:30 PM)

=== QUALITY STATUS ===
Temperature Range: 2-6°C ✅ (Good)
Humidity Range: 75-90% ✅ (Good)
Cold Chain Maintained: Yes ✅
Inspection Status: Approved ✅
```

### Retailer Best Practices

✅ **Always inspect before sale**
   - Physical inspection is critical
   - Don't approve bad products
   - Your approval matters to customers

✅ **Generate QR codes prominently**
   - Place them on or near products
   - Make them easy to scan
   - Include instructions: "Scan to see origin"

✅ **Display product information**
   - Show producer name
   - Show origin location
   - Highlight if organic/special

✅ **Monitor display conditions**
   - Log temperature of display cases
   - Ensure proper refrigeration
   - Check humidity for fresh produce

✅ **Educate customers**
   - Explain the traceability system
   - Show them how to scan QR codes
   - Build trust through transparency

---

## 👤 Customer Role - Complete Guide {#customer-role}

### Who is a Customer?

Anyone can view batch information! Customers don't need to be registered or have MetaMask to VIEW data (but they do need it to connect to the app).

### Customer Capabilities

✅ View complete batch history
✅ See all sensor readings
✅ Verify product origin
✅ Check quality conditions
✅ View ownership trail
✅ Scan QR codes

### How Customers Use the System

#### Method 1: Using the Web App

1. Go to `http://localhost:3000`
2. Click **"Connect Wallet"** (or skip if view-only)
3. You'll see: **"Your Role: Not Registered (Customer)"**
4. In the **"View Batch Information"** section:
5. Enter batch ID: `BATCH001`
6. Click **"View Details"**
7. See complete history!

#### Method 2: Scanning QR Code (In-Store)

**Scenario:** Customer is at FreshMart and sees QR code on tomatoes.

1. Open camera app on phone
2. Point at QR code
3. Tap the notification that appears
4. Browser opens showing batch details
5. No account needed - just view!

### What Customers Can See

**Complete Transparency:**

```
🥬 BATCH001 - Organic Tomatoes

📍 Origin
Producer: Green Valley Farm
Address: 0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb
Created: December 10, 2025, 10:30 AM
Quantity: 500 kg

🚛 Journey
✅ Producer → Transporter (11:00 AM)
✅ Transporter → Distributor (1:30 PM)
✅ Distributor → Retailer (3:00 PM)
✅ Final Inspection: Approved

🌡️ Temperature History
• 4°C at Producer Farm (10:35 AM)
• 5°C in Transit (11:15 AM)
• 6°C at ColdStorage (1:15 PM)
• 3°C in Storage (2:00 PM)
• 2°C at FreshMart Display (3:30 PM)

✅ Quality Verified
• Cold Chain Maintained
• Temperature: 2-6°C (Safe)
• Humidity: 75-90% (Good)
• Inspection: Passed
```

### Customer Benefits

✅ **Know your food's origin**
   - See exactly which farm it came from
   - Verify organic/quality claims
   - Trust the supply chain

✅ **Verify freshness**
   - Check creation date
   - See how long in transit
   - View storage conditions

✅ **Food safety assurance**
   - Temperature was maintained
   - No breaks in cold chain
   - Professional inspections done

✅ **Make informed decisions**
   - Compare different products
   - Choose based on transparency
   - Support ethical producers

---

## 🧪 Testing Complete Supply Chain Flow {#testing-flow}

### Full End-to-End Test

Let's test the ENTIRE system with realistic scenario!

#### Test Scenario: Organic Lettuce Supply Chain

**Actors:**
- Admin: You (contract deployer)
- Producer: Alice (Green Valley Farm)
- Transporter: Bob (FastDeliver)
- Distributor: Carol (ColdStorage Inc.)
- Retailer: Dave (FreshMart)
- Customer: Eve (Shopper)

#### Phase 1: Setup (Admin)

**Create 5 different MetaMask accounts:**

1. Open MetaMask
2. Click account icon → Create Account
3. Create accounts named:
   - "Admin" (your deployer account)
   - "Alice-Producer"
   - "Bob-Transporter"
   - "Carol-Distributor"
   - "Dave-Retailer"
4. Copy each address to a notepad

**Get test ETH for each account:**
- Go to [https://sepoliafaucet.com/](https://sepoliafaucet.com/)
- Request ETH for each of the 5 addresses
- Wait for confirmation

**Register all actors:**

1. Switch to Admin account in MetaMask
2. Connect to app
3. Register Alice as Producer
4. Register Bob as Transporter
5. Register Carol as Distributor
6. Register Dave as Retailer
7. Verify each registration succeeded

**Time: ~10 minutes**

#### Phase 2: Production (Producer - Alice)

1. Switch to "Alice-Producer" account
2. Connect wallet
3. Verify role shows "Producer"
4. Create batch:
   - Batch ID: `LETT-20251210-001`
   - Product: `Organic Lettuce`
   - Quantity: `300`
5. Wait for confirmation
6. Transfer to Bob (Transporter address)
7. Transaction confirmed!

**Time: ~2 minutes**

#### Phase 3: Transportation (Transporter - Bob)

1. Switch to "Bob-Transporter" account
2. Connect wallet
3. Verify you own `LETT-20251210-001`
4. Add sensor reading #1:
   - Temperature: `4`
   - Humidity: `92`
   - Location: `Green Valley Farm - Loading Bay`
5. Wait 2 minutes (simulate 1 hour)
6. Add sensor reading #2:
   - Temperature: `5`
   - Humidity: `90`
   - Location: `Highway A1 - Mile 30`
7. Wait 2 minutes
8. Add sensor reading #3:
   - Temperature: `6`
   - Humidity: `88`
   - Location: `ColdStorage Inc. - Receiving`
9. Mark as arrived
10. Transfer to Carol (Distributor address)

**Time: ~8 minutes**

#### Phase 4: Distribution (Distributor - Carol)

1. Switch to "Carol-Distributor" account
2. Connect wallet
3. Verify you own `LETT-20251210-001`
4. Add storage reading:
   - Temperature: `3`
   - Humidity: `95`
   - Location: `ColdStorage - Bay 7, Shelf B2`
5. Wait 2 minutes
6. Add second storage reading:
   - Temperature: `3`
   - Humidity: `94`
   - Location: `ColdStorage - Bay 7, Shelf B2`
7. Transfer to Dave (Retailer address)

**Time: ~5 minutes**

#### Phase 5: Retail (Retailer - Dave)

1. Switch to "Dave-Retailer" account
2. Connect wallet
3. Verify you own `LETT-20251210-001`
4. Add display reading:
   - Temperature: `2`
   - Humidity: `80`
   - Location: `FreshMart - Produce Section, Case 1`
5. Inspect the batch → Click "Inspect & Approve"
6. Generate QR code
7. Save/screenshot the QR code

**Time: ~3 minutes**

#### Phase 6: Customer Verification (Customer - Eve)

**Option A: Using the App**
1. Stay on the app (or use new browser)
2. Don't connect wallet (or connect with any address)
3. View batch: `LETT-20251210-001`
4. See complete history!

**Option B: Scanning QR Code**
1. Open QR code on phone camera
2. Scan the code Dave generated
3. See batch details on phone!

**Time: ~1 minute**

### Verification Checklist

After completing the test, verify:

- ✅ All 4 actors were registered successfully
- ✅ Batch was created with correct details
- ✅ Ownership transferred 3 times
- ✅ At least 6 sensor readings recorded
- ✅ All temperatures in valid range (-10 to 40°C)
- ✅ All humidity in valid range (0-100%)
- ✅ Batch was marked as arrived
- ✅ Batch was inspected by retailer
- ✅ QR code was generated
- ✅ Customer can view full history
- ✅ All timestamps are accurate
- ✅ Ownership history shows all transfers

### Expected Results

**Total Transactions:** ~15
- 4 registrations (Admin)
- 1 batch creation (Producer)
- 3 transfers (Producer → Transporter → Distributor → Retailer)
- 6 sensor readings (Transporter + Distributor + Retailer)
- 1 mark arrived (Transporter)
- 1 inspection (Retailer)

**Total Gas Fees:** ~0.03-0.05 ETH

**Total Time:** ~30-45 minutes

**On Blockchain Explorer:**
1. Go to https://sepolia.etherscan.io
2. Search for your contract: `0x7f0c7f13908Cff58207637Cba7a3FE12105f9b56`
3. View all transactions
4. See every interaction recorded!

---

## 🔧 Troubleshooting {#troubleshooting}

### Common Issues and Solutions

#### Issue: "Connect Wallet" button doesn't work

**Symptoms:**
- Button doesn't respond
- MetaMask doesn't pop up

**Solutions:**
1. Check if MetaMask is installed
2. Refresh the page
3. Open MetaMask manually and unlock it
4. Try different browser (Chrome/Firefox/Brave)
5. Check browser console for errors (F12)

---

#### Issue: "Wrong Network" error

**Symptoms:**
- "Please switch to Sepolia" message
- Transactions fail immediately

**Solutions:**
1. Open MetaMask
2. Click network dropdown
3. Select "Sepolia Test Network"
4. If Sepolia is not listed:
   - Click "Add Network"
   - Enable "Show test networks"
5. Refresh the page

---

#### Issue: "Not Registered" role shown

**Symptoms:**
- Connected but role shows "Not Registered"
- Can't access any panels

**Solutions:**
1. Make sure Admin registered your address
2. Check you're using the correct wallet address
3. Ask Admin to check if registration transaction succeeded
4. Verify registration:
   - Switch to Admin account
   - Use "Check Actor Role" function
   - Enter your address

---

#### Issue: Transaction fails - "Insufficient funds"

**Symptoms:**
- MetaMask shows "Insufficient funds for gas"
- Transaction won't confirm

**Solutions:**
1. Check your ETH balance in MetaMask
2. Get more Sepolia ETH from faucet:
   - https://sepoliafaucet.com/
   - https://sepolia-faucet.pk910.de/
3. Wait for faucet transaction to confirm
4. Try transaction again

---

#### Issue: Transaction fails - "Batch ID already exists"

**Symptoms:**
- Creating batch fails
- Error in MetaMask or console

**Solutions:**
1. You're trying to reuse a batch ID
2. Each batch ID must be unique
3. Use a different ID:
   - Change from `BATCH001` to `BATCH002`
   - Add date: `BATCH-20251210-001`
4. Check if batch exists first:
   - Use "View Batch" function
   - If it returns data, the ID is taken

---

#### Issue: "Invalid temperature" error

**Symptoms:**
- Adding sensor data fails
- Transaction reverts

**Solutions:**
1. Check temperature is between -10°C and 40°C
2. Common mistakes:
   - Entered Fahrenheit instead of Celsius
   - Extra spaces or characters
   - Negative sign issues: `-5` is valid, `- 5` is not
3. Convert Fahrenheit to Celsius:
   - Formula: (°F - 32) × 5/9 = °C
   - Example: 39°F = 4°C

---

#### Issue: "Invalid humidity" error

**Symptoms:**
- Adding sensor data fails

**Solutions:**
1. Check humidity is between 0% and 100%
2. Enter just the number: `85` not `85%`
3. No decimals needed: use `85` not `85.5`

---

#### Issue: "Not current owner" error

**Symptoms:**
- Can't transfer batch
- Can't add sensor data

**Solutions:**
1. Check ownership:
   - Use "View Batch" function
   - Look at "Current Owner" field
2. You can only modify batches you own
3. Wait for previous owner to transfer to you
4. Make sure you're using correct account in MetaMask

---

#### Issue: Can't transfer to unregistered address

**Symptoms:**
- Transfer transaction fails
- Error: "Address not registered as [role]"

**Solutions:**
1. The recipient must be registered first
2. Check recipient's role:
   - Producer can only transfer to Transporter
   - Transporter can only transfer to Distributor
   - Distributor can only transfer to Retailer
3. Ask Admin to register the recipient
4. Verify registration before transferring

---

#### Issue: QR code doesn't appear

**Symptoms:**
- Click "Generate QR Code" but nothing shows

**Solutions:**
1. Check browser console (F12) for errors
2. Make sure you entered a valid batch ID
3. Verify batch exists using "View Batch"
4. Try refreshing the page
5. QR code library might not be loaded:
   - Check internet connection
   - Reload the page

---

#### Issue: Frontend won't start

**Symptoms:**
- `npm start` fails
- Error messages in terminal

**Solutions:**

**If "Module not found" error:**
```powershell
cd C:\Users\Royal\Desktop\blockchain\project_v1\frontend
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json
npm install
npm start
```

**If port 3000 is in use:**
```powershell
# Kill process on port 3000
Get-Process -Id (Get-NetTCPConnection -LocalPort 3000).OwningProcess | Stop-Process
# Then start again
npm start
```

**If React scripts error:**
```powershell
npm install react-scripts@5.0.1
npm start
```

---

#### Issue: MetaMask transaction stuck "Pending"

**Symptoms:**
- Transaction shows pending for minutes
- New transactions won't go through

**Solutions:**
1. **Speed up transaction:**
   - Click the transaction in MetaMask
   - Click "Speed Up"
   - Pay higher gas fee
2. **Cancel transaction:**
   - Click "Cancel"
   - Confirm cancellation
3. **Wait it out:**
   - Sepolia can be slow
   - Wait 5-10 minutes
   - Transaction will eventually confirm or fail
4. **Reset account (last resort):**
   - MetaMask → Settings → Advanced
   - "Reset Account"
   - This clears pending transactions

---

#### Issue: Gas fees too high

**Symptoms:**
- MetaMask shows very high gas cost
- More than 0.01 ETH per transaction

**Solutions:**
1. Wait for lower network activity
2. Check gas prices: https://sepolia.etherscan.io/gastracker
3. Adjust gas manually in MetaMask:
   - Click "Market" → "Advanced"
   - Lower the gas price slightly
4. This is testnet, gas should be low
5. If consistently high, check:
   - You're on Sepolia (not mainnet!)
   - Contract address is correct

---

#### Issue: "Execution reverted" error

**Symptoms:**
- Transaction fails with generic error
- No specific reason given

**Common Causes & Solutions:**

**1. Batch doesn't exist:**
- Check batch ID spelling
- Verify batch was created

**2. Wrong role trying to execute:**
- Producer can't add sensor data
- Only transporter/distributor/retailer can

**3. Batch not transferred yet:**
- You're not the current owner
- Check ownership first

**4. Already inspected:**
- Can't inspect same batch twice
- Check inspection status

**5. Contract not deployed:**
- Verify contract address in `config.js`
- Check contract exists on Sepolia

---

### Getting Help

#### Debug Information to Collect

When asking for help, provide:

1. **Transaction Hash**
   - Click failed transaction in MetaMask
   - Copy transaction hash
   - Check on https://sepolia.etherscan.io

2. **Error Message**
   - Exact error text
   - Screenshot if possible

3. **Your Setup**
   - Which role are you?
   - Which account address?
   - Which browser?
   - MetaMask version?

4. **What You're Trying**
   - Which function?
   - What inputs?
   - Expected vs actual result?

5. **Console Logs**
   - Press F12 in browser
   - Go to "Console" tab
   - Copy any red error messages

#### Useful Links

- **Sepolia Faucet:** https://sepoliafaucet.com/
- **Block Explorer:** https://sepolia.etherscan.io
- **Your Contract:** https://sepolia.etherscan.io/address/0x7f0c7f13908Cff58207637Cba7a3FE12105f9b56
- **MetaMask Support:** https://support.metamask.io
- **Sepolia Info:** https://sepolia.dev/

---

## 📊 Quick Reference

### Valid Input Ranges

| Field | Min | Max | Example |
|-------|-----|-----|---------|
| Temperature | -10°C | 40°C | `4` |
| Humidity | 0% | 100% | `85` |
| Batch ID | 1 char | Any | `BATCH001` |
| Quantity | 1 | Any number | `500` |

### Transfer Flow

```
Producer → Transporter → Distributor → Retailer → Customer
```

### Required Transactions

1. Admin registers actor (~0.003 ETH)
2. Producer creates batch (~0.005 ETH)
3. Owner transfers batch (~0.003 ETH)
4. Anyone adds sensor data (~0.004 ETH)
5. Transporter marks arrived (~0.002 ETH)
6. Retailer inspects (~0.003 ETH)

### Gas Estimates

| Operation | Gas Used | Cost (ETH) |
|-----------|----------|------------|
| Register Actor | ~50,000 | ~0.003 |
| Create Batch | ~100,000 | ~0.005 |
| Transfer Ownership | ~60,000 | ~0.003 |
| Add Sensor Data | ~80,000 | ~0.004 |
| Mark Arrived | ~45,000 | ~0.002 |
| Inspect Batch | ~50,000 | ~0.003 |

---

## 🎯 Success Criteria

You've successfully completed the project when:

✅ All 4 types of actors are registered
✅ At least one batch created
✅ Batch transferred through full supply chain
✅ Multiple sensor readings recorded
✅ Temperature and humidity within valid ranges
✅ Batch marked as arrived
✅ Batch inspected by retailer
✅ QR code generated and scannable
✅ Customer can view complete history
✅ All transactions visible on Sepolia explorer

---

## 📞 Need More Help?

**Still stuck?** Check these resources:

1. **Project Documentation:**
   - README.md - General overview
   - REMIX_GUIDE.md - Deployment help
   - PROJECT_REPORT.md - Technical details

2. **Smart Contract:**
   - Read `contracts/FreshChain.sol`
   - Check function comments
   - Understand modifiers

3. **Blockchain Explorer:**
   - View your transactions
   - See event logs
   - Debug failed transactions

**Good luck with your FreshChain project! 🥬🔗**
