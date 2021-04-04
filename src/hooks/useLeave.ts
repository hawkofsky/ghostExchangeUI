import { useCallback } from 'react'

import useGhost from './useGhost'
import { useWallet } from '@binance-chain/bsc-use-wallet'

import { leave, getXGhostStakingContract } from '../ghost/utils'

const useLeave = () => {
  const { account } = useWallet()
  const ghost = useGhost()

  const handle = useCallback(
    async (amount: string) => {
      const txHash = await leave(
        getXGhostStakingContract(ghost),
        amount,
        account,
      )
      console.log(txHash)
    },
    [account, ghost],
  )

  return { onLeave: handle }
}

export default useLeave
