import React, { useState } from 'react'
import styled from 'styled-components'
import DepositHelper from './DepositHelper'
import './tabs.css'
import WithdrawHelper from './WithdrawHelper'

interface RouteHelperProps {
  amount: string
  currency: string
  setAmount: React.Dispatch<React.SetStateAction<string>>
  setCurrency: React.Dispatch<React.SetStateAction<string>>
}

const RouteHelper: React.FC<RouteHelperProps> = ({
  amount,
  currency,
  setAmount,
  setCurrency,
}) => {
  const [tab, setTab] = useState('deposit')
  const handleChangeTabs = (value: string) => {
    setTab(value)
  }

  return (
    <StyledCard>
      <StyledCardHeader>
        <ul className="nav nav-tabs">
          <li
            style={{ height: 70 }}
            className={`nav-item nav-item-one ${
              tab === 'deposit' ? 'active' : 'inactive'
            }`}
            onClick={() => handleChangeTabs('deposit')}
          >
            <a
              style={{
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              className={`nav-link button-one ${
                tab === 'deposit' ? 'active' : 'inactive'
              }`}
              href="#"
            >
              Deposit
            </a>
          </li>
          <li
            style={{ height: 70 }}
            className={`nav-item nav-item-two ${
              tab === 'withdraw' ? 'active' : 'inactive'
            }`}
            onClick={() => handleChangeTabs('withdraw')}
          >
            <a
              style={{
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              className={`nav-link button-two ${
                tab === 'withdraw' ? 'active' : 'inactive'
              }`}
              href="#"
            >
              Withdraw
            </a>
          </li>
        </ul>
        <StyledBorderedDiv>
          {tab === 'deposit' ? (
            <DepositHelper
              amount={amount}
              currency={currency}
              setAmount={setAmount}
              setCurrency={setCurrency}
            />
          ) : tab === 'withdraw' ? (
            <WithdrawHelper />
          ) : (
            ''
          )}
        </StyledBorderedDiv>
      </StyledCardHeader>
    </StyledCard>
  )
}

const StyledBorderedDiv = styled.div`
  border-style: solid;
  border-width: 1px;
  border-top-width: 0;
  border-bottom-left-radius: 14px;
  border-bottom-right-radius: 14px;
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

const StyledCardHeader = styled.div`
  align-items: center;
`

export default RouteHelper
