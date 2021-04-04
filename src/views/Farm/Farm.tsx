import React, { useContext, useEffect, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import styled, { ThemeContext } from 'styled-components'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { provider } from 'web3-core'
import FarmPageHeader from '../../components/FarmPageHeader'
import TokenPairIcon from '../../components/TokenPairIcon'
import Spacer from '../../components/Spacer'
import useFarm from '../../hooks/useFarm'
import useGhost from '../../hooks/useGhost'
import { getContract } from '../../utils/erc20'
import Harvest from './components/Harvest'
import Stake from './components/Stake'
import Border from '../../components/Border'

const Farm: React.FC = () => {
  const { farmId } = useParams()
  const {
    pid,
    lpToken,
    tokenSymbol,
    quoteSymbol,
    lpTokenAddress,
    earnToken,
    name,
  } = useFarm(farmId) || {
    pid: 0,
    tokenSymbol: 'WBNB',
    quoteSymbol: 'WBNB',
    lpToken: '',
    lpTokenAddress: '',
    tokenAddress: '',
    earnToken: '',
    name: '',
  }

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const ghost = useGhost()
  const { ethereum } = useWallet()

  const lpContract = useMemo(() => {
    return getContract(ethereum as provider, lpTokenAddress)
  }, [ethereum, lpTokenAddress])

  const lpTokenName = useMemo(() => {
    return lpToken
  }, [lpToken])

  const earnTokenName = useMemo(() => {
    return earnToken.toUpperCase()
  }, [earnToken])

  if (name !== '') {
    return (
      <>
        <FarmPageHeader
          icon={<TokenPairIcon token1={tokenSymbol} token2={quoteSymbol} />}
          subtitle={`Deposit ${lpTokenName} Tokens and earn ${earnTokenName}`}
          title={lpTokenName}
        />
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
                padding={0}
              >
                <Border
                  radius={7}
                  color={'rgba(0,172,126,1)'}
                  borderWidth={1}
                  padding={5}
                >
                  {/* <GradientBorderOnly
                  radius={7}
                  color1={'transparent'}
                  color2={'#5b2b65'}
                  direction="to right"
                  borderWidth={7}
                > */}
                  <Harvest pid={pid} /> {/* </GradientBorderOnly> */}
                </Border>
              </Border>
            </Border>

            <Spacer />
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
                padding={0}
              >
                <Border
                  radius={7}
                  color={'rgba(0,172,126,1)'}
                  borderWidth={1}
                  padding={5}
                >
                  {/* <GradientBorderOnly
                  radius={7}
                  color1={'transparent'}
                  color2={'#5b2b65'}
                  direction="to right"
                  borderWidth={7}
                > */}
                  <Stake
                    lpContract={lpContract}
                    pid={pid}
                    tokenName={lpToken}
                  />
                  {/* </GradientBorderOnly> */}
                </Border>
              </Border>
            </Border>
          </StyledCardsWrapper>
          <Spacer size="lg" />
          <StyledInfo>
            Every time you stake and unstake LP tokens, the contract will
            automagically harvest GOMIX rewards for you
          </StyledInfo>
          <Spacer size="md" />
          {/* <StyledLink
          target="__blank"
          href={`https://ghostswap.vision/pair/${lpTokenAddress}`}
        >
          {lpTokenName} Info
        </StyledLink> */}
        </StyledFarm>
      </>
    )
  }
  return <div />
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
  width: 800px;
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

export default Farm
