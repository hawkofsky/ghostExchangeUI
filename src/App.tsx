import React, { useCallback, useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import bsc, { UseWalletProvider } from '@binance-chain/bsc-use-wallet'
// import { UseWalletProvider } from '@binance-chain/bsc-use-wallet'
import DisclaimerModal from './components/DisclaimerModal'
import MobileMenu from './components/MobileMenu'
import TopBar from './components/TopBar'
import FarmsProvider from './contexts/Farms'
import ModalsProvider from './contexts/Modals'
import TransactionProvider from './contexts/Transactions'
import GhostProvider from './contexts/GhostProvider'
import useModal from './hooks/useModal'
import theme from './theme'
import Farms from './views/Farms'
import Home from './views/Home'
import Staking from './views/Staking'
import Swap from './views/Swap'
import GhostRoute from './views/GhostRoute'
import { GlobalFonts } from './assets/fonts/globalfonts'

const App: React.FC = () => {
  const [mobileMenu, setMobileMenu] = useState(false)

  const handleDismissMobileMenu = useCallback(() => {
    setMobileMenu(false)
  }, [setMobileMenu])

  const handlePresentMobileMenu = useCallback(() => {
    setMobileMenu(true)
  }, [setMobileMenu])

  return (
    <Providers>
      <GlobalFonts />
      <Router>
        <TopBar onPresentMobileMenu={handlePresentMobileMenu} />
        <MobileMenu onDismiss={handleDismissMobileMenu} visible={mobileMenu} />
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/farms">
            <Farms />
          </Route>
          <Route path="/staking">
            <Staking />
          </Route>
          <Route path="/swap">
            <Swap />
          </Route>
          <Route path="/route">
            <GhostRoute />
          </Route>
        </Switch>
      </Router>
      <Disclaimer />
    </Providers>
  )
}

const Providers: React.FC = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <UseWalletProvider
        chainId={56}
        connectors={{
          bsc,
          walletconnect: {
            rpcUrl: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
          },
        }}
      >
        <GhostProvider>
          <TransactionProvider>
            <FarmsProvider>
              <ModalsProvider>{children}</ModalsProvider>
            </FarmsProvider>
          </TransactionProvider>
        </GhostProvider>
      </UseWalletProvider>
    </ThemeProvider>
  )
}

const Disclaimer: React.FC = () => {
  const markSeen = useCallback(() => {
    localStorage.setItem('disclaimer', 'seen')
  }, [])

  const [onPresentDisclaimerModal] = useModal(
    <DisclaimerModal onConfirm={markSeen} />,
  )

  // useEffect(() => {
  //   const seenDisclaimer = true //localStorage.getItem('disclaimer')
  //   if (!seenDisclaimer) {
  //     onPresentDisclaimerModal()
  //   }
  // }, [])

  return <div />
}

export default App
