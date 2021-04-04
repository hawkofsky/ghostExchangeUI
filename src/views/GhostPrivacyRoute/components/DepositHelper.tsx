import React, {
  useEffect,
  useState,
  useMemo,
  useCallback,
  useContext,
} from 'react'
import styled from 'styled-components'
import Button from '../../../components/Button'
import CardContent from '../../../components/CardContent'
import Dropdown from '../../../components/Dropdown'
import RadioGroup from '../../../components/RadioGroup'
import Label from '../../../components/Label'
import useModal from '../../../hooks/useModal'
import DepositModal from './DepositModal'
import { generatePrivateNote } from '../../../ghost/utils'
import useDepositToRoute from '../../../hooks/useDepositToRoute'
import { supportedRoutes } from '../../../ghost/lib/constants'
import useTokenBalance from '../../../hooks/useTokenBalance'
import useAllowanceRoutes from '../../../hooks/useAllowanceRoutes'
import { BigNumber, utils } from 'ethers'
import { getContract } from '../../../utils/erc20'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { provider } from 'web3-core'
import useApproveRoutes from '../../../hooks/useApproveRoutes'
import { Context } from '../../../contexts/Transactions'

interface DepositHelperProps {
  amount: string
  currency: string
  setAmount: React.Dispatch<React.SetStateAction<string>>
  setCurrency: React.Dispatch<React.SetStateAction<string>>
}

const DepositHelper: React.FC<DepositHelperProps> = ({
  amount,
  currency,
  setAmount,
  setCurrency,
}) => {
  const { onSetStatsData } = useContext(Context)
  const [pendingTx, setPendingTx] = useState(false)
  const { ethereum } = useWallet()

  const { onDepositToRoute } = useDepositToRoute()

  const [requestedApproval, setRequestedApproval] = useState(false)
  // const [amount, setAmount] = useState('1')
  // const [currency, setCurrency] = useState<string>('BNB')
  const [deposit, setDeposit] = useState(null)
  const [insufficient, setInsufficient] = useState(false)
  const [requireApprove, setRequireApprove] = useState(false)
  const routes: { [key: string]: any } = supportedRoutes
  const tokenBalance = useTokenBalance(routes[currency]['addresses'][56])
  const erc20Contract = useMemo(() => {
    return getContract(ethereum as provider, routes[currency]['addresses'][56])
  }, [ethereum, currency])
  const { onApprove } = useApproveRoutes(
    erc20Contract,
    routes[currency]['routes'][amount],
    56,
  )
  const tokenAllowance = useAllowanceRoutes(
    erc20Contract,
    routes[currency]['routes'][amount],
    56,
  )

  const buttonTitle = () => {
    if (insufficient) {
      return 'Insufficient Balance'
    }
    if (requireApprove && pendingTx) {
      return 'Approving'
    } else if (requireApprove) {
      return 'Approve'
    }
    if (pendingTx) {
      return 'Depositing'
    }
    return 'Deposit'
  }

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

  useEffect(() => {
    const decimals = routes[currency].decimals
    const amountBN = utils.parseUnits(amount.toString(), decimals)
    const balanceBN = BigNumber.from(tokenBalance.toString())
    const allowanceBN = BigNumber.from(tokenAllowance.toString())
    if (balanceBN.lt(amountBN)) {
      setInsufficient(true)
    } else {
      setInsufficient(false)
    }
    if (allowanceBN.lt(amountBN)) {
      setRequireApprove(true)
    } else {
      setRequireApprove(false)
    }
  }, [tokenBalance, amount, tokenAllowance])

  const downloadTxtFile = (notes: string, fileName: string) => {
    const element = document.createElement('a')
    const file = new Blob([notes], { type: 'text/plain' })
    element.href = URL.createObjectURL(file)
    element.download = fileName
    document.body.appendChild(element) // Required for this to work in FireFox
    element.click()
  }

  useEffect(() => {
    const depositInfo = generatePrivateNote(currency, amount, 56)
    setDeposit(depositInfo)
    onSetStatsData(currency, amount)
  }, [currency, amount])

  useEffect(() => {
    if (deposit == null) {
      const depositInfo = generatePrivateNote(currency, amount, 56)
      setDeposit(depositInfo)
    }
  }, [deposit])

  useEffect(() => {
    if (routes[currency]) {
      setAmount(Object.keys(routes[currency].routes)[0])
    }
  }, [currency])

  const [onPresentDeposit] = useModal(
    <DepositModal
      notes={deposit ? deposit.notes : ''}
      onConfirm={async () => {
        await onDepositToRoute(deposit.deposit, currency, amount)
        setDeposit(null)
      }}
      fileName={deposit ? deposit.fileName : ''}
      amounts={`${amount} ${currency}`}
    />,
  )

  return (
    <CardContent>
      <StyledCardContentInner>
        <StyledCardHeader>
          <StyledDiv>
            <Label text="Select token" />
            <Dropdown
              items={Object.keys(supportedRoutes)}
              onChange={setCurrency}
            />
            {routes[currency] && (
              <>
                <Label text="Amount" />
                <RadioGroup
                  name="amounts radio"
                  items={Object.keys(routes[currency].routes).map((amount) => {
                    return { value: amount, label: `${amount} ${currency}` }
                  })}
                  selected={amount}
                  onChange={setAmount}
                />
              </>
            )}
          </StyledDiv>
        </StyledCardHeader>
        <br />
        <br />
        {requireApprove && (
          <StyledCardActions>
            <Button
              text={buttonTitle()}
              onClick={handleApprove}
              disabled={requestedApproval}
              border="1px solid"
            />
          </StyledCardActions>
        )}
        {!requireApprove && (
          <StyledCardActions>
            <Button
              text={buttonTitle()}
              onClick={async () => {
                if (deposit) {
                  setPendingTx(true)
                  await downloadTxtFile(deposit.notes, deposit.fileName)
                  await onPresentDeposit()
                  setPendingTx(false)
                }
              }}
              disabled={insufficient || pendingTx}
              border="1px solid"
            />
          </StyledCardActions>
        )}
        {/* <StyledLabel>binance contract address scan</StyledLabel> */}
      </StyledCardContentInner>
    </CardContent>
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

const StyledLabel = styled.label`
  color: #00ac7e;
  font-weight: normal;
  position: absolute;
  bottom: 5px;
`

const StyledDiv = styled.div`
  align-items: start;
  display: flex;
  justify-content: center;
  flex-direction: column;
`

export default DepositHelper
