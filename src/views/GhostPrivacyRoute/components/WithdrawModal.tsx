import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Button from '../../../components/Button'
import Modal, { ModalProps } from '../../../components/Modal'
import ModalTitle from '../../../components/ModalTitle'
import ModalActions from '../../../components/ModalActions'
import './tabs.css'

interface WithdrawModalProps extends ModalProps {
  successOrFail: boolean,
  message: string
}

const WithdrawModal: React.FC<WithdrawModalProps> = ({
  successOrFail,
  message,
  onDismiss,
}) => {
  const [pendingTx, setPendingTx] = useState(true)
  const [error, setError] = useState(undefined)
  const [tx, setTx] = useState(undefined)

  useEffect(() => { 
    if (successOrFail) {
      setTx(message);
    } else {
      setError(message)
    }
  }, [])

  return (
    <Modal>
      <ModalTitle text="Withdraw funds" />
      {error && (
        <>
          <StyledDescription>Withdraw has been failed.</StyledDescription>
          <StyledError>{error}</StyledError>
        </>
      )}
      {!error && (
        <>
          <StyledDescription>
            Your funds have been withdrawn successfully
          </StyledDescription>
        </>
      )}
      <ModalActions>
        <Button
          text="Close"
          onClick={onDismiss}
          border="1px solid"
        />
      </ModalActions>
    </Modal>
  )
}

const ModalCustomTitle = styled.span`
  align-items: center;
  color: #999999;
  display: flex;
  font-size: 18px;
  font-weight: 700;
  height: ${(props) => props.theme.topBarSize}px;
  justify-content: center;
`
const StyledDescription = styled.span`
  color: #8cc63f;
  font-size: 15px;
  margin-top: 4px;
  margin-bottom: 4px;
`
const StyledError = styled.span`
  color: red;
  font-size: 17px;
  margin-top: 4px;
  margin-bottom: 4px;
`

const StyledSuccess = styled.div`
  font-size: 17px;
  margin-top: 4px;
  margin-bottom: 4px;
  text-align: center;
`

const StyledPrivateNote = styled.div`
  background-color: #1a1a1a;
  color: #00ffff;
  font-size: 16px;
  font-weight: 500;
  word-break: break-all;
  padding: 5px;
  border-radius: 8px;
  margin-top: 10px;
  margin-bottom: 10px;
  padding: 10px;
`

const StyledBackedupButton = styled.button`
  background-color: transparent;
  text-align: left;
  font-size: 16px;
  border: 0;
  display: flex;
`

export default WithdrawModal
