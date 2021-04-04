import { useCallback, useEffect, useState } from 'react'
import { provider } from 'web3-core'

import BigNumber from 'bignumber.js'
import { useWallet } from '@binance-chain/bsc-use-wallet'

import { getEarned, getKingGhostContract, getFarms } from '../ghost/utils'
import useGhost from './useGhost'
import useBlock from './useBlock'

const useAllEarnings = () => {
  const [balances, setBalance] = useState([] as Array<BigNumber>)
  const { account }: { account: string; ethereum: provider } = useWallet()
  const ghost = useGhost()
  const farms = getFarms(ghost)
  const kingGhostContract = getKingGhostContract(ghost)
  const block = useBlock()

  const fetchAllBalances = useCallback(async () => {
    const balances: Array<BigNumber> = await Promise.all(
      farms.map(({ pid }: { pid: number }) =>
        getEarned(kingGhostContract, pid, account),
      ),
    )
    setBalance(balances)
  }, [account, kingGhostContract, ghost])

  useEffect(() => {
    if (account && kingGhostContract && ghost) {
      fetchAllBalances()
    }
  }, [account, block, kingGhostContract, setBalance, ghost])

  return balances
}

export default useAllEarnings
