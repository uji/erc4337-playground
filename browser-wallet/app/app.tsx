'use client'
import { useEffect, useState } from "react"
import { UserOperationBuilder, IUserOperation } from "userop"
import { Client } from "userop"
import { useAccount, useConnect, useDisconnect } from "wagmi"
import { InjectedConnector } from "wagmi/connectors/injected"

const sendTransaction = () => {
  const builder = new UserOperationBuilder().useDefaults({
    sender: '0xDF011a8eF20f8D7272e04fc4B7F58A769fF05613', // Bundler EOA address
  });

  const client = Client.init(
    'https://rpc.ankr.com/avalanche_fuji',
    {
      overrideBundlerRpc: 'http://localhost:4337'
    }
  ).then((client) => {
     client.buildUserOperation(builder).then((op) => {
       console.log(op)
     })
     // client.sendUserOperation(builder).then(({userOpHash, wait}) => {
     //   console.log(userOpHash)
     // })
  })
}

export default function App() {
  const { address, isConnected } = useAccount()
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  })
  const { disconnect } = useDisconnect()

  if (isConnected)
    return (
      <div>
        Connected to {address}
        <button onClick={() => disconnect()}>Disconnect</button>
        <button onClick={() => sendTransaction()}>Send Transaction</button>
      </div>
    )
  return <button onClick={() => connect()}>Connect Wallet</button>
}
