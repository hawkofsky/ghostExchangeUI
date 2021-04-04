import React from 'react'
import styled from 'styled-components'

interface TokenPairIconProps {
  token1: string
  token2: string
}

const TokenPairIcon: React.FC<TokenPairIconProps> = ({ token1, token2 }) => (
  <StyledDiv>
    <StyledCardIcon
      src={require(`../../assets/img/lpLogos/LP-${token1.toUpperCase()}-${token2.toUpperCase()}.png`)}
    />
  </StyledDiv>
)

const StyledDiv = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  flex-direction: row;
`

const StyledCardIcon = styled.img`
  font-size: 36px;
  height: 80px;
  width: 80px;
  border-radius: 40px;
  align-items: center;
  display: flex;
  justify-content: center;
  margin: 0 10px ${(props) => props.theme.spacing[3]}px;
`

export default TokenPairIcon
