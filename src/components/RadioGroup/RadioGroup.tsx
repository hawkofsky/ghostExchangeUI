import React from 'react'
import styled from 'styled-components'

interface RadioItem {
  value: number | string
  label: string
}

interface RadioGroupProps {
  name: string
  items: RadioItem[]
  selected: string
  onChange: (index: string) => void
}

const RadioGroup: React.FC<RadioGroupProps> = ({
  name,
  items,
  selected,
  onChange,
}) => (
  <StyledDiv>
    {items.map((item, index) => (
      <StyledItem key={`item-${index}`}>
        <input
          type="radio"
          name={name}
          checked={item.value === selected}
          onChange={(e) => {
            if (e.target.checked) {
              onChange(item.value.toString())
            }
          }}
        />
        <label className={'label'}>{item.label}</label>
      </StyledItem>
    ))}
  </StyledDiv>
)

const StyledDiv = styled.div`
  font-size: 24px;
  height: 40px;
  width: 400px;
  border-radius: 8px;
  align-items: center;
  display: flex;
  justify-content: center;
  margin-top: 16px;
`

const StyledItem = styled.div`
  font-size: 15px;
  color: #00ac7e;
  margin-top: 8px;
  align-items: center;
  width: 100px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin: 20px 0;
`

export default RadioGroup
