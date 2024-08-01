import './App.css';
import '@rainbow-me/rainbowkit/styles.css';
import { RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit';
import { Outlet } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import { wagmiconfig } from './wagmiconfig/wagmiconfig';
import Navbar from './Components/Navbar/Navbar';

const queryClient = new QueryClient();

function App() {
  return (
    <WagmiProvider config={wagmiconfig}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider theme={darkTheme()}>
          <Navbar />
          <main style={{ borderTop:'2px',borderColour:'red', marginTop: '80px' }}>
            <Outlet />
          </main>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default App;
