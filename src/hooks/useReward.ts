import { useCallback } from 'react'

import useGhost from './useGhost'
import { useWallet } from '@binance-chain/bsc-use-wallet'

import { harvest, getKingGhostContract } from '../ghost/utils'

const useReward = (pid: number) => {
  const { account } = useWallet()
  const ghost = useGhost()
  const kingGhostContract = getKingGhostContract(ghost)

  const handleReward = useCallback(async () => {
    const txHash = await harvest(kingGhostContract, pid, account)
    console.log(txHash)
    return txHash
  }, [account, pid, ghost])

  return { onReward: handleReward }
}

export default useReward
