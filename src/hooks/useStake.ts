import { useCallback } from 'react'

import useGhost from './useGhost'
import { useWallet } from '@binance-chain/bsc-use-wallet'

import { stake, getKingGhostContract } from '../ghost/utils'

const useStake = (pid: number) => {
  const { account } = useWallet()
  const ghost = useGhost()

  const handleStake = useCallback(
    async (amount: string) => {
      const txHash = await stake(
        getKingGhostContract(ghost),
        pid,
        amount,
        account,
      )
      console.log(txHash)
    },
    [account, pid, ghost],
  )

  return { onStake: handleStake }
}

export default useStake
