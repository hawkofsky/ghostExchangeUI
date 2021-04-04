import { useCallback } from 'react'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { Contract } from 'web3-eth-contract'
import { redeem } from '../ghost/utils'

const useRedeem = (kingGhostContract: Contract) => {
  const { account } = useWallet()

  const handleRedeem = useCallback(async () => {
    const txHash = await redeem(kingGhostContract, account)
    console.log(txHash)
    return txHash
  }, [account, kingGhostContract])

  return { onRedeem: handleRedeem }
}

export default useRedeem
