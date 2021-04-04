import React from 'react'
import logo from '../../assets/img/logo.png'
import Button from '../../components/Button'
import Container from '../../components/Container'
import Page from '../../components/Page'
import PageHeader from '../../components/PageHeader'
import Spacer from '../../components/Spacer'
import Balances from './components/Balances'
import Border from '../../components/Border'

const Home: React.FC = () => {
  return (
    <Page>
      <PageHeader
        icon={<img src={logo} height={150} alt="logo" />}
        title="The spirits are ready!"
        subtitle="Stake GOMIX/PancakeSwap LP tokens to channel the spirits!"
      />

      <Container size={'lg'}>
        <Balances />
      </Container>

      <Spacer size="lg" />
      <Spacer size="lg" />
      <div style={{ margin: '0 auto' }}>
        <Border
          radius={16}
          color={'rgba(0,172,126,1)'}
          borderWidth={1}
          padding={0}
          shadow={'none'}
        >
          <Border
            radius={12}
            margin={2}
            color={'#000'}
            borderWidth={1}
            padding={0}
            shadow={'none'}
          >
            <Button text="ENTER THE HOLLOW" to="/farms" variant="secondary" />
          </Border>
        </Border>
      </div>
    </Page>
  )
}

export default Home
