import React from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import styled from 'styled-components'

import Page from '../../components/Page'
import PageHeader from '../../components/PageHeader'
import logo from '../../assets/img/logo.png'
import WalletProviderModal from '../../components/WalletProviderModal'

import useModal from '../../hooks/useModal'

const Swap: React.FC = () => {
  const { path } = useRouteMatch()
  return (
    <Switch>
      <Page>
        <Route exact path={path}>
          <PageHeader
            icon={<img src={logo} height="120" />}
            subtitle=""
            title="Ghost Swap"
          />
        </Route>
        <StyledTitle>Coming Soon</StyledTitle>
      </Page>
    </Switch>
  )
}

const StyledTitle = styled.h1`
  color: ${(props) => props.theme.color.white[100]};
  font-size: 36px;
  text-align: center;
  font-weight: 700;
  margin-top: 200px;
  padding: 0;
  font-family: 'Calvert MT Std';
`

export default Swap
