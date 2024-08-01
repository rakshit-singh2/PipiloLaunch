import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { base, mainnet, optimism, sepolia, bsc, arbitrum } from 'wagmi/chains'

const projectId = '009a5125069bb56f589c3fc2e97282e2'

export const wagmiconfig = getDefaultConfig({
    appName: 'Pipilo Launchpad',
    projectId,
    chains: [mainnet, sepolia, optimism, base, bsc, arbitrum],
});

