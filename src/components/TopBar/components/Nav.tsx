import React, { useEffect } from 'react'
import BigNumber from 'bignumber.js'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import useGlobal from '../../../store'

const Nav: React.FC = () => {
  const [globalState, globalActions] = useGlobal()

  useEffect(() => {
    const fetchPrices = async () => {
      const response = await fetch('https://api.pancakeswap.com/api/v1/price')
      const data = await response.json()

      // Return normalized token names
      return Object.keys(data.prices).reduce((accum, token) => {
        return {
          ...accum,
          [token.toLowerCase()]: new BigNumber(data.prices[token]),
        }
      }, {})
    }

    fetchPrices().then((prices: any) => {
      globalActions.setPrices({
        ...prices,
        gomix: prices['cake'],
      })
    })
  }, [])

  return (
    <StyledNav>
      <StyledLink exact activeClassName="active" to="/">
        Home
      </StyledLink>
      <StyledLink exact activeClassName="active" to="/farms">
        Enter the Hollow
      </StyledLink>
      <StyledLink exact activeClassName="active" to="/staking">
        Staking
      </StyledLink>
      <StyledLink exact activeClassName="active" to="/swap">
        GhostSwap
      </StyledLink>
      <StyledLink exact activeClassName="active" to="/route">
        GhostRoute
      </StyledLink>
    </StyledNav>
  )
}

const StyledNav = styled.nav`
  align-items: center;
  display: flex;
  font-family: TrixiePlain;
`

const StyledLink = styled(NavLink)`
  color: #fff;
  font-weight: 500;
  padding-left: ${(props) => props.theme.spacing[3]}px;
  padding-right: ${(props) => props.theme.spacing[3]}px;
  text-decoration: none;
  font-family: TrixiePlain;
  &:hover {
    color: #fff;
  }
  &.active {
    color: #fff !important;
    font-weight: bold;
  }
  @media (max-width: 400px) {
    padding-left: ${(props) => props.theme.spacing[2]}px;
    padding-right: ${(props) => props.theme.spacing[2]}px;
  }
`

export default Nav
