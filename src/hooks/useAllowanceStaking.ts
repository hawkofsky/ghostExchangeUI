import { useCallback, useEffect, useState } from 'react'

import BigNumber from 'bignumber.js'
import useGhost from './useGhost'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { provider } from 'web3-core'

import { getAllowance } from '../utils/erc20'
import { getGhostContract, getXGhostStakingContract } from '../ghost/utils'

const useAllowanceStaking = () => {
  const [allowance, setAllowance] = useState(new BigNumber(0))
  const { account }: { account: string; ethereum: provider } = useWallet()
  const ghost = useGhost()
  const lpContract = getGhostContract(ghost)
  const stakingContract = getXGhostStakingContract(ghost)

  const fetchAllowance = useCallback(async () => {
    if (stakingContract) {
      const allowance = await getAllowance(
        lpContract,
        account,
        stakingContract.options.address,
      )
      setAllowance(new BigNumber(allowance))
    }
  }, [account, stakingContract, lpContract])

  useEffect(() => {
    if (account && stakingContract && lpContract) {
      fetchAllowance()
    }
    let refreshInterval = setInterval(fetchAllowance, 10000)
    return () => clearInterval(refreshInterval)
  }, [account, stakingContract, lpContract])

  return allowance
}

export default useAllowanceStaking
