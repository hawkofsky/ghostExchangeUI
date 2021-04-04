import React, { useState } from 'react'
import styled from 'styled-components'
import Button from '../../../components/Button'
import Card from '../../../components/Card'
import CardContent from '../../../components/CardContent'
import CardIcon from '../../../components/CardIcon'
import Label from '../../../components/Label'
import Value from '../../../components/Value'
import { getBalanceNumber } from '../../../utils/formatBalance'
import useTokenBalance from '../../../hooks/useTokenBalance'
import { Contract } from 'web3-eth-contract'
import useModal from '../../../hooks/useModal'
import WithdrawModal from './WithdrawModal'
import useLeave from '../../../hooks/useLeave'
import WalletProviderModal from '../../../components/WalletProviderModal'

interface HarvestProps {
  lpContract: Contract
  unlocked: boolean
}

const UnstakeXGhost: React.FC<HarvestProps> = ({ lpContract, unlocked }) => {
  const xGhostBalance = useTokenBalance(lpContract.options.address)
  const [pendingTx, setPendingTx] = useState(false)
  const [onPresentWalletProviderModal] = useModal(<WalletProviderModal />)

  const { onLeave } = useLeave()

  const tokenName = 'xGOMIX'

  const [onPresentLeave] = useModal(
    <WithdrawModal
      max={xGhostBalance}
      onConfirm={onLeave}
      tokenName={tokenName}
    />,
  )

  return (
    <Card>
      <CardContent>
        <StyledCardContentInner>
          <StyledCardHeader>
            <StyledTemperCardIcon></StyledTemperCardIcon>
            <Value value={getBalanceNumber(xGhostBalance)} />
            <Label text="xGOMIX Available" />
          </StyledCardHeader>
          {unlocked ? (
            <>
              <StyledCardActions>
                <Button
                  disabled={!xGhostBalance.toNumber() || pendingTx}
                  text={pendingTx ? 'Converting to GOMIX' : 'Convert to GOMIX'}
                  onClick={async () => {
                    setPendingTx(true)
                    await onPresentLeave()
                    setPendingTx(false)
                  }}
                  border="1px solid"
                />
              </StyledCardActions>
            </>
          ) : (
            <>
              <StyledCardActions>
                <Button
                  text="Connect Wallet"
                  onClick={onPresentWalletProviderModal}
                  border="1px solid"
                />
              </StyledCardActions>
            </>
          )}
        </StyledCardContentInner>
      </CardContent>
    </Card>
  )
}

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

const StyledCardContentInner = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
`

const StyledTemperCardIcon = styled.div`
  width: 80px;
  height: 80px;
  margin: 0 auto 16px;
`

export default UnstakeXGhost
