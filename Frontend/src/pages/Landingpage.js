import React from 'react'
import { useState, useEffect } from 'react'
import {
  LandingPageBox,
  LogoContainer,
  SearchbarContainer,
  NavBar,
} from '../components/flexboxes'
import { Dropdown } from '@nextui-org/react'
import { Input,  Button} from '@nextui-org/react';

import axios from 'axios'
import SearchBar from '../components/searchbar'
import { BsSearch } from 'react-icons/bs'
import { ConnectButton, darkTheme } from '@rainbow-me/rainbowkit'

function LandingPage() {
  //keeps track of address to search
 //keeps track of address to search
 const [searchInput, setSearchInput] = useState("");
 function getData() {
     axios({
         method: "GET",
         url:'/'
     })
 }
 useEffect(() => {
     //run model in backend and fetch data to check if spam
     //display appropriate images
 })
  return (
    <div>
      <LandingPageBox>
        <NavBar>
          <ConnectButton />
        </NavBar>
        <LogoContainer style={{ display: 'flex', paddingTop: '20px' }}>
          <img
            src="../images/logo.png"
            alt="fish logo"
            width="300px"
            paddingTop="20px"
          />
        </LogoContainer>
        <SearchbarContainer>
        <Input 
          width="386px"
          labelLeft="address" 
          placeholder="vitalik.eth" 
          color="blue" 
        />
          <Dropdown>
            <Dropdown.Button flat>ETH</Dropdown.Button>
            <Dropdown.Menu aria-label="Static Actions">
              <Dropdown.Item key="new">USDC</Dropdown.Item>
              <Dropdown.Item key="copy">USDT</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </SearchbarContainer>
        <Button color="primary" auto>
          Primary
        </Button>
      </LandingPageBox>
    </div>
  )
   
}
export default LandingPage
