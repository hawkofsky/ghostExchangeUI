import { useCallback, useEffect, useState } from 'react'
import { provider } from 'web3-core'

import BigNumber from 'bignumber.js'
import { useWallet } from '@binance-chain/bsc-use-wallet'

import { getEarned, getKingGhostContract } from '../ghost/utils'
import useGhost from './useGhost'
import useBlock from './useBlock'

const useEarnings = (pid: number) => {
  const [balance, setBalance] = useState(new BigNumber(0))
  const { account }: { account: string; ethereum: provider } = useWallet()
  const ghost = useGhost()
  const kingGhostContract = getKingGhostContract(ghost)
  const block = useBlock()

  const fetchBalance = useCallback(async () => {
    const balance = await getEarned(kingGhostContract, pid, account)
    setBalance(new BigNumber(balance))
  }, [account, kingGhostContract, ghost])

  useEffect(() => {
    if (account && kingGhostContract && ghost) {
      fetchBalance()
    }
  }, [account, block, kingGhostContract, setBalance, ghost])

  return balance
}

export default useEarnings
