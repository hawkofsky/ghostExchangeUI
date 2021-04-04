import React from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import { useWallet } from '@binance-chain/bsc-use-wallet'

import logo from '../../assets/img/logo.png'

import Page from '../../components/Page'
import StakingPageHeader from '../../components/StakingPageHeader'

import StakeXGhost from '../StakeXGhost'
import { contractAddresses } from '../../ghost/lib/constants'

const Staking: React.FC = () => {
  const { path } = useRouteMatch()
  const { account } = useWallet()

  return (
    <Switch>
      <Page>
        {/* {!!account ? (
          <> */}
        <Route exact path={path}>
          <StakingPageHeader
            icon={<img src={logo} height="120" alt="logo" />}
            subtitle="Welcome to the haunted forest, stake GOMIX to earn GOMIXs."
            link="Click to review the CONTRACT!"
            redirect={`https://bscscan.com/address/${contractAddresses.xGhost[56]}`}
            title="Gomix Staking"
            unlocked={!!account}
          />
        </Route>
        <StakeXGhost unlocked={!!account} />
        {/* </>
        ) : (
          <div
            style={{
              alignItems: 'center',
              display: 'flex',
              flex: 1,
              justifyContent: 'center',
            }}
          >
            <Button
              onClick={onPresentWalletProviderModal}
              text="👻 Connect Wallet 🔌"
              border="1px solid"
            />
          </div>
        )} */}
      </Page>
    </Switch>
  )
}

export default Staking
