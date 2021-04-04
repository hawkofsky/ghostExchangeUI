import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Button from '../../../components/Button'
import CardContent from '../../../components/CardContent'
import Label from '../../../components/Label'
import useWithdrawFromRoute from '../../../hooks/useWithdrawFromRoute'
import { supportedRoutes } from '../../../ghost/lib/constants'
import Input from '../../../components/Input'
import WithdrawModal from './WithdrawModal'
import useModal from '../../../hooks/useModal'
import {
  validateNotes,
  validateRecipient,
  generateProofAndArgs,
} from '../../../ghost/utils'
import ghostloader6 from '../../../assets/img/ghostloader6.mp4'

const WithdrawHelper: React.FC = ({}) => {
  const [pendingTx, setPendingTx] = useState(false)
  const [validating, setValidating] = useState(false)
  const [generatingProof, setGeneratingProof] = useState(false)
  const [successOrFail, setSuccessOrFail] = useState(false)
  const [message, setMessage] = useState('')
  const [notes, setNotes] = useState('')
  const [recipient, setRecipient] = useState('')
  const { onWithdrawFromRoute } = useWithdrawFromRoute()
  const routes: { [key: string]: any } = supportedRoutes
  const [notesError, setNotesError] = useState(null)
  const [recipientError, setRecipientError] = useState(null)
  const handleChangeNotes = (event: React.FormEvent<HTMLInputElement>) => {
    setNotes(event.currentTarget.value)
  }

  const handleChangeRecipient = (event: React.FormEvent<HTMLInputElement>) => {
    setRecipient(event.currentTarget.value)
  }

  const [onPresentWithdraw] = useModal(
    <WithdrawModal successOrFail={successOrFail} message={message} />,
  )

  useEffect(() => {
    if (notes && notes.length > 0) {
      setValidating(true)
      validateNotes(routes, notes, 56).then((res: any) => {
        console.log(res)
        if (!res.valid) {
          setValidating(false)
          setNotesError(res.message)
        } else {
          setValidating(false)
          setNotesError(null)
        }
      })
    }
  }, [notes])

  useEffect(() => {
    if (recipient && recipient.length > 0) {
      validateRecipient(routes, recipient).then((res: any) => {
        console.log(res)
        if (!res.valid) {
          setRecipientError(res.message)
        } else {
          setRecipientError(null)
        }
      })
    }
  }, [recipient])

  const handleWithdraw = async () => {
    setGeneratingProof(true)
    const res = await generateProofAndArgs(routes, notes, 56, recipient)
    setGeneratingProof(false)
    if (res.valid) {
      await onWithdrawFromRoute(res.currency, res.amount, res.proof, res.args)
      setSuccessOrFail(true)
      onPresentWithdraw()
    } else {
      // TODO; show error alert
      setSuccessOrFail(false)
      setMessage(res.message)
      onPresentWithdraw()
    }
  }

  return (
    <CardContent>
      <StyledCardContentInner>
        <StyledCardHeader>
          <StyledDiv>
            <Label text="Notes" />
            <Input
              onChange={handleChangeNotes}
              value={notes}
              placeholder="Input private notes here"
              disabled={pendingTx || validating ? true : false}
            />
            {notesError && <StyledError>{notesError}</StyledError>}
          </StyledDiv>
        </StyledCardHeader>

        <br />
        <br />
        <br />

        <StyledCardHeader>
          <StyledDiv>
            <Label text="Recipients Address" />
            <Input
              onChange={handleChangeRecipient}
              value={recipient}
              placeholder="Input recipient address here"
              disabled={pendingTx || validating ? true : false}
            />
            {recipientError && <StyledError>{recipientError}</StyledError>}
          </StyledDiv>
        </StyledCardHeader>
        <br />
        <br />
        <StyledCardActions>
          <Button
            text={
              validating ? 'Validating' : pendingTx ? 'Withdrawing' : 'Withdraw'
            }
            onClick={async () => {
              if (notes && recipient) {
                setPendingTx(true)
                await handleWithdraw()
                setPendingTx(false)
              }
            }}
            disabled={
              pendingTx || validating || notesError || recipientError
                ? true
                : false
            }
            border="1px solid"
          />
        </StyledCardActions>
        {generatingProof && (
          <StyledVideoDiv>
            <video autoPlay={true} loop={true} width="140" height="120">
              <source src={ghostloader6} type="video/mp4" />
            </video>
          </StyledVideoDiv>
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

const StyledDiv = styled.div`
  position: relative;
  align-items: start;
  display: flex;
  justify-content: center;
  flex-direction: column;
`

const StyledVideoDiv = styled.div`
  position: absolute;
  top: 32%;
  align-items: start;
  display: flex;
  justify-content: center;
  flex-direction: column;
`

const StyledError = styled.span`
  position: absolute;
  top 70px;
  color: red;
  font-size: 14px;
  margin-top: 4px;
  margin-bottom: 4px;
`

export default WithdrawHelper
