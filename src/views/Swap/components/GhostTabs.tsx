import React, { useContext, useEffect, useMemo, useState } from 'react'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import useGhost from '../../../hooks/useGhost'
import styled from 'styled-components'
import Button from '../../../components/Button'
import Card from '../../../components/Card'
import CardContent from '../../../components/CardContent'
import CardIcon from '../../../components/CardIcon'
import Label from '../../../components/Label'
import Value from '../../../components/Value'
import BigNumber from 'bignumber.js'
import Container from '../../../components/Container'
import { getXGhostSupply, getTotalStakedGhostSupply } from '../../../ghost/utils'
import { getBalanceNumber } from '../../../utils/formatBalance'
import Border from '../../../components/Border'
import Spacer from '../../../components/Spacer'
import { title } from 'process'
import Input from '../../../components/Input'
// import { Tabs, Tab, Content } from "./tab";
const GhostTabs: React.FC<any> = (props) => {
    const [active, setActive]= useState(0);
    const handleClick = (e:any) => {
        const index = parseInt(e.target.id, 0);
        if (index !== active) {
          setActive(index);
          props.titleUpdate(e.target.title)
        }
    };
    const updateFrom = (v:any)=>{
      return 'aaa';
    }
    return (
        <>         
            <Tabs>
                <Tab onClick={handleClick} active={active === 0} id={0} title="EXCHANGE">
                  EXCHANGE
                </Tab>

                <Tab onClick={handleClick} active={active === 1} id={1} title="POOL">
                  POOL
                </Tab>
            </Tabs>
            <>
                <Content active={active === 0}>
                  <Row>
                    <Col size={6}>
                      <Label text={`From`} />
                      <Input onChange={updateFrom} value="" />
                      <Label text={`to`} />
                      <Input onChange={updateFrom} value="" />
                    </Col>
                    <Col size={6}>
                     <Label text={`Balance: 4.321 BNB`} />
                    </Col>
                  </Row>
                  <Spacer></Spacer>
                  <Row>
                    <Col size={12}>
                      <Button
                        text="Enter Amount"
                        border="1px solid"
                      />
                    </Col>
                  </Row>
                </Content>
                <Content active={active === 1}>
                  <h1>Content 2</h1>
                </Content>
            </>                 
        </>
      )
}

const Row = styled.div`
  display:flex;
`;

const Col = styled.div<any>`
  width: ${(props) => props.size / 12 * 100}%;
`;

const Tabs = styled.div`
  overflow: hidden;
  // background: #fff;
  font-family: Open Sans;
  height: 3em;
`;

const Tab = styled.button<any>`
  border: none;
  outline: none;
  cursor: pointer;
  width: 40%;
  position: relative;
  margin-right: 0.1em;
  font-size: 1em;
  border: ${props => (props.active ? "1px solid #ccc" : "")};
  border-bottom: ${props => (props.active ? "none" : "")};
  background-color: ${props => (props.active ? "white" : "lightgray")};
  height: ${props => (props.active ? "3em" : "2.6em; top:.4em")};
  transition: background-color 0.5s ease-in-out;

  :hover {
    background-color: white;
  }
`;
const Content = styled.div<any>`
  ${props => (props.active ? "" : "display:none")}
`;

export default GhostTabs
