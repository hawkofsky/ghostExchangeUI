import { useCallback } from 'react'

import useGhost from './useGhost'
import { useWallet } from '@binance-chain/bsc-use-wallet'

import { withdrawFromRoute, getGhostRoutes } from '../ghost/utils'

const useWithdrawFromRoute = () => {
  const { account } = useWallet()
  const ghost = useGhost()

  const handle = useCallback(
    async (currency: string, amount: string, proof: any, args: any) => {
      const routes: { [key: string]: any } = getGhostRoutes(ghost)
      const txHash = await withdrawFromRoute(
        routes[currency.toUpperCase()],
        amount,
        proof,
        args,
        account,
      )
      console.log(txHash)
    },
    [account, ghost],
  )

  return { onWithdrawFromRoute: handle }
}

export default useWithdrawFromRoute
