import styled from 'styled-components'

interface BorderProps {
  radius?: number
  color?: string
  padding?: number
  margin?: number
  borderWidth?: number
  shadow?:string,
  backgroundImage?:string,
  background?:string
}

const Border = styled.div<BorderProps>`
  position: relative;
  box-shadow: ${(props) => (props.shadow ? props.shadow : "none")};
  padding: ${(props) => (props.padding ? props.padding : 0)}px;
  margin: ${(props) => (props.margin ? props.margin : 0)}px;
  border-radius: ${(props) => props.radius}px;
  border: ${(props) => (props.borderWidth ? props.borderWidth : 1)}px solid ${(props) => (props.color)};
  background: ${(props) => (props.background ? props.background : "none")};
  background-image: ${(props) => (props.backgroundImage ? props.backgroundImage : "transparent")};
  flex: 1;
`

export default Border
