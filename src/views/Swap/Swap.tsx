import React from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import styled from 'styled-components'

import Page from '../../components/Page'
import PageHeader from '../../components/PageHeader'
import logo from '../../assets/img/logo.png'
import WalletProviderModal from '../../components/WalletProviderModal'

import useModal from '../../hooks/useModal'
import Border from "../../components/Border";
import StyledButton from "../../components/Button";
import Harvest from "../Farm/components/Harvest";
import Spacer from "../../components/Spacer";
import Stake from "../Farm/components/Stake";

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

        <StyledFarm>
          <StyledCardsWrapper>
            <Border
              radius={11}

              color={'rgba(0,172,126,1)'}
              borderWidth={1}
              padding={0}
              shadow={'0px 0px 42px -4px rgb(0 172 126)'}
            >
              <Border
                radius={10}
                color={'rgb(49 97 84)'}
                borderWidth={3}
                padding={2}
              >
                <Border
                  color={'rgb(49 97 84)'}
                  borderWidth={1}
                >
                   <ExchangeWrapper>
                     <Tabs>
                       <TabLink href={''}>Exchange</TabLink>
                       <TabLink href={''}>Pool</TabLink>
                     </Tabs>
                   </ExchangeWrapper>
                  <StyledButton>
                    Enter Amount
                  </StyledButton>
                </Border>
               
              </Border>
            </Border>
          </StyledCardsWrapper>
        </StyledFarm>

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

const StyledFarm = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  @media (max-width: 768px) {
    width: 100%;
  }
`
const ExchangeWrapper = styled.div`
  border: 1px solid rgba(0,172,126,1);
  margin: 0px auto; 
  background: rgba(0,0,0,0.8); 
  box-shadow: 0px 0px 20px #0F8C6E; 
  border-radius: 10px;
`

const Tabs = styled.div`
  width: 100%;
`

const TabLink = styled.a`
 color: #8CC63F; 
 font-size: 21px; 
 text-align: center; 
 text-decoration: none; 
 width: 50%; 
 display: inline-block; 
 padding: 20px 0px;
 float: left; 
 border-radius: 10px 10px 0px 0px; 
 border: solid 1px #406F5B; 
 box-sizing: border-box; 
 border-bottom: none;
`

const StyledCardsWrapper = styled.div`
  display: flex;
  width: 400px;
  @media (max-width: 768px) {
    width: 100%;
    flex-flow: column nowrap;
    align-items: center;
  }
`

const StyledInfo = styled.h3`
  color: ${(props) => props.theme.color.green[100]};
  font-size: 16px;
  font-weight: 400;
  margin: 0;
  padding: 0;
  text-align: center;
`


export default Swap
