import React, { createContext, useEffect, useState } from 'react'

import { useWallet } from '@binance-chain/bsc-use-wallet'

import { Ghost } from '../../ghost'

export interface GhostContext {
  ghost?: typeof Ghost
}

export const Context = createContext<GhostContext>({
  ghost: undefined,
})

declare global {
  interface Window {
    ghostlib: any
  }
}

const GhostProvider: React.FC = ({ children }) => {
  const { ethereum }: { ethereum: any } = useWallet()
  const [ghost, setGhost] = useState<any>()

  // @ts-ignore
  window.ghost = ghost
  // @ts-ignore

  useEffect(() => {
    if (ethereum) {
      const chainId = Number(ethereum.chainId)
      const ghostLib = new Ghost(ethereum, chainId, false, {
        defaultAccount: ethereum.selectedAddress,
        defaultConfirmations: 1,
        autoGasMultiplier: 1.5,
        testing: false,
        defaultGas: '6000000',
        defaultGasPrice: '1000000000000',
        accounts: [],
        ethereumNodeTimeout: 10000,
      })
      setGhost(ghostLib)
      window.ghostlib = ghostLib
    }
  }, [ethereum])

  return <Context.Provider value={{ ghost }}>{children}</Context.Provider>
}

export default GhostProvider
