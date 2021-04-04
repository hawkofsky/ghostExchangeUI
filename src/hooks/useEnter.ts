import { useCallback } from 'react'

import useGhost from './useGhost'
import { useWallet } from '@binance-chain/bsc-use-wallet'

import { enter, getXGhostStakingContract } from '../ghost/utils'

const useEnter = () => {
  const { account } = useWallet()
  const ghost = useGhost()

  const handle = useCallback(
    async (amount: string) => {
      const txHash = await enter(
        getXGhostStakingContract(ghost),
        amount,
        account,
      )
      console.log(txHash)
    },
    [account, ghost],
  )

  return { onEnter: handle }
}

export default useEnter
