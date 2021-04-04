import { useCallback, useEffect, useState } from 'react'

import BigNumber from 'bignumber.js'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { Contract } from 'web3-eth-contract'

import { getAllowance } from '../utils/erc20'

const useAllowanceRoutes = (
  ercContract: Contract | null,
  spender: any,
  netId: number,
) => {
  const [allowance, setAllowance] = useState(new BigNumber(0))
  const { account }: { account: string } = useWallet()

  const fetchAllowance = useCallback(async () => {
    if (!ercContract) {
      setAllowance(
        new BigNumber(
          '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff',
        ),
      )
      return
    }
    if (!spender) {
      setAllowance(new BigNumber(0))
    } else {
      const spenderAddress = spender[netId]
      const allowance = await getAllowance(ercContract, account, spenderAddress)
      setAllowance(new BigNumber(allowance))
    }
  }, [account, spender, ercContract])

  useEffect(() => {
    if (!ercContract) {
      fetchAllowance()
    } else {
      if (account && spender && ercContract) {
        fetchAllowance()
      }
      let refreshInterval = setInterval(fetchAllowance, 10000)
      return () => clearInterval(refreshInterval)
    }
  }, [account, spender, ercContract])

  return allowance
}

export default useAllowanceRoutes
