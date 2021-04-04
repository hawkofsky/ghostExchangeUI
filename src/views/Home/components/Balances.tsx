import BigNumber from 'bignumber.js'
import React, { useContext, useEffect, useState } from 'react'
import CountUp from 'react-countup'
import styled, { ThemeContext } from 'styled-components'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import Card from '../../../components/Card'
import CardContent from '../../../components/CardContent'
import Label from '../../../components/Label'
import Spacer from '../../../components/Spacer'
import Value from '../../../components/Value'
import useAllEarnings from '../../../hooks/useAllEarnings'
import useAllStakedValue from '../../../hooks/useAllStakedValue'
import useFarms from '../../../hooks/useFarms'
import useTokenBalance from '../../../hooks/useTokenBalance'
import useGhost from '../../../hooks/useGhost'
import { getGhostAddress, getGhostSupply } from '../../../ghost/utils'
import { getBalanceNumber } from '../../../utils/formatBalance'
import Border from '../../../components/Border'
import GradientBorderOnly from '../../../components/GradientBorderOnly'

const PendingRewards: React.FC = () => {
  const [start, setStart] = useState(0)
  const [end, setEnd] = useState(0)
  const [scale, setScale] = useState(1)

  const allEarnings = useAllEarnings()
  let sumEarning = 0
  for (let earning of allEarnings) {
    sumEarning += new BigNumber(earning)
      .div(new BigNumber(10).pow(18))
      .toNumber()
  }

  const [farms] = useFarms()
  const allStakedValue = useAllStakedValue()

  if (allStakedValue && allStakedValue.length) {
    const sumWbnb = farms.reduce(
      (c, { id }, i) => c + (allStakedValue[i].totalWbnbValue.toNumber() || 0),
      0,
    )
  }

  useEffect(() => {
    setStart(end)
    setEnd(sumEarning)
  }, [sumEarning])

  return (
    <span
      style={{
        transform: `scale(${scale})`,
        transformOrigin: 'right bottom',
        transition: 'transform 0.5s',
        display: 'inline-block',
        fontStyle: 'normal',
        fontSize: '20px',
        color: 'rgba(0,172,126,1)',
      }}
    >
      <CountUp
        start={start}
        end={end}
        decimals={end < 0 ? 4 : end > 1e5 ? 0 : 3}
        duration={1}
        onStart={() => {
          setScale(1.25)
          setTimeout(() => setScale(1), 600)
        }}
        separator=","
      />
    </span>
  )
}

const Balances: React.FC = () => {
  const [totalSupply, setTotalSupply] = useState<BigNumber>()
  const ghost = useGhost()
  const ghostBalance = useTokenBalance(getGhostAddress(ghost))
  const { account, ethereum }: { account: any; ethereum: any } = useWallet()
  const { color } = useContext(ThemeContext)

  useEffect(() => {
    async function fetchTotalSupply() {
      const supply = await getGhostSupply(ghost)
      setTotalSupply(supply)
    }

    if (ghost) {
      fetchTotalSupply()
    }
  }, [ghost, setTotalSupply])

  return (
    <StyledWrapper>
      <div style={{ minWidth: '550px', margin: '10px' }}>
        <Border
          radius={14}
          color={'rgba(0,172,126,1)'}
          borderWidth={1}
          padding={0}
          shadow={'0px 0px 42px -4px rgb(0 172 126)'}
        >
          <Border
            radius={14}
            color={'rgb(49 97 84)'}
            borderWidth={3}
            padding={0}
          >
            <Border
              radius={14}
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
              <Card>
                <CardContent>
                  <StyledBalances>
                    <StyledBalance>
                      <div style={{ flex: 1 }}>
                        <Label text="YOUR GOMIX BALANCE" />
                        <Value
                          value={
                            !!account
                              ? getBalanceNumber(ghostBalance)
                              : 'LOCKED'
                          }
                        />
                      </div>
                    </StyledBalance>
                  </StyledBalances>
                </CardContent>
                <Footnote>
                  <Label text="PENDING HARVEST" />
                  <FootnoteValue>
                    <PendingRewards />{' '}
                    <span style={{ color: 'rgba(0,172,126,1)' }}>GOMIX</span>
                  </FootnoteValue>
                </Footnote>
              </Card>
              {/* </GradientBorderOnly> */}
            </Border>
          </Border>
        </Border>
      </div>

      <Spacer />
      <div style={{ minWidth: '550px', margin: '10px' }}>
        <Border
          radius={14}
          color={'rgba(0,172,126,1)'}
          borderWidth={1}
          padding={0}
          shadow={'0px 0px 42px -4px rgb(0 172 126)'}
        >
          <Border
            radius={14}
            color={'rgb(49 97 84)'}
            borderWidth={3}
            padding={0}
          >
            <Border
              radius={14}
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
              <Card>
                <CardContent>
                  <div style={{ flex: 1 }}>
                    <Label text="CIRCULATING GOMIX SUPPLY" />
                    <Value
                      value={
                        totalSupply ? getBalanceNumber(totalSupply) : 'LOCKED'
                      }
                    />
                  </div>
                </CardContent>
                <Footnote>
                  <Label text="NEW REWARDS PER BLOCK" />
                  <FootnoteValue>
                    <span style={{ color: 'rgba(0,172,126,1)' }}>
                      100 GOMIX
                    </span>
                  </FootnoteValue>
                </Footnote>
              </Card>
              {/* </GradientBorderOnly> */}
            </Border>
          </Border>
        </Border>
      </div>
    </StyledWrapper>
  )
}

const Footnote = styled.div`
  font-size: 14px;
  padding: 8px 0;
  margin: 0 15px;
  color: ${(props) => props.theme.color.black[100]};
  border-top: solid 1px ${(props) => 'rgba(0,172,126,1)'};
  display: flex;
  justify-content: space-between;
  font-style: normal;
  font-size: 20px;
  color: rgba(0, 172, 126, 1);
`
const FootnoteValue = styled.div`
  float: right;
`

const StyledWrapper = styled.div`
  align-items: center;
  display: flex;
  @media (max-width: 768px) {
    width: 100%;
    flex-flow: column nowrap;
    align-items: stretch;
  }
`

const StyledBalances = styled.div`
  display: flex;
`

const StyledBalance = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
`

export default Balances
