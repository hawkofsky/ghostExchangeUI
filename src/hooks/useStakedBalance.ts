import { useCallback, useEffect, useState } from 'react'

import BigNumber from 'bignumber.js'
import { useWallet } from '@binance-chain/bsc-use-wallet'

import { getStaked, getKingGhostContract } from '../ghost/utils'
import useGhost from './useGhost'
import useBlock from './useBlock'

const useStakedBalance = (pid: number) => {
  const [balance, setBalance] = useState(new BigNumber(0))
  const { account }: { account: string } = useWallet()
  const ghost = useGhost()
  const kingGhostContract = getKingGhostContract(ghost)
  const block = useBlock()

  const fetchBalance = useCallback(async () => {
    const balance = await getStaked(kingGhostContract, pid, account)
    setBalance(new BigNumber(balance))
  }, [account, pid, ghost])

  useEffect(() => {
    if (account && ghost) {
      fetchBalance()
    }
  }, [account, pid, setBalance, block, ghost])

  return balance
}

export default useStakedBalance
