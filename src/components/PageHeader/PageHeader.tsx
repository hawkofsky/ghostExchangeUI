import React from 'react'
import styled from 'styled-components'

import Container from '../Container'

interface PageHeaderProps {
  icon: React.ReactNode
  subtitle?: string
  title?: string
  link?: string
  unlocked?: boolean
  redirect?: string
}

const PageHeader: React.FC<PageHeaderProps> = ({
  icon,
  unlocked = true,
  subtitle,
  title,
  redirect,
  link,
}) => {
  return (
    <Container size="lg">
      <StyledPageHeader>
        <StyledIcon>{icon}</StyledIcon>
        <StyledTitle>{title}</StyledTitle>
        <StyledSubtitle>{subtitle}</StyledSubtitle>
        {redirect ? (
          <>
            <a
              target="__blank"
              style={{ color: '#9E005D', marginTop: 20 }}
              href={redirect}
            >
              {link}
            </a>
            <StyledDesc>
              <StyledHighlight>??? GOMIX</StyledHighlight> in the whole pool
            </StyledDesc>
            <StyledDesc>
              <StyledHighlight>??? xGOMIX</StyledHighlight> in the whole pool
            </StyledDesc>
            <StyledDesc>
              APY = <StyledHighlight>???</StyledHighlight> percent
            </StyledDesc>
            <StyledDesc>
              <StyledHighlight>1 xGOMIX</StyledHighlight> ={' '}
              <StyledHighlight>??? GOMIX</StyledHighlight>
            </StyledDesc>
          </>
        ) : (
          ''
        )}
        {!unlocked ? (
          <label
            style={{ color: '#CCCCCC', fontWeight: 'normal', marginTop: 30 }}
          >
            Please unlock your wallet to see pool data!
          </label>
        ) : (
          ''
        )}
      </StyledPageHeader>
    </Container>
  )
}

const StyledPageHeader = styled.div`
  align-items: center;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  padding-bottom: ${(props) => props.theme.spacing[4]}px;
  padding-top: ${(props) => props.theme.spacing[8]}px;
  margin: 0 auto;
`

const StyledIcon = styled.div`
  font-size: 150px;
  height: 150px;
  line-height: 150px;
  text-align: center;
  width: 150px;
`

const StyledTitle = styled.h1`
  color: ${(props) => '#CCCCCC'};
  text-align: center;
  margin: 25px 0 0 0;
  padding: 0;
  font-style: normal;
  font-family: TrixiePlain;
  font-weight: lighter;
  font-size: 34px;
`

const StyledSubtitle = styled.h3`
  color: ${(props) => props.theme.color.green[100]};
  margin: 15px 0 0 0;
  padding: 0;
  text-align: center;
  font-style: normal;
  font-weight: lighter;
  font-size: 20px;
  color: rgba(140, 198, 63, 1);
`

const StyledHighlight = styled.span`
  color: rgba(140, 198, 63, 1);
`

const StyledDesc = styled.h3`
  color: #00ac7e;
  margin: 15px 0 0 0;
  padding: 0;
  text-align: center;
  font-style: normal;
  font-weight: lighter;
  font-size: 18px;
`

export default PageHeader
