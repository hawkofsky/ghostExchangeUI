// @ts-ignore
import React, { useState, useEffect, useContext } from 'react'
import styled from 'styled-components'
import CardContent from '../../../components/CardContent'
import Label from '../../../components/Label'
import Border from '../../../components/Border'
import { Context } from '../../../contexts/Transactions'
import { getStatsData } from '../../../ghost/utils'

interface StatisticsProps {
  amount: string
  currency: string
}

const Statistics: React.FC<StatisticsProps> = ({ amount, currency }) => {
  const { statsData } = useContext(Context)
  const [latestDept, setLatestDept] = useState([])
  const [topDept, setTopDept] = useState({
    currency: '',
    amount: 0,
    depositId: 0,
  })

  useEffect(() => {
    getStatsData(currency, amount).then((data) => {
      setLatestDept(data)
    })
  }, [amount, currency])
  // useEffect(() => {
  //   const data = statsData
  //   if (latestDept != []) {
  //     setLatestDept([...data])
  //   }
  // }, [statsData])

  // useEffect(() => {
  //   setTopDept({
  //     currency: latestDept[0] ? latestDept[0].currency : '',
  //     amount: latestDept[0] ? latestDept[0].amount : '',
  //     depositId: latestDept[0] ? latestDept[0].depositId : '',
  //   })
  // }, [latestDept])
  const getTimeString = (timestamp: number) => {
    const today = Math.floor(Date.now() / 1000)
    if (today - timestamp < 2) {
      return 'a second ago'
    }
    if (today - timestamp < 60) {
      return `${today - timestamp} seconds ago`
    }
    if (today - timestamp < 120) {
      return 'a minute ago'
    }
    if (today - timestamp < 3600) {
      return `${Math.floor((today - timestamp) / 60)} minutes ago`
    }
    if (today - timestamp < 7200) {
      return 'an hour ago'
    }
    if (today - timestamp < 3600 * 24) {
      return `${Math.floor((today - timestamp) / 3600)} hours ago`
    }
    if (today - timestamp < 3600 * 48) {
      return 'a day ago'
    }
    return `${Math.floor((today - timestamp) / 3600 / 24)} days ago`
  }

  return (
    <StyledCard>
      <StyledBorderedDiv>
        <StyledCardContentInner>
          <LabelHeader>STATISTICS</LabelHeader>
        </StyledCardContentInner>
        <br />
        <Label text={`FOR AMOUNT: ${amount} ${currency.toUpperCase()}`} />
        {latestDept && (
          <Label
            text={`${
              latestDept.length > 0 ? latestDept[0].depositId : 0
            } EQUAL USER DEPOSITS`}
          />
        )}

        <StyledCardHeader>
          <br />
          <Label text={'LATEST DEPOSITS'} />
          <StatisticsTable>
            <Border
              radius={10}
              color={'rgb(49 97 84)'}
              borderWidth={3}
              padding={10}
            >
              <div>
                {latestDept.map((data, i) => (
                  <SectionRow key={i}>
                    <ColorSpanItem>{data.depositId}.</ColorSpanItem>
                    &nbsp;&nbsp;&nbsp;
                    <NormalSpanItem>
                      {getTimeString(data.timestamp)}
                    </NormalSpanItem>
                  </SectionRow>
                ))}
              </div>
            </Border>
          </StatisticsTable>
        </StyledCardHeader>
      </StyledBorderedDiv>
    </StyledCard>
  )
}

const NormalSpanItem = styled.div`
  color: #b3b3b3;
`
const ColorSpanItem = styled.div`
  color: #8cc63f;
  font-weight: bold;
`

const SectionRow = styled.div`
  display: inline-flex;
  padding-left: 10px;
  padding-right: 10px;
  justify-content: start;
  margin-top: 3px;
  margin-bottom: 3px;
  width: 50%;
`
const StatisticsTable = styled.div`
  width: 100%;
`

const StyledCardHeader = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`
const StyledCardActions = styled.div`
  display: flex;
  justify-content: center;
  margin-top: ${(props) => props.theme.spacing[6]}px;
  width: 100%;
`
const LabelHeader = styled.div`
  font-style: normal;
  font-size: 18px;
  color: #8cc63f;
  margin-bottom: 5px;
`

const StyledCardContentInner = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
`

const StyledDiv = styled.div`
  align-items: start;
  display: flex;
  justify-content: center;
  flex-direction: column;
`

const StyledBorderedDiv = styled.div`
  border-style: solid;
  border-width: 1px;
  padding: 15px;
  margin: 4px;
  border-radius: 14px;
  border-color: rgba(0, 172, 126, 1);
`

const StyledCard = styled.div`
  background: transparent;
  border-radius: 12px;
  margin: 4px;
  display: flex;
  flex: 1;
  flex-direction: column;
`

export default Statistics
