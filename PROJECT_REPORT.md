# FreshChain Project Report

## Executive Summary

FreshChain is a blockchain-based food traceability and quality verification system designed to bring transparency and trust to the food supply chain. The system leverages Ethereum's Sepolia testnet to create an immutable record of a product's journey from farm to consumer.

## 1. Introduction

### 1.1 Problem Statement

The modern food supply chain faces several critical challenges:
- Lack of transparency in product origin and handling
- Difficulty in tracking temperature-sensitive products
- Food safety concerns and contamination risks
- Inability to verify quality claims
- Complex multi-party supply chains

### 1.2 Solution Overview

FreshChain addresses these challenges by:
- Creating tamper-proof records on blockchain
- Enabling real-time environmental monitoring
- Providing transparent ownership tracking
- Allowing customers to verify product history via QR codes
- Ensuring accountability at each supply chain stage

## 2. System Architecture

### 2.1 Technology Stack

**Blockchain Layer:**
- Ethereum Sepolia Testnet
- Solidity 0.8.20
- Hardhat development environment
- OpenZeppelin contracts for security

**Frontend Layer:**
- React 18
- ethers.js v6
- QR code generation library
- MetaMask integration

**Development Tools:**
- Hardhat for smart contract development
- Mocha/Chai for testing
- Node.js for backend tooling

### 2.2 Smart Contract Architecture

The FreshChain smart contract implements:

**Core Components:**
1. **Role Management System**
   - Owner (Admin)
   - Producers (Farmers)
   - Transporters
   - Distributors
   - Retailers

2. **Data Structures**
   - Batch struct: Stores product information
   - SensorData struct: Environmental monitoring
   - Ownership history array

3. **Access Control**
   - Role-based modifiers
   - Owner-only registration functions
   - Current owner validation

### 2.3 Supply Chain Flow

```
Producer → Transporter → Distributor → Retailer → Customer
   ↓           ↓            ↓            ↓          ↓
Create      Monitor      Receive      Inspect    Verify
Transfer    Record       Transfer     Generate   Scan QR
            Sensors                   QR Code
```

## 3. Implementation Details

### 3.1 Smart Contract Functions

**Admin Functions:**
- `registerProducer()`: Register farmers
- `registerTransporter()`: Register logistics providers
- `registerDistributor()`: Register warehouses
- `registerRetailer()`: Register shops

**Producer Functions:**
- `createBatch()`: Initialize new product batch
  - Parameters: batchId, productName, quantity
  - Creates ownership history
  - Emits BatchCreated event

**Transporter Functions:**
- `addSensorData()`: Record environmental conditions
  - Validates temperature (-10°C to 40°C)
  - Validates humidity (0% to 100%)
  - Records location and timestamp

**Transfer Functions:**
- `transferOwnership()`: Move batch between actors
  - Validates current ownership
  - Updates ownership history
  - Prevents transfer after retail arrival

**Retailer Functions:**
- `markAsArrived()`: Final inspection
  - Records inspection result
  - Marks batch as arrived
  - Enables QR code generation

**View Functions:**
- `getBatchHistory()`: Complete batch information
- `getSensorReadings()`: All environmental data
- `getBatchInfo()`: Current batch status
- `getActorRole()`: Check address role

### 3.2 Events

The contract emits events for:
- Actor registration
- Batch creation
- Sensor data addition
- Ownership transfers
- Batch arrival at retailer

### 3.3 Frontend Implementation

**Key Features:**

1. **Wallet Integration**
   - MetaMask connection
   - Network validation (Sepolia)
   - Account management

2. **Role-Based Interface**
   - Dynamic menu based on selected role
   - Role-specific forms and actions
   - Input validation

3. **Transaction Management**
   - Loading states
   - Success/error messages
   - Transaction confirmation

4. **QR Code System**
   - Generation for batches
   - Customer scanning capability
   - History viewing interface

## 4. Security Considerations

### 4.1 Access Control

- **Role-based permissions**: Only authorized actors can perform specific actions
- **Owner-only functions**: Critical functions restricted to contract owner
- **Ownership validation**: Transfer only by current owner

### 4.2 Input Validation

- Temperature range checking
- Humidity range validation
- Address validation
- Batch existence verification
- Duplicate batch ID prevention

### 4.3 Data Integrity

- Immutable blockchain storage
- Event logging for audit trail
- Timestamp recording
- Address tracking

## 5. Testing

### 5.1 Test Coverage

Comprehensive tests implemented for:
- Actor registration (positive and negative cases)
- Batch creation and validation
- Sensor data logging with range validation
- Ownership transfer authorization
- Retailer inspection process
- Access control enforcement

### 5.2 Test Results

All tests passing:
- ✓ Actor registration
- ✓ Batch creation
- ✓ Sensor data validation
- ✓ Ownership transfers
- ✓ Retailer inspection
- ✓ Access control

## 6. Use Case Example

### 6.1 Tomato Supply Chain

**Scenario**: 100kg batch of tomatoes from farm to store

**Step 1 - Production (Farmer)**
- Creates Batch #101
- Product: "Tomatoes"
- Quantity: 100 kg
- Transfers to transporter

**Step 2 - Transportation**
- Location: Bursa → Temp: 4°C, Humidity: 65%
- Location: Kocaeli → Temp: 5°C, Humidity: 68%
- Location: Istanbul → Temp: 6°C, Humidity: 70%
- Transfers to distributor

**Step 3 - Distribution**
- Receives batch
- Stores temporarily
- Transfers to retailer

**Step 4 - Retail**
- Receives batch
- Performs inspection: PASSED ✓
- Generates QR code
- Places on shelf

**Step 5 - Customer Purchase**
- Scans QR code
- Views complete history:
  - All locations visited
  - Temperature at each point
  - Quality inspection result
  - Producer information

## 7. Benefits & Impact

### 7.1 For Producers
- Prove product quality
- Build brand reputation
- Reduce liability claims
- Direct customer connection

### 7.2 For Transporters
- Document proper handling
- Prove compliance
- Reduce disputes
- Improve efficiency

### 7.3 For Retailers
- Verify product quality
- Build customer trust
- Reduce food waste
- Manage recalls efficiently

### 7.4 For Customers
- Verify product origin
- Check handling conditions
- Make informed decisions
- Ensure food safety

## 8. Deployment Guide

### 8.1 Prerequisites
- Node.js installed
- MetaMask wallet
- Sepolia testnet ETH
- Alchemy/Infura account

### 8.2 Deployment Steps

1. Install dependencies: `npm install`
2. Configure environment variables
3. Compile contract: `npx hardhat compile`
4. Run tests: `npx hardhat test`
5. Deploy: `npx hardhat run scripts/deploy.js --network sepolia`
6. Update frontend config
7. Start frontend: `cd frontend && npm start`

### 8.3 Cost Analysis

**Deployment Cost**: ~0.005 - 0.01 ETH
**Transaction Costs**:
- Register actor: ~0.0001 ETH
- Create batch: ~0.0002 ETH
- Add sensor data: ~0.0003 ETH
- Transfer ownership: ~0.0001 ETH
- Mark as arrived: ~0.0001 ETH

## 9. Future Enhancements

### 9.1 Short Term
- Mobile application
- IPFS integration for images
- Email notifications
- Multi-language support

### 9.2 Medium Term
- IoT sensor integration
- GPS tracking
- Analytics dashboard
- Automated alerts

### 9.3 Long Term
- AI-based quality prediction
- Cross-chain compatibility
- NFT certificates
- Integration with existing ERP systems

## 10. Challenges & Solutions

### 10.1 Challenge: Gas Costs
**Solution**: Optimized contract code, batch operations where possible

### 10.2 Challenge: User Experience
**Solution**: Simple interface, MetaMask integration, clear instructions

### 10.3 Challenge: Data Privacy
**Solution**: Store sensitive data off-chain, only hashes on-chain (future)

### 10.4 Challenge: Scalability
**Solution**: Layer 2 solutions consideration for production (future)

## 11. Conclusion

FreshChain successfully demonstrates a blockchain-based food traceability system that:
- ✅ Tracks products through entire supply chain
- ✅ Records environmental conditions
- ✅ Enables transparent ownership transfer
- ✅ Provides customer verification via QR codes
- ✅ Ensures data integrity and immutability

The system meets all project requirements and provides a foundation for real-world implementation in the food industry.

## 12. References

1. Ethereum Documentation: https://ethereum.org/docs
2. Hardhat Documentation: https://hardhat.org/docs
3. OpenZeppelin Contracts: https://docs.openzeppelin.com/
4. ethers.js Documentation: https://docs.ethers.org
5. React Documentation: https://react.dev

## 13. Appendices

### Appendix A: Contract Address
- Network: Sepolia Testnet
- Address: [To be filled after deployment]

### Appendix B: Source Code Repository
- Smart Contract: `/contracts/FreshChain.sol`
- Frontend: `/frontend/src/`
- Tests: `/test/FreshChain.test.js`

### Appendix C: Team Contributions
- Smart Contract Development
- Frontend Development
- Testing & Quality Assurance
- Documentation

---

**Project Completed**: December 2025  
**Platform**: Ethereum Sepolia Testnet  
**Technology**: Solidity, Hardhat, React, ethers.js
