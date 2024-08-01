import { Polymesh } from '@polymeshassociation/polymesh-sdk';
import { BrowserExtensionSigningManager } from '@polymeshassociation/browser-extension-signing-manager';

async function run() {
  const signingManager = await BrowserExtensionSigningManager.create(
    'MY_APP_NAME'
  ); // The Polymesh wallet extension will ask the user to authorize MY_APP_NAME for access

  const polyClient = await Polymesh.connect({
    nodeUrl: 'wss://some-node-url.com',
    signingManager,
  });

  // do stuff with the client
}