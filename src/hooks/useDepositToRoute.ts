import { useCallback } from 'react'

import useGhost from './useGhost'
import { useWallet } from '@binance-chain/bsc-use-wallet'

import { depositToRoute, getGhostRoutes } from '../ghost/utils'

const useDepositToRoute = () => {
  const { account } = useWallet()
  const ghost = useGhost()

  const handle = useCallback(
    async (deposit: any, currency: string, amount: string) => {
      const routes: { [key: string]: any } = getGhostRoutes(ghost)
      const txHash = await depositToRoute(
        routes[currency],
        deposit,
        currency,
        amount,
        account,
      )
      console.log(txHash)
    },
    [account, ghost],
  )

  return { onDepositToRoute: handle }
}

export default useDepositToRoute
