import React from 'react'
import styled from 'styled-components'

export interface InputProps {
  endAdornment?: React.ReactNode
  onChange: (e: React.FormEvent<HTMLInputElement>) => void
  placeholder?: string
  startAdornment?: React.ReactNode
  value: string
  disabled?: boolean
}

const Input: React.FC<InputProps> = ({
  endAdornment,
  onChange,
  placeholder,
  startAdornment,
  value,
  disabled,
}) => {
  return (
    <StyledInputWrapper>
      {!!startAdornment && startAdornment}
      <StyledInput
        placeholder={placeholder}
        value={value}
        disabled={disabled}
        onChange={onChange}
      />
      {!!endAdornment && endAdornment}
    </StyledInputWrapper>
  )
}

const StyledInputWrapper = styled.div`
  align-items: center;
  background-color: ${(props) => props.theme.color.grey[900]};
  border-radius: ${(props) => props.theme.borderRadius}px;
  display: flex;
  height: 40px;
  padding: 0 ${(props) => props.theme.spacing[3]}px;
  width: 400px;
`

const StyledInput = styled.input`
  background: none;
  border: 0;
  color: ${(props) => props.theme.color.black[100]};
  font-size: 18px;
  flex: 1;
  height: 56px;
  margin: 0;
  padding: 0;
  outline: none;
  width: 400px;
`

export default Input
