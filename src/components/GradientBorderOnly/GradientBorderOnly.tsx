import styled from 'styled-components'

interface GradientBorderOnlyProps {
    radius?: number
    color1?: string
    color2?: string
    borderWidth?: number
    direction?: string
}

const GradientBorderOnly = styled.div<GradientBorderOnlyProps>`
  position: relative;
  background-color: #1a1a1a96;
  border-radius: ${(props) => props.radius}px;
  border: ${(props) => (props.borderWidth ? props.borderWidth : 0)}px solid;
    border-image: linear-gradient(
  ${(props) => (props.direction ? props.direction : 'to bottom')},
    ${(props) => (props.color1 ? props.color1 : props.theme.color.black[100])},
    ${(props) => (props.color2 ? props.color2 : props.theme.color.white[200])}
  );
  border-image-slice: 1;
  height:100%
`

export default GradientBorderOnly
