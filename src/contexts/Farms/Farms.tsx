import React, { useState } from 'react'

import { useWallet } from '@binance-chain/bsc-use-wallet'
import useGhost from '../../hooks/useGhost'

import { getFarms } from '../../ghost/utils'

import Context from './context'

const Farms: React.FC = ({ children }) => {
  const [unharvested] = useState(0)

  const ghost = useGhost()
  const { account } = useWallet()

  const farms = getFarms(ghost)

  return (
    <Context.Provider
      value={{
        farms,
        unharvested,
      }}
    >
      {children}
    </Context.Provider>
  )
}

export default Farms
