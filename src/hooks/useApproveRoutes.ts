import { useCallback } from 'react'

import { useWallet } from '@binance-chain/bsc-use-wallet'
import { provider } from 'web3-core'
import { Contract } from 'web3-eth-contract'

import { approveAddress } from '../ghost/utils'

const useApproveRoutes = (
  ercContract: Contract | null,
  spender: any,
  netId: number,
) => {
  const { account }: { account: string; ethereum: provider } = useWallet()
  const handleApprove = useCallback(async () => {
    try {
      if (!spender) {
        return false
      }
      const tx = await approveAddress(ercContract, spender[netId], account)
      return tx
    } catch (e) {
      return false
    }
  }, [account, spender, netId])

  return { onApprove: handleApprove }
}

export default useApproveRoutes
