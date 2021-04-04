import React from 'react'
import styled from 'styled-components'

interface RadioGroupProps {
  items: string[]
  onChange: (item: string) => void
}

const RadioGroup: React.FC<RadioGroupProps> = ({ items, onChange }) => (
  <StyledDiv>
    <StyledSelect onChange={(e) => onChange(e.target.value)}>
      {items.map((item) => (
        <option key={`option-${item}`} value={item}>
          {item}
        </option>
      ))}
    </StyledSelect>
  </StyledDiv>
)

const StyledSelect = styled.select`
  background-color: ${(props) => props.theme.color.white[400]};
  font-size: 24px;
  height: 40px;
  width: 376px;
  border: none;
  align-items: center;
  display: flex;
  justify-content: center;
`

const StyledDiv = styled.div`
  margin-bottom: 16px;
  padding: 0 12px;
  background-color: #B3B3B3;
  border-radius: 8px;
`

export default RadioGroup
