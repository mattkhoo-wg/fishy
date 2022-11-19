import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import '@rainbow-me/rainbowkit/styles.css';
import { NextUIProvider } from '@nextui-org/react';

import {
  getDefaultWallets,
  RainbowKitProvider, lightTheme
} from '@rainbow-me/rainbowkit';
import {
  chain,
  configureChains,
  createClient,
  WagmiConfig,
} from 'wagmi';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';


const { chains, provider } = configureChains(
  [chain.mainnet, chain.polygon, chain.optimism, chain.arbitrum],
  [
    alchemyProvider({ apiKey: process.env.ALCHEMY_ID }),
    publicProvider()
  ]
);

const { connectors } = getDefaultWallets({
  appName: 'My RainbowKit App',
  chains
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider
})



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider  theme={lightTheme({
                        accentColor: '#621BEB',
                        borderRadius: 'medium',
                        fontStack: 'system',
                        overlayBlur: 'small',
                      })} 
      chains={chains}>
         <NextUIProvider>
    <App />
    </NextUIProvider>
                      
    </RainbowKitProvider>
    </WagmiConfig>

  </React.StrictMode>
);


