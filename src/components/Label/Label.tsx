import React from 'react'
import styled from 'styled-components'

interface LabelProps {
  text?: string
}

const Label: React.FC<LabelProps> = ({ text }) => (
  <StyledLabel>{text}</StyledLabel>
)

const StyledLabel = styled.div`
  font-style: normal;
  font-size: 18px;
  color: rgba(0,172,126,1);
  margin-bottom: 5px
`

export default Label
