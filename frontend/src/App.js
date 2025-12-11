import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { QRCodeSVG } from 'qrcode.react';
import './App.css';
import { CONTRACT_ADDRESS, CONTRACT_ABI, NETWORK_CONFIG } from './config';

function App() {
  const [account, setAccount] = useState('');
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);
  const [userRole, setUserRole] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [message, setMessage] = useState({ text: '', type: '' });
  const [loading, setLoading] = useState(false);

  // Form states
  const [batchId, setBatchId] = useState('');
  const [productName, setProductName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [temperature, setTemperature] = useState('');
  const [humidity, setHumidity] = useState('');
  const [location, setLocation] = useState('');
  const [newOwnerAddress, setNewOwnerAddress] = useState('');
  const [passedInspection, setPassedInspection] = useState(true);
  const [viewBatchId, setViewBatchId] = useState('');
  const [batchHistory, setBatchHistory] = useState(null);
  const [actorAddress, setActorAddress] = useState('');

  useEffect(() => {
    // Handle QR Code scans - automatically show batch for customers
    const urlParams = new URLSearchParams(window.location.search);
    const batchIdFromQR = urlParams.get('batchId');
    
    if (batchIdFromQR) {
      setViewBatchId(batchIdFromQR);
      setSelectedRole('Customer');
      // Auto-scroll to customer section after a brief delay
      setTimeout(() => {
        const customerSection = document.querySelector('.customer-panel');
        if (customerSection) {
          customerSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 1000);
    }
    
    if (account && contract) {
      fetchUserRole();
    }
  }, [account, contract]);

  const connectWallet = async () => {
    try {
      if (!window.ethereum) {
        showMessage('Please install MetaMask!', 'error');
        return;
      }

      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });

      // Check if connected to Sepolia
      const chainId = await window.ethereum.request({ method: 'eth_chainId' });
      if (chainId !== NETWORK_CONFIG.chainId) {
        try {
          await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: NETWORK_CONFIG.chainId }],
          });
        } catch (error) {
          showMessage('Please switch to Sepolia testnet', 'error');
          return;
        }
      }

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

      setAccount(accounts[0]);
      setProvider(provider);
      setContract(contract);
      showMessage('Wallet connected successfully!', 'success');
    } catch (error) {
      console.error('Error connecting wallet:', error);
      showMessage('Failed to connect wallet', 'error');
    }
  };

  const fetchUserRole = async () => {
    try {
      const role = await contract.getActorRole(account);
      setUserRole(role);
    } catch (error) {
      console.error('Error fetching role:', error);
    }
  };

  const showMessage = (text, type) => {
    setMessage({ text, type });
    setTimeout(() => setMessage({ text: '', type: '' }), 5000);
  };

  // Admin Functions
  const registerActor = async (actorType) => {
    try {
      setLoading(true);
      let tx;
      
      switch (actorType) {
        case 'Producer':
          tx = await contract.registerProducer(actorAddress);
          break;
        case 'Transporter':
          tx = await contract.registerTransporter(actorAddress);
          break;
        case 'Distributor':
          tx = await contract.registerDistributor(actorAddress);
          break;
        case 'Retailer':
          tx = await contract.registerRetailer(actorAddress);
          break;
        default:
          throw new Error('Invalid actor type');
      }

      await tx.wait();
      showMessage(`${actorType} registered successfully!`, 'success');
      setActorAddress('');
    } catch (error) {
      console.error('Error registering actor:', error);
      showMessage(`Failed to register ${actorType}: ${error.reason || error.message}`, 'error');
    } finally {
      setLoading(false);
    }
  };

  // Producer Functions
  const createBatch = async () => {
    try {
      setLoading(true);
      const tx = await contract.createBatch(
        parseInt(batchId),
        productName,
        parseInt(quantity)
      );
      await tx.wait();
      showMessage('Batch created successfully!', 'success');
      setBatchId('');
      setProductName('');
      setQuantity('');
    } catch (error) {
      console.error('Error creating batch:', error);
      showMessage(`Failed to create batch: ${error.reason || error.message}`, 'error');
    } finally {
      setLoading(false);
    }
  };

  // Transporter Functions
  const addSensorData = async () => {
    try {
      setLoading(true);
      const tx = await contract.addSensorData(
        parseInt(batchId),
        parseInt(temperature),
        parseInt(humidity),
        location
      );
      await tx.wait();
      showMessage('Sensor data added successfully!', 'success');
      setBatchId('');
      setTemperature('');
      setHumidity('');
      setLocation('');
    } catch (error) {
      console.error('Error adding sensor data:', error);
      showMessage(`Failed to add sensor data: ${error.reason || error.message}`, 'error');
    } finally {
      setLoading(false);
    }
  };

  // Transfer Ownership (Producer, Transporter, Distributor)
  const transferOwnership = async () => {
    try {
      setLoading(true);
      const tx = await contract.transferOwnership(
        parseInt(batchId),
        newOwnerAddress
      );
      await tx.wait();
      showMessage('Ownership transferred successfully!', 'success');
      setBatchId('');
      setNewOwnerAddress('');
    } catch (error) {
      console.error('Error transferring ownership:', error);
      showMessage(`Failed to transfer ownership: ${error.reason || error.message}`, 'error');
    } finally {
      setLoading(false);
    }
  };

  // Retailer Functions
  const markAsArrived = async () => {
    try {
      setLoading(true);
      const tx = await contract.markAsArrived(
        parseInt(batchId),
        passedInspection
      );
      await tx.wait();
      showMessage('Batch marked as arrived!', 'success');
      setBatchId('');
    } catch (error) {
      console.error('Error marking as arrived:', error);
      showMessage(`Failed to mark as arrived: ${error.reason || error.message}`, 'error');
    } finally {
      setLoading(false);
    }
  };

  // Customer View Functions
  const viewBatchHistory = async () => {
    try {
      setLoading(true);
      const history = await contract.getBatchHistory(parseInt(viewBatchId));
      const sensorReadings = await contract.getSensorReadings(parseInt(viewBatchId));

      setBatchHistory({
        batchId: history[0].toString(),
        productName: history[1],
        quantity: history[2].toString(),
        producer: history[3],
        currentOwner: history[4],
        createdAt: new Date(Number(history[5]) * 1000).toLocaleString(),
        arrivedAtRetailer: history[6],
        passedInspection: history[7],
        ownershipHistory: history[8],
        sensorReadings: sensorReadings.map(reading => ({
          temperature: reading.temperature.toString(),
          humidity: reading.humidity.toString(),
          location: reading.location,
          timestamp: new Date(Number(reading.timestamp) * 1000).toLocaleString(),
          recordedBy: reading.recordedBy
        }))
      });
      showMessage('Batch history loaded!', 'success');
    } catch (error) {
      console.error('Error fetching batch history:', error);
      showMessage(`Failed to fetch batch history: ${error.reason || error.message}`, 'error');
    } finally {
      setLoading(false);
    }
  };

  const renderAdminPanel = () => (
    <div className="section">
      <h2>Admin Panel - Register Actors</h2>
      <div className="form-group">
        <label>Actor Address:</label>
        <input
          type="text"
          value={actorAddress}
          onChange={(e) => setActorAddress(e.target.value)}
          placeholder="0x..."
        />
      </div>
      <div className="grid-2">
        <button className="submit-button" onClick={() => registerActor('Producer')} disabled={loading}>
          Register Producer
        </button>
        <button className="submit-button" onClick={() => registerActor('Transporter')} disabled={loading}>
          Register Transporter
        </button>
        <button className="submit-button" onClick={() => registerActor('Distributor')} disabled={loading}>
          Register Distributor
        </button>
        <button className="submit-button" onClick={() => registerActor('Retailer')} disabled={loading}>
          Register Retailer
        </button>
      </div>
    </div>
  );

  const renderProducerPanel = () => (
    <div className="section">
      <h2>Producer Panel</h2>
      <h3>Create New Batch</h3>
      <div className="form-group">
        <label>Batch ID:</label>
        <input
          type="number"
          value={batchId}
          onChange={(e) => setBatchId(e.target.value)}
          placeholder="e.g., 101"
        />
      </div>
      <div className="form-group">
        <label>Product Name:</label>
        <input
          type="text"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          placeholder="e.g., Tomatoes"
        />
      </div>
      <div className="form-group">
        <label>Quantity (kg):</label>
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          placeholder="e.g., 100"
        />
      </div>
      <button className="submit-button" onClick={createBatch} disabled={loading}>
        Create Batch
      </button>

      <hr style={{ margin: '30px 0' }} />

      <h3>Transfer Batch Ownership</h3>
      <div className="form-group">
        <label>Batch ID:</label>
        <input
          type="number"
          value={batchId}
          onChange={(e) => setBatchId(e.target.value)}
          placeholder="Batch ID to transfer"
        />
      </div>
      <div className="form-group">
        <label>New Owner Address:</label>
        <input
          type="text"
          value={newOwnerAddress}
          onChange={(e) => setNewOwnerAddress(e.target.value)}
          placeholder="0x..."
        />
      </div>
      <button className="submit-button" onClick={transferOwnership} disabled={loading}>
        Transfer Ownership
      </button>
    </div>
  );

  const renderTransporterPanel = () => (
    <div className="section">
      <h2>Transporter Panel</h2>
      <h3>Add Sensor Data</h3>
      <div className="form-group">
        <label>Batch ID:</label>
        <input
          type="number"
          value={batchId}
          onChange={(e) => setBatchId(e.target.value)}
          placeholder="e.g., 101"
        />
      </div>
      <div className="form-group">
        <label>Temperature (°C) [-10 to 40]:</label>
        <input
          type="number"
          value={temperature}
          onChange={(e) => setTemperature(e.target.value)}
          placeholder="e.g., 4"
          min="-10"
          max="40"
        />
      </div>
      <div className="form-group">
        <label>Humidity (%) [0 to 100]:</label>
        <input
          type="number"
          value={humidity}
          onChange={(e) => setHumidity(e.target.value)}
          placeholder="e.g., 65"
          min="0"
          max="100"
        />
      </div>
      <div className="form-group">
        <label>Location:</label>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="e.g., Bursa"
        />
      </div>
      <button className="submit-button" onClick={addSensorData} disabled={loading}>
        Add Sensor Data
      </button>

      <hr style={{ margin: '30px 0' }} />

      <h3>Transfer Batch Ownership</h3>
      <div className="form-group">
        <label>Batch ID:</label>
        <input
          type="number"
          value={batchId}
          onChange={(e) => setBatchId(e.target.value)}
          placeholder="Batch ID to transfer"
        />
      </div>
      <div className="form-group">
        <label>New Owner Address:</label>
        <input
          type="text"
          value={newOwnerAddress}
          onChange={(e) => setNewOwnerAddress(e.target.value)}
          placeholder="0x..."
        />
      </div>
      <button className="submit-button" onClick={transferOwnership} disabled={loading}>
        Transfer Ownership
      </button>
    </div>
  );

  const renderDistributorPanel = () => (
    <div className="section">
      <h2>Distributor Panel</h2>
      <h3>Transfer Batch Ownership</h3>
      <div className="form-group">
        <label>Batch ID:</label>
        <input
          type="number"
          value={batchId}
          onChange={(e) => setBatchId(e.target.value)}
          placeholder="Batch ID to transfer"
        />
      </div>
      <div className="form-group">
        <label>New Owner Address:</label>
        <input
          type="text"
          value={newOwnerAddress}
          onChange={(e) => setNewOwnerAddress(e.target.value)}
          placeholder="0x..."
        />
      </div>
      <button className="submit-button" onClick={transferOwnership} disabled={loading}>
        Transfer Ownership
      </button>
    </div>
  );

  const renderRetailerPanel = () => (
    <div className="section">
      <h2>Retailer Panel</h2>
      <h3>Mark Batch as Arrived & Inspect</h3>
      <div className="form-group">
        <label>Batch ID:</label>
        <input
          type="number"
          value={batchId}
          onChange={(e) => setBatchId(e.target.value)}
          placeholder="e.g., 101"
        />
      </div>
      <div className="form-group">
        <label>Inspection Result:</label>
        <select
          value={passedInspection}
          onChange={(e) => setPassedInspection(e.target.value === 'true')}
        >
          <option value="true">Passed ✓</option>
          <option value="false">Failed ✗</option>
        </select>
      </div>
      <button className="submit-button" onClick={markAsArrived} disabled={loading}>
        Mark as Arrived
      </button>

      <hr style={{ margin: '30px 0' }} />

      <h3>Generate QR Code for Batch</h3>
      <div className="form-group">
        <label>Batch ID:</label>
        <input
          type="number"
          value={viewBatchId}
          onChange={(e) => setViewBatchId(e.target.value)}
          placeholder="e.g., 101"
        />
      </div>
      {viewBatchId && (
        <div className="qr-section">
          <p>QR Code for Batch #{viewBatchId}</p>
          <div className="qr-code" id={`qr-batch-${viewBatchId}`}>
            <QRCodeSVG
              value={`${window.location.origin}${window.location.pathname}?batchId=${viewBatchId}`}
              size={200}
              level="H"
            />
          </div>
          <button 
            className="submit-button" 
            onClick={() => {
              const svg = document.querySelector(`#qr-batch-${viewBatchId} svg`);
              const svgData = new XMLSerializer().serializeToString(svg);
              const canvas = document.createElement("canvas");
              const ctx = canvas.getContext("2d");
              const img = new Image();
              img.onload = () => {
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0);
                const pngFile = canvas.toDataURL("image/png");
                const downloadLink = document.createElement("a");
                downloadLink.download = `FreshChain-Batch-${viewBatchId}-QR.png`;
                downloadLink.href = pngFile;
                downloadLink.click();
              };
              img.src = "data:image/svg+xml;base64," + btoa(svgData);
            }}
            style={{ marginTop: '15px' }}
          >
            📥 Download QR Code
          </button>
          <p style={{ fontSize: '0.9em', color: '#666', marginTop: '10px' }}>
            Customers can scan this QR code to view batch history
          </p>
        </div>
      )}
    </div>
  );

  const renderCustomerPanel = () => (
    <div className="section">
      <h2>Customer Panel - View Batch History</h2>
      <div className="form-group">
        <label>Batch ID (Scan QR or Enter):</label>
        <input
          type="number"
          value={viewBatchId}
          onChange={(e) => setViewBatchId(e.target.value)}
          placeholder="e.g., 101"
        />
      </div>
      <button className="submit-button" onClick={viewBatchHistory} disabled={loading}>
        View Batch History
      </button>

      {batchHistory && (
        <div className="batch-history">
          <h3>Batch Information</h3>
          <div className="history-item">
            <h4>Basic Details</h4>
            <p><strong>Batch ID:</strong> {batchHistory.batchId}</p>
            <p><strong>Product:</strong> {batchHistory.productName}</p>
            <p><strong>Quantity:</strong> {batchHistory.quantity} kg</p>
            <p><strong>Created At:</strong> {batchHistory.createdAt}</p>
            <p><strong>Producer:</strong> {batchHistory.producer}</p>
            <p><strong>Current Owner:</strong> {batchHistory.currentOwner}</p>
            <p><strong>Status:</strong> {batchHistory.arrivedAtRetailer ? '✓ Arrived at Retailer' : 'In Transit'}</p>
            {batchHistory.arrivedAtRetailer && (
              <p><strong>Quality Inspection:</strong> {batchHistory.passedInspection ? '✓ Passed' : '✗ Failed'}</p>
            )}
          </div>

          <h3>Ownership History</h3>
          {batchHistory.ownershipHistory.map((owner, index) => (
            <div key={index} className="history-item">
              <p><strong>Step {index + 1}:</strong> {owner}</p>
            </div>
          ))}

          <h3>Temperature & Humidity Logs</h3>
          {batchHistory.sensorReadings.length > 0 ? (
            batchHistory.sensorReadings.map((reading, index) => (
              <div key={index} className="sensor-reading">
                <p><strong>Reading #{index + 1}</strong></p>
                <p>🌡️ Temperature: {reading.temperature}°C</p>
                <p>💧 Humidity: {reading.humidity}%</p>
                <p>📍 Location: {reading.location}</p>
                <p>🕐 Time: {reading.timestamp}</p>
                <p style={{ fontSize: '0.85em', color: '#666' }}>Recorded by: {reading.recordedBy}</p>
              </div>
            ))
          ) : (
            <p style={{ color: '#666' }}>No sensor readings available</p>
          )}
        </div>
      )}
    </div>
  );

  return (
    <div className="App">
      <div className="container">
        <header>
          <h1>🥬 FreshChain</h1>
          <p className="subtitle">Blockchain-Based Food Traceability System</p>
        </header>

        <div className="wallet-section">
          {!account ? (
            <button className="connect-button" onClick={connectWallet}>
              Connect MetaMask Wallet
            </button>
          ) : (
            <div className="wallet-info">
              <div className="wallet-address">
                Connected: {account.substring(0, 6)}...{account.substring(38)}
              </div>
              <div className="user-role">
                Role: {userRole || 'Loading...'}
              </div>
            </div>
          )}
        </div>

        {message.text && (
          <div className={`message ${message.type}`}>
            {message.text}
          </div>
        )}

        {account && (
          <>
            <div className="role-selector">
              <h2>Select Your Role</h2>
              <div className="role-buttons">
                <button
                  className={`role-button ${selectedRole === 'Admin' ? 'active' : ''}`}
                  onClick={() => setSelectedRole('Admin')}
                >
                  👤 Admin
                </button>
                <button
                  className={`role-button ${selectedRole === 'Producer' ? 'active' : ''}`}
                  onClick={() => setSelectedRole('Producer')}
                >
                  🌾 Producer
                </button>
                <button
                  className={`role-button ${selectedRole === 'Transporter' ? 'active' : ''}`}
                  onClick={() => setSelectedRole('Transporter')}
                >
                  🚚 Transporter
                </button>
                <button
                  className={`role-button ${selectedRole === 'Distributor' ? 'active' : ''}`}
                  onClick={() => setSelectedRole('Distributor')}
                >
                  🏭 Distributor
                </button>
                <button
                  className={`role-button ${selectedRole === 'Retailer' ? 'active' : ''}`}
                  onClick={() => setSelectedRole('Retailer')}
                >
                  🏪 Retailer
                </button>
                <button
                  className={`role-button ${selectedRole === 'Customer' ? 'active' : ''}`}
                  onClick={() => setSelectedRole('Customer')}
                >
                  🛒 Customer
                </button>
              </div>
            </div>

            {selectedRole === 'Admin' && renderAdminPanel()}
            {selectedRole === 'Producer' && renderProducerPanel()}
            {selectedRole === 'Transporter' && renderTransporterPanel()}
            {selectedRole === 'Distributor' && renderDistributorPanel()}
            {selectedRole === 'Retailer' && renderRetailerPanel()}
            {selectedRole === 'Customer' && renderCustomerPanel()}
          </>
        )}

        {loading && <div className="loading">Processing transaction...</div>}
      </div>
    </div>
  );
}

export default App;
