import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { base, mainnet, optimism, sepolia, bsc, arbitrum } from 'wagmi/chains'
import { http } from 'wagmi'

const projectId = '009a5125069bb56f589c3fc2e97282e2'

export const wagmiconfig = getDefaultConfig({
    appName: 'Pipilo Launchpad',
    projectId,
    chains: [mainnet, sepolia, optimism, base, bsc, arbitrum],
    transports: { 
        [mainnet.id]: http("https://ethereum-rpc.publicnode.com"), 
        [sepolia.id]: http("https://ethereum-sepolia-rpc.publicnode.com"), 
        [optimism.id]: http("https://optimism-rpc.publicnode.com"), 
        [base.id]: http("https://base-rpc.publicnode.com"), 
        [bsc.id]: http("https://bsc-pokt.nodies.app"), 
        [arbitrum.id]: http("https://arbitrum.drpc.org"), 
    },
    
});


    


