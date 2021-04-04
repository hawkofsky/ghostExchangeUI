import React from 'react'
import styled, { keyframes } from 'styled-components'
import Border from '../Border'

export interface ModalProps {
  onDismiss?: () => void
}

const Modal: React.FC = ({ children }) => {
  return (
    <StyledResponsiveWrapper>
      <Border
        radius={20}
        color={'rgba(0,172,126,1)'}
        borderWidth={1}
        padding={0}
        shadow={'0px 0px 42px -4px rgb(0 172 126)'}
      >
        <Border radius={17} color={'rgb(49 97 84)'} borderWidth={3} padding={0}>
          <Border
            radius={17}
            color={'rgba(0,172,126,1)'}
            borderWidth={1}
            margin={6}
            padding={4}
          >
            {/* <GradientBorderOnly
              radius={7}
              color1={'transparent'}
              color2={'#5b2b65'}
              direction="to right"
              borderWidth={7}
            > */}
            <Border
              margin={4}
              radius={7}
              color={'#ED1E79'}
              borderWidth={1}
              padding={0}
            >
              <StyledModal>{children}</StyledModal>
            </Border>
            {/* </GradientBorderOnly> */}
          </Border>
        </Border>
      </Border>
    </StyledResponsiveWrapper>
  )
}

const mobileKeyframes = keyframes`
  0% {
    transform: translateY(0%);
  }
  100% {
    transform: translateY(-100%);
  }
`

const StyledResponsiveWrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  position: relative;
  width: 100%;
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}px) {
    flex: 1;
    position: absolute;
    top: 100%;
    right: 0;
    left: 0;
    max-height: calc(100% - ${(props) => props.theme.spacing[4]}px);
    animation: ${mobileKeyframes} 0.3s forwards ease-out;
  }
`

const StyledModal = styled.div`
  padding: 0 30px;
  background: #000000;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  min-height: 0;
`

export default Modal
