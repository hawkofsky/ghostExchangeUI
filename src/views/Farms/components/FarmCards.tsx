import BigNumber from 'bignumber.js'
import React, { useContext, useEffect, useState } from 'react'
import Countdown, { CountdownRenderProps } from 'react-countdown'
import styled, { keyframes, ThemeContext } from 'styled-components'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import Button from '../../../components/Button'
import Card from '../../../components/Card'
import CardContent from '../../../components/CardContent'
import TokenPairIcon from '../../../components/TokenPairIcon'
import Loader from '../../../components/Loader'
import Spacer from '../../../components/Spacer'
import { Farm } from '../../../contexts/Farms'
import useAllStakedValue, {
  StakedValue,
} from '../../../hooks/useAllStakedValue'
import useFarms from '../../../hooks/useFarms'
import useGhost from '../../../hooks/useGhost'
import { getEarned, getKingGhostContract } from '../../../ghost/utils'
import { bnToDec } from '../../../utils'
import Border from '../../../components/Border'
import useGlobal from '../../../store'
import GradientBorderOnly from '../../../components/GradientBorderOnly'
import GradientBorder from '../../../components/GradientBorder'
import { tokenToString } from 'typescript'
import { contractAddresses } from '../../../ghost/lib/constants'

interface FarmWithStakedValue extends Farm, StakedValue {
  apy: BigNumber
}

const FarmCards: React.FC = () => {
  const [globalState, globalActions] = useGlobal()
  const prices = globalState.prices

  const [farms] = useFarms()
  const { account } = useWallet()
  const stakedValue = useAllStakedValue()

  const [ghostPrice, setGhostPrice] = useState<BigNumber>(new BigNumber(0))

  useEffect(() => {
    setGhostPrice(prices['gomix'] ? prices['gomix'] : new BigNumber(0))
  }, [prices])

  const BSC_BLOCK_TIME = 3
  const BLOCKS_PER_YEAR = new BigNumber((60 / BSC_BLOCK_TIME) * 60 * 24 * 365)
  const GHOST_PER_BLOCK = new BigNumber(40)

  if (stakedValue[0] != undefined) {
    console.log(stakedValue[0].poolWeight.toString())
    console.log(stakedValue[0].totalWbnbValue.toString())
  }

  const rows = farms.reduce<FarmWithStakedValue[][]>(
    (farmRows, farm: any, i) => {
      const farmWithStakedValue = {
        ...farm,
        ...stakedValue[i],
        apy:
          stakedValue[i] && prices[stakedValue[i].quoteSymbol.toLowerCase()]
            ? ghostPrice
                .times(GHOST_PER_BLOCK)
                .times(BLOCKS_PER_YEAR)
                .times(stakedValue[i].poolWeight)
                // .times(3)
                .div(stakedValue[i].totalWbnbValue)
                .div(prices[stakedValue[i].quoteSymbol.toLowerCase()])
            : null,
      }
      const newFarmRows = [...farmRows]
      if (newFarmRows[newFarmRows.length - 1].length === 3) {
        newFarmRows.push([farmWithStakedValue])
      } else {
        newFarmRows[newFarmRows.length - 1].push(farmWithStakedValue)
      }
      return newFarmRows
    },
    [[]],
  )

  return (
    <StyledCards>
      {!!rows[0].length ? (
        rows.map((farmRow, i) => (
          <StyledRow key={i}>
            {farmRow.map((farm, j) => (
              <React.Fragment key={j}>
                <FarmCard farm={farm} />
                {(j === 0 || j === 1) && <StyledSpacer />}
              </React.Fragment>
            ))}
          </StyledRow>
        ))
      ) : (
        <StyledLoadingWrapper>
          <Loader text="Cooking the rice ..." />
        </StyledLoadingWrapper>
      )}
    </StyledCards>
  )
}

interface FarmCardProps {
  farm: FarmWithStakedValue
}

const FarmCard: React.FC<FarmCardProps> = ({ farm }) => {
  const [startTime, setStartTime] = useState(0)
  const [harvestable, setHarvestable] = useState(0)

  const { account } = useWallet()
  const { lpTokenAddress, tokenAddress, quoteSymbol } = farm
  const ghost = useGhost()
  const { color } = useContext(ThemeContext)

  const renderer = (countdownProps: CountdownRenderProps) => {
    const { hours, minutes, seconds } = countdownProps
    const paddedSeconds = seconds < 10 ? `0${seconds}` : seconds
    const paddedMinutes = minutes < 10 ? `0${minutes}` : minutes
    const paddedHours = hours < 10 ? `0${hours}` : hours
    return (
      <span style={{ width: '100%' }}>
        {paddedHours}:{paddedMinutes}:{paddedSeconds}
      </span>
    )
  }

  const getLPHref = () => {
    const token1 =
      quoteSymbol === 'WBNB'
        ? 'BNB'
        : (contractAddresses as any)[quoteSymbol.toLowerCase()][56]
    const token2 = tokenAddress
    return `https://exchange.pancakeswap.finance/#/add/${token1}/${token2}`
  }

  useEffect(() => {
    async function fetchEarned() {
      if (ghost) return
      const earned = await getEarned(
        getKingGhostContract(ghost),
        lpTokenAddress,
        account,
      )
      setHarvestable(bnToDec(earned))
    }

    if (ghost && account) {
      fetchEarned()
    }
  }, [ghost, lpTokenAddress, account, setHarvestable])

  const poolActive = true // startTime * 1000 - Date.now() <= 0

  return (
    <StyledCardWrapper>
      {farm.tokenSymbol === 'GOMIX' && <StyledCardAccent />}
      <Border
        radius={17}
        color={'rgba(0,172,126,1)'}
        borderWidth={1}
        padding={0}
        shadow={'0px 0px 42px -4px rgb(0 172 126)'}
      >
        <Border radius={17} color={'rgb(49 97 84)'} borderWidth={3} padding={0}>
          <Border
            radius={14}
            color={'rgba(0,172,126,1)'}
            borderWidth={1}
            padding={5}
          >
            {/* <GradientBorderOnly
                radius={10}
                color1={'transparent'}
                color2={'#5b2b65'}
                direction="to right"
                borderWidth={7}
              > */}
            <Card>
              <CardContent>
                <StyledContent>
                  <TokenPairIcon
                    token1={farm.tokenSymbol}
                    token2={farm.quoteSymbol}
                  />
                  {/* <CardIcon>{farm.icon}</CardIcon> */}
                  <StyledTitle>{farm.lpToken.toUpperCase()}</StyledTitle>
                  <StyledDetails>
                    <StyledDetail>Deposit {farm.lpToken}</StyledDetail>
                    <StyledDetail>
                      Earn {farm.earnToken.toUpperCase()}
                    </StyledDetail>
                  </StyledDetails>
                  <Spacer />
                  <StyledButtonGroup>
                    <Button
                      disabled={!poolActive}
                      text={poolActive ? 'Select' : undefined}
                      to={`/farms/${farm.id}`}
                      border="1px solid"
                    >
                      {!poolActive && (
                        <Countdown
                          date={new Date(startTime * 1000)}
                          renderer={renderer}
                        />
                      )}
                    </Button>
                    <StyledSpacer />
                    <Button
                      disabled={!poolActive}
                      text={'Get LP'}
                      href={getLPHref()}
                      border="1px solid"
                    />
                  </StyledButtonGroup>
                  <StyledInsight>
                    <span>APY</span>
                    <span>
                      {farm.apy
                        ? `${farm.apy
                            .times(new BigNumber(100))
                            .toNumber()
                            .toLocaleString('en-US')
                            .slice(0, -1)}%`
                        : 'Loading ...'}
                    </span>
                    {/* <span>
                {farm.tokenAmount
                  ? (farm.tokenAmount.toNumber() || 0).toLocaleString('en-US')
                  : '-'}{' '}
                {farm.tokenSymbol}
              </span>
              <span>
                {farm.wbnbAmount
                  ? (farm.wbnbAmount.toNumber() || 0).toLocaleString('en-US')
                  : '-'}{' '}
                ETH
              </span> */}
                  </StyledInsight>
                </StyledContent>
              </CardContent>
            </Card>
            {/* </GradientBorderOnly> */}
          </Border>
        </Border>
      </Border>
    </StyledCardWrapper>
  )
}

const RainbowLight = keyframes`

	0% {
		background-position: 0% 50%;
	}
	50% {
		background-position: 100% 50%;
	}
	100% {
		background-position: 0% 50%;
	}
`
// background: linear-gradient(
//     45deg,
//     rgba(255, 0, 0, 1) 0%,
//     rgba(255, 154, 0, 1) 10%,
//     rgba(208, 222, 33, 1) 20%,
//     rgba(79, 220, 74, 1) 30%,
//     rgba(63, 218, 216, 1) 40%,
//     rgba(47, 201, 226, 1) 50%,
//     rgba(28, 127, 238, 1) 60%,
//     rgba(95, 21, 242, 1) 70%,
//     rgba(186, 12, 248, 1) 80%,
//     rgba(251, 7, 217, 1) 90%,
//     rgba(255, 0, 0, 1) 100%
// );
// animation: ${RainbowLight} 2s linear infinite;

const StyledCardAccent = styled.div`
  background-size: 300% 300%;
  border-radius: 12px;
  filter: blur(6px);
  position: absolute;
  top: -2px;
  right: -2px;
  bottom: -2px;
  left: -2px;
  z-index: -1;
`

const StyledCards = styled.div`
  width: 100%;
  @media (max-width: 768px) {
    width: 100%;
  }
`

const StyledLoadingWrapper = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  justify-content: center;
`

const StyledRow = styled.div`
  display: flex;
  margin-bottom: ${(props) => props.theme.spacing[4]}px;
  flex-flow: row wrap;
  @media (max-width: 768px) {
    width: 100%;
    flex-flow: column nowrap;
    align-items: center;
  }
`

const StyledCardWrapper = styled.div`
  display: flex;
  width: 30%;
  position: relative;
  @media (max-width: 768px) {
    width: 100%;
  }
`

const StyledTitle = styled.h4`
  margin: ${(props) => props.theme.spacing[2]}px 0 0;
  padding: 0;
  font-style: normal;
  font-size: 32px;
  color: rgba(237, 30, 121, 1);
  text-align: center;
  height: 70px;
`

const StyledContent = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`

const StyledSpacer = styled.div`
  height: ${(props) => props.theme.spacing[4]}px;
  width: ${(props) => props.theme.spacing[4]}px;
`

const StyledDetails = styled.div`
  margin-top: ${(props) => props.theme.spacing[2]}px;
  text-align: center;
  font-style: normal;
  font-size: 18px;
  color: rgba(0, 172, 126, 1);
`

const StyledDetail = styled.div`
  color: ${(props) => '#00AC7E'};
`

const StyledInsight = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 24px;
  text-align: center;
  font-style: normal;
  font-size: 16px;
  color: rgba(0, 172, 126, 1);
`

const StyledButtonGroup = styled.div`
  display: flex !important;
  width: 100% !important;
`

export default FarmCards
