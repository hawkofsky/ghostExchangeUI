import React, { useState } from 'react'
import styled from 'styled-components'
import Button from '../../../components/Button'
import Modal, { ModalProps } from '../../../components/Modal'
import ModalActions from '../../../components/ModalActions'
import downImg from '../../../assets/img/download.png'
import copyImg from '../../../assets/img/copy.png'
import ModalTitle from '../../../components/ModalTitle'
import { toast } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css';
import './tabs.css'

toast.configure()
interface DepositModalProps extends ModalProps {
  notes: string
  onConfirm: () => void
  amounts: string
  fileName: string
}

const DepositModal: React.FC<DepositModalProps> = ({
  notes,
  onConfirm,
  onDismiss,
  amounts,
  fileName,
}) => {
  const [pendingTx, setPendingTx] = useState(false)
  const [backedUp, setBackedUp] = useState(false)

  const downloadTxtFile = (notes: string, fileName: string) => {
    const element = document.createElement('a')
    const file = new Blob([notes], { type: 'text/plain' })
    element.href = URL.createObjectURL(file)
    element.download = fileName
    document.body.appendChild(element) // Required for this to work in FireFox
    element.click()
  }

  return (
    <Modal>
      <ModalTitle text={`Your private note`} />
      <StyledPrivateDescription1>
        Please backup your note.
        <br />
        You will need it later to withdraw your deposit.
        <br />
        Treat your note as a private key ... never share it with anyone.
        <br />
        <br />
      </StyledPrivateDescription1>
      <div>
        <StyledPrivateNote>{notes}</StyledPrivateNote>
        <div style={{ position: 'relative', zIndex: 0 }}>
          <img
            onClick={async () => {
              await downloadTxtFile(notes, fileName)
            }}
            style={{
              cursor: 'pointer',
              position: 'absolute',
              width: 35,
              height: 35,
              right: 50,
              top: -22,
            }}
            src={downImg}
            alt="fireSpot"
          />
          <img
            onClick={() => {
              var textField = document.createElement('textarea')
              textField.innerText = notes
              document.body.appendChild(textField)
              textField.select()
              document.execCommand('copy')
              textField.remove()
              toast.success('Copied private note', {
                position: toast.POSITION.BOTTOM_RIGHT,
                autoClose: 2000
              })
            }}
            style={{
              cursor: 'pointer',
              position: 'absolute',
              width: 35,
              height: 35,
              right: 10,
              top: -22,
            }}
            src={copyImg}
            alt="fireSpot"
          />
        </div>
      </div>

      <StyledPrivateDescription>
        The browser will ask to save your note as a file:
      </StyledPrivateDescription>
      <StyledPrivateDescriptionTwo>{fileName}</StyledPrivateDescriptionTwo>
      <StyledBackedupButton onClick={() => setBackedUp(!backedUp)}>
        <input
          type="radio"
          checked={backedUp}
          onChange={(e) => {
            setBackedUp(e.target.checked)
          }}
        />
        <CustomLabel>&nbsp;I backed up the note</CustomLabel>
      </StyledBackedupButton>
      <br />

      <ModalActions>
        <Button
          disabled={pendingTx || !backedUp}
          text={pendingTx ? 'Depositing' : 'Deposit'}
          onClick={async () => {
            setPendingTx(true)
            await onConfirm()
            setPendingTx(false)
            onDismiss()
          }}
          border="1px solid"
        />
      </ModalActions>
    </Modal>
  )
}

const CustomLabel = styled.span`
  color: #8cc63f;
  margin-top: 7px;
`

const StyledPrivateTitle = styled.span`
  color: ${(props) => props.theme.color.green[100]};
  font-size: 18px;
  font-weight: 700;
`

const StyledPrivateDescription1 = styled.span`
  color: #00ac7e;
  font-size: 15px;
  margin-top: 4px;
  margin-bottom: 4px;
`

const StyledPrivateDescription = styled.span`
  color: #8cc63f;
  font-size: 15px;
  margin-top: 30px;
  margin-bottom: 4px;
`
const StyledPrivateDescriptionTwo = styled.span`
  color: #cccccc;
  font-size: 17px;
  margin-top: 4px;
  margin-bottom: 4px;
`

const StyledPrivateNote = styled.div`
  background-color: #1a1a1a;
  color: #00ffff;
  font-size: 16px;
  font-weight: 500;
  z-index: 1;
  position: relative;
  word-break: break-all;
  padding-top: 30px;
  padding-bottom: 30px;
  padding-left: 50px;
  padding-right: 50px;
  border-radius: 8px;
  margin-top: 10px;
  margin-bottom: 10px;
`

const StyledBackedupButton = styled.button`
  background-color: transparent;
  text-align: left;
  font-size: 16px;
  border: 0;
  display: flex;
`

export default DepositModal
