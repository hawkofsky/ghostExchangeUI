import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useWallet } from '@binance-chain/bsc-use-wallet'

import metamaskLogo from '../../assets/img/metamask-fox.svg'
import binanceDexLogo from '../../assets/img/binancedex.svg'
import walletConnectLogo from '../../assets/img/wallet-connect.svg'

import Button from '../Button'
import Modal, { ModalProps } from '../Modal'
import ModalActions from '../ModalActions'
import ModalTitle from '../ModalTitle'

import WalletCard from './components/WalletCard'

const WalletProviderModal: React.FC<ModalProps> = ({ onDismiss }) => {
  const { account, connect } = useWallet()

  useEffect(() => {
    if (account) {
      onDismiss()
    }
  }, [account, onDismiss])

  return (
    <Modal>
      <ModalTitle text="Select a wallet provider." />
      <StyledWalletsWrapper>
        <StyledWalletCard>
          <WalletCard
            icon={
              <img src={metamaskLogo} style={{ height: 32 }} alt="metamask" />
            }
            onConnect={() => connect('injected')}
            title="Metamask"
          />
        </StyledWalletCard>
        <StyledWalletCard>
          <WalletCard
            icon={
              <img
                src={binanceDexLogo}
                style={{ height: 40 }}
                alt="binancechain"
              />
            }
            onConnect={() => connect('bsc')}
            title="Binance Chain"
          />
        </StyledWalletCard>
        <StyledWalletCard>
          <WalletCard
            icon={
              <img
                src={walletConnectLogo}
                style={{ height: 24 }}
                alt="wallet connect"
              />
            }
            onConnect={() => connect('walletconnect')}
            title="WalletConnect"
          />
        </StyledWalletCard>
      </StyledWalletsWrapper>
      <ModalActions>
        <Button text="Cancel" variant="secondary" onClick={onDismiss} />
      </ModalActions>
    </Modal>
  )
}

const StyledWalletsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}px) {
    flex-direction: column;
    flex-wrap: none;
  }
`

const StyledWalletCard = styled.div`
  width: 30%;
  margin: 10px;
`

export default WalletProviderModal
