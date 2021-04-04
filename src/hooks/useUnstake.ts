import { useCallback } from 'react'

import useGhost from './useGhost'
import { useWallet } from '@binance-chain/bsc-use-wallet'

import { unstake, getKingGhostContract } from '../ghost/utils'

const useUnstake = (pid: number) => {
  const { account } = useWallet()
  const ghost = useGhost()
  const kingGhostContract = getKingGhostContract(ghost)

  const handleUnstake = useCallback(
    async (amount: string) => {
      const txHash = await unstake(kingGhostContract, pid, amount, account)
      console.log(txHash)
    },
    [account, pid, ghost],
  )

  return { onUnstake: handleUnstake }
}

export default useUnstake
