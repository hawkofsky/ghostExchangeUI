import React from 'react'
import styled from 'styled-components'
import github from '../../../assets/img/github.png'
import twitter from '../../../assets/img/twitter.png'
import medium from '../../../assets/img/medium.png'
import discord from '../../../assets/img/discord.png'

const Nav: React.FC = () => {
  return (
    <StyledNav>
      <StyledLink target="_blank" href="https://t.me/ghostmixer">
        <img
          src={discord}
          height="40"
          style={{ marginTop: -4 }}
          alt="telegram"
        />
      </StyledLink>
      <StyledLink
        target="_blank"
        href="https://github.com/computercybersecurity"
      >
        <img src={github} height="40" style={{ marginTop: -4 }} alt="github" />
      </StyledLink>
      <StyledLink target="_blank" href="http://twitter.com/">
        <img
          src={twitter}
          height="40"
          style={{ marginTop: -4 }}
          alt="twitter"
        />
      </StyledLink>
      <StyledLink target="_blank" href="https://medium.com">
        <img src={medium} height="40" style={{ marginTop: -4 }} alt="medium" />
      </StyledLink>
    </StyledNav>
  )
}

const StyledNav = styled.nav`
  align-items: center;
  display: flex;
  margin-top: 30px;
  margin-bottom: 30px;
`

const StyledLink = styled.a`
  color: ${(props) => props.theme.color.grey[400]};
  padding-left: 8px;
  padding-right: 8px;
  text-decoration: none;
  &:hover {
    color: ${(props) => props.theme.color.grey[500]};
  }
`

export default Nav
