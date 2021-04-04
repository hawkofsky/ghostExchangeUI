import { useCallback } from 'react'

import useGhost from './useGhost'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { provider } from 'web3-core'
import {
  approve,
  getGhostContract,
  getXGhostStakingContract,
} from '../ghost/utils'

const useApproveStaking = () => {
  const { account }: { account: string; ethereum: provider } = useWallet()
  const ghost = useGhost()
  const lpContract = getGhostContract(ghost)
  const contract = getXGhostStakingContract(ghost)

  const handleApprove = useCallback(async () => {
    try {
      const tx = await approve(lpContract, contract, account)
      return tx
    } catch (e) {
      return false
    }
  }, [account, lpContract, contract])

  return { onApprove: handleApprove }
}

export default useApproveStaking
