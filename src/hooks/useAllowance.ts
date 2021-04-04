import { useCallback, useEffect, useState } from 'react'

import BigNumber from 'bignumber.js'
import useGhost from './useGhost'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { provider } from 'web3-core'
import { Contract } from 'web3-eth-contract'

import { getAllowance } from '../utils/erc20'
import { getKingGhostContract } from '../ghost/utils'

const useAllowance = (lpContract: Contract) => {
  const [allowance, setAllowance] = useState(new BigNumber(0))
  const { account }: { account: string; ethereum: provider } = useWallet()
  const ghost = useGhost()
  const kingGhostContract = getKingGhostContract(ghost)

  const fetchAllowance = useCallback(async () => {
    const allowance = await getAllowance(
      lpContract,
      account,
      kingGhostContract.options.address,
    )
    setAllowance(new BigNumber(allowance))
  }, [account, kingGhostContract, lpContract])

  useEffect(() => {
    if (account && kingGhostContract && lpContract) {
      fetchAllowance()
    }
    let refreshInterval = setInterval(fetchAllowance, 10000)
    return () => clearInterval(refreshInterval)
  }, [account, kingGhostContract, lpContract])

  return allowance
}

export default useAllowance
