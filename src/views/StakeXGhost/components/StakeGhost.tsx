import BigNumber from 'bignumber.js'
import React, { useCallback, useState } from 'react'
import styled from 'styled-components'
import Button from '../../../components/Button'
import Card from '../../../components/Card'
import CardContent from '../../../components/CardContent'
import CardIcon from '../../../components/CardIcon'
import Label from '../../../components/Label'
import Value from '../../../components/Value'
import useModal from '../../../hooks/useModal'
import useTokenBalance from '../../../hooks/useTokenBalance'
import { getBalanceNumber } from '../../../utils/formatBalance'
import DepositModal from './DepositModal'
import { contractAddresses } from '../../../ghost/lib/constants'
import useEnter from '../../../hooks/useEnter'
import useLeave from '../../../hooks/useLeave'
import useAllowanceStaking from '../../../hooks/useAllowanceStaking'
import useApproveStaking from '../../../hooks/useApproveStaking'
import WalletProviderModal from '../../../components/WalletProviderModal'

interface StakeProps {
  unlocked: boolean
}

const StakeGhost: React.FC<StakeProps> = ({ unlocked }) => {
  const tokenName = 'GOMIX'
  const [requestedApproval, setRequestedApproval] = useState(false)
  const [onPresentWalletProviderModal] = useModal(<WalletProviderModal />)

  const allowance = useAllowanceStaking()
  const { onApprove } = useApproveStaking()

  // TODO: change
  const tokenBalance = useTokenBalance(contractAddresses.ghost[56])

  const { onEnter } = useEnter()

  const [onPresentDeposit] = useModal(
    <DepositModal
      max={tokenBalance}
      onConfirm={onEnter}
      tokenName={tokenName}
    />,
  )

  const handleApprove = useCallback(async () => {
    try {
      setRequestedApproval(true)
      const txHash = await onApprove()
      // user rejected tx or didn't go thru
      if (!txHash) {
        setRequestedApproval(false)
      }
    } catch (e) {
      console.log(e)
    }
  }, [onApprove, setRequestedApproval])

  return (
    <Card>
      <CardContent>
        <StyledCardContentInner>
          <StyledCardHeader>
            <StyledTemperCardIcon></StyledTemperCardIcon>
            <Value value={getBalanceNumber(tokenBalance)} />
            <Label text={`GOMIX Tokens Available`} />
          </StyledCardHeader>
          {unlocked ? (
            <StyledCardActions>
              {!allowance.toNumber() ? (
                <Button
                  disabled={requestedApproval}
                  onClick={handleApprove}
                  text={`Approve GOMIX`}
                  border="1px solid"
                />
              ) : (
                <>
                  <Button
                    disabled={tokenBalance.eq(new BigNumber(0))}
                    text="Convert to xGOMIX"
                    onClick={onPresentDeposit}
                    border="1px solid"
                  />
                </>
              )}
            </StyledCardActions>
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

export default StakeGhost
