import App from '@/app/app'
import Providers from './providers'
import { UserOperationBuilder, IUserOperation } from "userop"
import { Client, Presets } from "userop"

const sendTransaction = async () => {
  const client = await Client.init(
    'https://rpc.ankr.com/avalanche_fuji',
    {
      overrideBundlerRpc: 'http://localhost:4337'
    }
  )
  
  const builder = new UserOperationBuilder().useDefaults({
    sender: '0xDF011a8eF20f8D7272e04fc4B7F58A769fF05613', // Bundler EOA address
  });
  const op = await client.buildUserOperation(builder)
  console.log(op)
  return op
}

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Providers>
        <App></App>
      </Providers>
    </main>
  )
}
