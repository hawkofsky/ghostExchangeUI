import React, { useState } from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import styled from 'styled-components'

import Page from '../../components/Page'
import PageHeader from '../../components/PageHeader'
import logo from '../../assets/img/logo.png'
import WalletProviderModal from '../../components/WalletProviderModal'
import GhostTabs from './components/GhostTabs'
import Border from '../../components/Border'
import useModal from '../../hooks/useModal'
import Spacer from '../../components/Spacer'

const Swap: React.FC = () => {
  const { path } = useRouteMatch()
  const [ title,setTitle ] = useState('Exchange');
  const titleUpdate = (t:string)=>{
    setTitle(t)
  }
  return (
    <Switch>
      <Page>
        <Route exact path={path}>
          <PageHeader
            icon={<img src={logo} height="120" />}
            subtitle=""
            title={title}
          />
          <StyledFarm>
            <StyledCardsWrapper>
              <StyledCardWrapper>
                <Border
                  radius={17}
                  color={'rgba(0,172,126,1)'}
                  borderWidth={1}
                  padding={0}
                  shadow={'0px 0px 42px -4px rgb(0 172 126)'}
                >
                  <Border
                    radius={17}
                    color={'rgb(49 97 84)'}
                    borderWidth={3}
                    padding={0}
                  >
                    <Border
                      radius={17}
                      color={'rgba(0,172,126,1)'}
                      borderWidth={1}
                      padding={5}
                    >
                      <GhostTabs titleUpdate={titleUpdate}></GhostTabs>
                      </Border>
                  </Border>
                </Border>
              </StyledCardWrapper>
            </StyledCardsWrapper>
          </StyledFarm>
          <Spacer></Spacer>
        </Route>
      </Page>
    </Switch>
  )
}
const StyledFarm = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  @media (max-width: 768px) {
    width: 100%;
  }
`

const StyledCardsWrapper = styled.div`
  display: flex;
  width: 600px;
  @media (max-width: 768px) {
    width: 100%;
    flex-flow: column nowrap;
    align-items: center;
  }
`

const StyledCardWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  @media (max-width: 768px) {
    width: 80%;
  }
`

const StyledInfo = styled.h3`
  color: #00ac7e;
  font-size: 16px;
  font-weight: 400;
  margin: 0;
  padding: 0;
  text-align: center;
`
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
