import React, { useContext, useMemo } from 'react'
import styled, { ThemeContext } from 'styled-components'

import { Link } from 'react-router-dom'
import Border from '../Border'
import GradientBorder from '../GradientBorder'

interface ButtonProps {
  children?: React.ReactNode
  disabled?: boolean
  href?: string
  onClick?: () => void
  size?: 'sm' | 'md' | 'lg'
  text?: string
  to?: string
  variant?: 'default' | 'secondary' | 'tertiary'
  hasGradientBorder?: boolean
  border?: string
  backGroundColor?: string
}

const Button: React.FC<ButtonProps> = ({
  children,
  disabled,
  href,
  onClick,
  size,
  text,
  to,
  variant,
  hasGradientBorder,
  border,
  backGroundColor,
}) => {
  const { color, spacing } = useContext(ThemeContext)

  let buttonColor: string
  switch (variant) {
    case 'secondary':
      buttonColor = color.grey[500]
      break
    case 'default':
    default:
      buttonColor = color.primary.main
  }

  let boxShadow: string
  let buttonSize: number
  let buttonPadding: number
  let fontSize: number
  switch (size) {
    case 'sm':
      buttonPadding = spacing[3]
      buttonSize = 36
      fontSize = 14
      break
    case 'lg':
      buttonPadding = spacing[3]
      buttonSize = 72
      fontSize = 16
      break
    case 'md':
    default:
      buttonPadding = spacing[3]
      buttonSize = 44
      fontSize = 18
  }

  const ButtonChild = useMemo(() => {
    if (to) {
      return <StyledLink to={to}>{text}</StyledLink>
    } else if (href) {
      return (
        <StyledExternalLink href={href} target="__blank">
          {text}
        </StyledExternalLink>
      )
    } else {
      return text
    }
  }, [href, text, to])

  if (hasGradientBorder) {
    return (
      <GradientBorder radius={12}>
        <StyledButton
          boxShadow={boxShadow}
          color={buttonColor}
          disabled={disabled}
          fontSize={fontSize}
          onClick={onClick}
          padding={buttonPadding}
          size={buttonSize}
          backGroundColor={backGroundColor}
        >
          {children}
          {ButtonChild}
        </StyledButton>
      </GradientBorder>
    )
  }
  return (
    <Border
      radius={14}
      color={'rgba(10,134,106,1)'}
      borderWidth={1}
      padding={1}
      shadow={'0px 0px 42px -4px rgb(0 172 126)'}
    >
      <Border
        radius={13}
        color={'rgba(42, 138, 124, 1)'}
        background={'linear-gradient(to top, #763da4ff, #00AC7E00)'}
        borderWidth={1}
        padding={3}
      >
        <Border
          radius={10}
          color={'rgba(66,139,148,1)'}
          borderWidth={1}
          padding={3}
          background={'#0e6555'}
        >
          <StyledButton
            boxShadow={boxShadow}
            color={buttonColor}
            disabled={disabled}
            fontSize={fontSize}
            onClick={onClick}
            padding={buttonPadding}
            size={buttonSize}
            border={border}
            backGroundColor={backGroundColor}
          >
            {children}
            {ButtonChild}
          </StyledButton>
        </Border>
      </Border>
    </Border>
  )
}

interface StyledButtonProps {
  boxShadow: string
  border?: string
  color: string
  disabled?: boolean
  fontSize: number
  padding: number
  size: number
  backGroundColor: string
}

const StyledButton = styled.button<StyledButtonProps>`
  align-items: center;
  background-color: ${(props) =>
    props.backGroundColor ? props.backGroundColor : '#8CC63F'};
  border: ${(props) => (props.border ? props.border : '0')};
  border-radius: 10px;
  box-shadow: ${(props) => props.boxShadow};
  color: ${(props) =>
    !props.disabled ? '#000000' : `${props.theme.color.black[200]}80`};
  cursor: pointer;
  display: flex;
  font-size: ${(props) => props.fontSize}px;
  line-height: 18px;
  font-weight: 500;
  height: ${(props) => props.size}px;
  justify-content: center;
  outline: none;
  padding-left: ${(props) => props.padding}px;
  padding-right: ${(props) => props.padding}px;
  pointer-events: ${(props) => (!props.disabled ? undefined : 'none')};
  width: 100%;
  &:hover {
    background-color: ${(props) => props.theme.color.grey[100]};
  }
`

const StyledLink = styled(Link)`
  align-items: center;
  color: inherit;
  display: flex;
  flex: 1;
  height: 56px;
  justify-content: center;
  margin: 0 ${(props) => -props.theme.spacing[4]}px;
  padding: 0 ${(props) => props.theme.spacing[4]}px;
  text-decoration: none;
`

const StyledExternalLink = styled.a`
  align-items: center;
  color: inherit;
  display: flex;
  flex: 1;
  height: 56px;
  justify-content: center;
  margin: 0 ${(props) => -props.theme.spacing[4]}px;
  padding: 0 ${(props) => props.theme.spacing[4]}px;
  text-decoration: none;
`

export default Button
