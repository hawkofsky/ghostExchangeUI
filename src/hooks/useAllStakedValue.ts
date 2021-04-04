import { useCallback, useEffect, useState } from 'react'
import { provider } from 'web3-core'

import BigNumber from 'bignumber.js'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { Contract } from 'web3-eth-contract'

import {
  getKingGhostContract,
  getExtraContracts,
  getFarms,
  getTotalLPWbnbValue,
} from '../ghost/utils'
import useGhost from './useGhost'
import useBlock from './useBlock'

export interface StakedValue {
  tokenAmount: BigNumber
  wbnbAmount: BigNumber
  totalWbnbValue: BigNumber
  tokenPriceInWbnb: BigNumber
  poolWeight: BigNumber
  quoteSymbol: string
}

const useAllStakedValue = () => {
  const [balances, setBalance] = useState([] as Array<StakedValue>)
  const { account }: { account: string; ethereum: provider } = useWallet()
  const ghost = useGhost()
  const farms = getFarms(ghost)
  const kingGhostContract = getKingGhostContract(ghost)
  const extraContracts = getExtraContracts(ghost)
  const block = useBlock()

  const fetchAllStakedValue = useCallback(async () => {
    const balances: Array<StakedValue> = await Promise.all(
      farms.map(
        ({
          pid,
          lpContract,
          tokenContract,
          quoteSymbol,
        }: {
          pid: number
          lpContract: Contract
          tokenContract: Contract
          quoteSymbol: string
        }) =>
          getTotalLPWbnbValue(
            kingGhostContract,
            extraContracts,
            lpContract,
            tokenContract,
            pid,
            quoteSymbol,
          ),
      ),
    )

    setBalance(balances)
  }, [account, kingGhostContract, ghost])

  useEffect(() => {
    if (account && kingGhostContract && ghost) {
      fetchAllStakedValue()
    }
  }, [account, block, kingGhostContract, setBalance, ghost])

  return balances
}

export default useAllStakedValue
