import React from 'react'
import styled from 'styled-components'
import Button from '../../Button'
import Card from '../../Card'
import CardContent from '../../CardContent'
import CardIcon from '../../CardIcon'
import CardTitle from '../../CardTitle'
import Spacer from '../../Spacer'

interface WalletCardProps {
  icon: React.ReactNode
  onConnect: () => void
  title: string
}

const WalletCard: React.FC<WalletCardProps> = ({ icon, onConnect, title }) => (
  <Card>
    <CardContent>
      <CardIcon>{icon}</CardIcon>
      <StyledCardTitle>{title}</StyledCardTitle>
      <Spacer />
      <Button onClick={onConnect} text="Connect" />
    </CardContent>
  </Card>
)

const StyledCardTitle = styled.div`
  display: flex;
  align-self: center;
  color: ${(props) => props.theme.color.white[100]};
  font-size: 18px;
  font-weight: 700;
  padding: 24px 10px;
  width: 150px;
  justify-content: center;
`

export default WalletCard
