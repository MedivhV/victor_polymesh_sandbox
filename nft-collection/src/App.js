import React, { useState } from 'react';
import { Polymesh } from '@polymeshassociation/polymesh-sdk';

function App() {
  // State variables to store status messages, asset name, and Polymesh SDK instance
  const [status, setStatus] = useState('');
  const [assetName, setAssetName] = useState('');
  const [polymesh, setPolymesh] = useState(null);

  // Function to connect the Polymesh SDK
  const connectSDK = async () => {
    try {
      // Initialize the Polymesh SDK with a node URL
      const sdk = await Polymesh.connect({
        nodeUrl: 'wss://testnet-rpc.polymesh.live', // Example node URL for Polymesh testnet
        appName: 'Polymesh NFT App',
      });
      setPolymesh(sdk); // Save the SDK instance to state
      setStatus('Connected to Polymesh SDK'); // Set success status message
    } catch (error) {
      console.error('Error connecting to Polymesh SDK:', error);
      setStatus('Failed to connect to Polymesh SDK'); // Set error status message
    }
  };

  // Function to create an asset
  const createAsset = async () => {
    // Check if the SDK is connected
    if (!polymesh) {
      setStatus('SDK not connected');
      return;
    }

    try {
      // Create an asset with a specified ticker and user-provided name
      const asset = await polymesh.assets.create({
        ticker: 'VICTORTEST',
        name: assetName,
      });
      setStatus(`Asset created: ${asset.ticker}`); // Set success status message
    } catch (error) {
      console.error('Error creating asset:', error);
      setStatus('Error creating asset'); // Set error status message
    }
  };

  // Function to create an NFT collection
  const createNFTCollection = async () => {
    // Check if the SDK is connected
    if (!polymesh) {
      setStatus('SDK not connected');
      return;
    }

    try {
      // Create an NFT collection with specified details
      const nftCollection = await polymesh.assets.create({
        ticker: 'VICTORTEST',
        name: 'My NFT Collection',
        details: {
          description: 'This is my NFT collection',
          website: 'https://my-nft-collection.com',
        },
      });
      setStatus(`NFT collection created with ticker: ${nftCollection.ticker}`); // Set success status message
    } catch (error) {
      console.error('Error creating NFT collection:', error);
      setStatus('Error creating NFT collection'); // Set error status message
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Polymesh NFT App</h1>
        {/* Button to connect the Polymesh SDK */}
        <button onClick={connectSDK}>Connect to SDK</button>
        
        {/* Input field and button to create an asset */}
        <div>
          <input
            type="text"
            value={assetName}
            onChange={(e) => setAssetName(e.target.value)}
            placeholder="Enter asset name"
          />
          <button onClick={createAsset}>Create Asset</button>
        </div>
        
        {/* Button to create an NFT collection */}
        <button onClick={createNFTCollection}>Create NFT Collection</button>
        
        {/* Display status messages */}
        <p>{status}</p>
      </header>
    </div>
  );
}

export default App;
