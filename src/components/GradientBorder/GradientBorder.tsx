import styled from 'styled-components'

interface GradientBorderProps {
  radius?: number
  color1?: string
  color2?: string
  borderWidth?: number
  direction?: string
}

const GradientBorder = styled.div<GradientBorderProps>`
  position: relative;
  background: linear-gradient(
    ${(props) => (props.direction ? props.direction : 'to bottom')},
    ${(props) => (props.color1 ? props.color1 : props.theme.color.black[100])},
    ${(props) => (props.color2 ? props.color2 : props.theme.color.white[200])}
  );
  padding: ${(props) => (props.borderWidth ? props.borderWidth : 3)}px;
  border-radius: ${(props) => props.radius}px;
  border: 1px solid;
  flex: 1;
`

export default GradientBorder
