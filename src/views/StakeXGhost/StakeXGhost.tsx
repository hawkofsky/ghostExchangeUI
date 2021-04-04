import React, { useContext, useEffect, useMemo, useState } from 'react'
import styled, { ThemeContext } from 'styled-components'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { provider } from 'web3-core'
import Spacer from '../../components/Spacer'
import useGhost from '../../hooks/useGhost'
import { getContract } from '../../utils/erc20'
import UnstakeXGhost from './components/UnstakeXGhost'
import StakeGhost from './components/StakeGhost'

import { contractAddresses } from '../../ghost/lib/constants'
import { getXGhostSupply } from '../../ghost/utils'
import BigNumber from 'bignumber.js'
import { getBalanceNumber } from '../../utils/formatBalance'
import Border from '../../components/Border'

interface StakeXGhostProps {
  unlocked: boolean
}

const StakeXGhost: React.FC<StakeXGhostProps> = ({ unlocked = false }) => {
  const { tokenAddress } = {
    tokenAddress: contractAddresses.xGhost[56],
  }

  const [totalSupply, setTotalSupply] = useState<BigNumber>()

  const ghost = useGhost()
  const { ethereum } = useWallet()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    async function fetchTotalSupply() {
      const supply = await getXGhostSupply(ghost)
      setTotalSupply(supply)
    }

    if (ghost) {
      fetchTotalSupply()
    }
  }, [ghost, setTotalSupply])

  const lpContract = useMemo(() => {
    return getContract(ethereum as provider, tokenAddress)
  }, [ethereum, tokenAddress])

  return (
    <>
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
                  {/* <GradientBorderOnly
                    radius={7}
                    color1={'transparent'}
                    color2={'#5b2b65'}
                    direction="to right"
                    borderWidth={7}
                  > */}
                  <UnstakeXGhost unlocked={unlocked} lpContract={lpContract} />
                  {/* </GradientBorderOnly> */}
                </Border>
              </Border>
            </Border>
          </StyledCardWrapper>
          <Spacer />
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
                  {/* <GradientBorderOnly
                    radius={7}
                    color1={'transparent'}
                    color2={'#5b2b65'}
                    direction="to right"
                    borderWidth={7}
                  > */}
                  <StakeGhost unlocked={unlocked} />
                  {/* </GradientBorderOnly> */}
                </Border>
              </Border>
            </Border>
          </StyledCardWrapper>
        </StyledCardsWrapper>
        <Spacer size="lg" />
        <StyledCardsWrapper>
          <StyledCardWrapper>
            <StyledInfo>
              You will earn a portion of the swaps fees based on the amount of
              xGOMIX held relative the weight of the staking. xGOMIX can be
              minted by staking GOMIX. To redeem GOMIX staked plus swap fees
              convert xGOMIX back to GOMIX.{' '}
              {totalSupply
                ? `There are currently ${getBalanceNumber(
                    totalSupply,
                  )} xGOMIX in the whole pool.`
                : ''}
            </StyledInfo>
          </StyledCardWrapper>
        </StyledCardsWrapper>
        <Spacer size="lg" />
      </StyledFarm>
    </>
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

export default StakeXGhost
