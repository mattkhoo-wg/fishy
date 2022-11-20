import React from 'react'
import { useState, useEffect } from 'react'
import {
  LandingPageBox,
  LogoContainer,
  SearchbarContainer,
  NavBar,
} from '../components/flexboxes'
import { Dropdown } from '@nextui-org/react'
import { Input,  Button, useInput} from '@nextui-org/react';

import axios from 'axios'
import SearchBar from '../components/searchbar'
import { BsSearch } from 'react-icons/bs'
import { ConnectButton, darkTheme } from '@rainbow-me/rainbowkit'
import { UNSAFE_getPathContributingMatches } from '@remix-run/router';

function LandingPage() {
  //keeps track of address to search
 //keeps track of address to search
 const [searchInput, setSearchInput] = useState("");
 const [result, setResult] = useState("");
 const [address, setAddress] = useState("0x1");

 const { value, reset, bindings } = useInput("");

 async function getResult(){
    await axios
    .get('http://127.0.0.1:5000/'+ address, {})
    .then(function (response) {
        console.log("YAYYA")
        setResult(response.data);
    })
    .catch(function (error) {
      console.log(error)
    })
  }
  
  const handleChange = event => {
    setAddress(event.target.value);

    console.log('value is:', event.target.value);
  };

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
          css={{ $$inputColor: "#A054E0", $$inputPlaceholderColor: "#A054E0", $$nextuiColorsAccents2: "#A054E0" }}
          onChange={handleChange}
        />
          <Dropdown>
            <Dropdown.Button flat>ETH</Dropdown.Button>
            <Dropdown.Menu aria-label="Static Actions">
              <Dropdown.Item key="new">USDC</Dropdown.Item>
              <Dropdown.Item key="copy">USDT</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </SearchbarContainer>
        <Button color="primary"  onClick={getResult}>
          {address}
        </Button>
        {result}
      </LandingPageBox>
    </div>
  )
   
}
export default LandingPage
