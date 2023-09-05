'use client'

import { WagmiConfig, createConfig } from 'wagmi'
import { createPublicClient, http } from 'viem'
import { avalancheFuji } from 'wagmi/chains';
import React from 'react';

const config = createConfig({
  autoConnect: true,
  publicClient: createPublicClient({
    chain: avalancheFuji,
    transport: http()
  }),
})
 
export default function Providers({
    children,
}: {
    children: React.ReactNode,
}) {
  return (
    <WagmiConfig config={config}>
      {children}
    </WagmiConfig>
  )
}
