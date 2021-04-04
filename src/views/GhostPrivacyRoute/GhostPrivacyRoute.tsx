import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Spacer from '../../components/Spacer'
import RouteHelper from './components/RouteHelper'

import Border from '../../components/Border'
import Statistics from './components/Statistics'

const GhostPrivacyRoute: React.FC = () => {
  const [amount, setAmount] = useState('1')
  const [currency, setCurrency] = useState<string>('BNB')

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <StyledFarm>
        <RouteStatisticsWrapper>
          <GridSection>
            <Border
              radius={20}
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
                  <RouteHelper
                    amount={amount}
                    currency={currency}
                    setAmount={setAmount}
                    setCurrency={setCurrency}
                  />
                  {/* </GradientBorderOnly> */}
                </Border>
              </Border>
            </Border>
          </GridSection>

          <GridSection>
            <Border
              radius={20}
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
                  padding={1}
                >
                  {/* <GradientBorderOnly
                    radius={7}
                    color1={'transparent'}
                    color2={'#5b2b65'}
                    direction="to right"
                    borderWidth={7}
                  > */}
                  <Statistics amount={amount} currency={currency} />
                  {/* </GradientBorderOnly> */}
                </Border>
              </Border>
            </Border>
          </GridSection>
        </RouteStatisticsWrapper>
        <Spacer size="lg" />
        <Spacer size="lg" />
      </StyledFarm>
    </>
  )
}

const RouteStatisticsWrapper = styled.div`
  display: flex;
  @media (max-width: 768px) {
    display: grid;
  }
`
const StyledFarm = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  @media (max-width: 768px) {
    width: 100%;
  }
`

const GridSection = styled.div`
  margin: 10px;
  min-height: 450px;
  min-width: 470px;
  max-width: 470px;
  @media (max-width: 768px) {
    width: 100%;
  }
`

export default GhostPrivacyRoute
