import React from 'react'
import styled from 'styled-components'

const Card: React.FC = ({children}) => <StyledCard>{children}</StyledCard>

const StyledCard = styled.div`
  background: transparent;
  margin: 4px;
  border: 1px solid rgba(0,172,126,1);
  border-radius: 12px;
  display: flex;
  flex: 1;
  flex-direction: column;
`

export default Card
