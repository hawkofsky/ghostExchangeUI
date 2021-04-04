import { useCallback } from 'react'

import useGhost from './useGhost'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { provider } from 'web3-core'
import { Contract } from 'web3-eth-contract'

import { approve, getKingGhostContract } from '../ghost/utils'

const useApprove = (lpContract: Contract) => {
  const { account }: { account: string; ethereum: provider } = useWallet()
  const ghost = useGhost()
  const kingGhostContract = getKingGhostContract(ghost)

  const handleApprove = useCallback(async () => {
    try {
      const tx = await approve(lpContract, kingGhostContract, account)
      return tx
    } catch (e) {
      return false
    }
  }, [account, lpContract, kingGhostContract])

  return { onApprove: handleApprove }
}

export default useApprove
