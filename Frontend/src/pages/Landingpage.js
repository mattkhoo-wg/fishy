import React from 'react'
import { useState, useEffect } from 'react'
import {
  LandingPageBox,
  LogoContainer,
  SearchbarContainer,
  NavBar,
  SecondSearchbarContainer,
  SubmitContainer,
} from '../components/flexboxes'
import { Dropdown } from '@nextui-org/react'
import { Input, Button, useInput } from '@nextui-org/react'
import Result from './Results'
import ResultsModel from './Results'
import axios from 'axios'
import SearchBar from '../components/searchbar'
import { BsSearch } from 'react-icons/bs'
import { ConnectButton, darkTheme } from '@rainbow-me/rainbowkit'
import { UNSAFE_getPathContributingMatches } from '@remix-run/router'
import Bubbles from './Bubbles'
import { useEnsResolver } from 'wagmi'
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';





function LandingPage() {
    

 const notify = () => toast("Wow so easy!");

  //keeps track of address to search
  //keeps track of address to search
  const [searchInput, setSearchInput] = useState('')
  const [result, setResult] = useState('')
  const [amount, setAmount] = useState('')
  const [address, setAddress] = useState('0x1')

  const { value, reset, bindings } = useInput('')

 

  const handleChange = (event) => {
    setAddress(event.target.value)

    console.log('value is:', event.target.value)
  }
  
  const handleChangeAmount = (event) => {
    setAmount(event.target.value)

    console.log('value is:', event.target.value)
  }

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
            width="400px"
            labelLeft="address"
            placeholder="vitalik.eth"
            css={{
              $$inputColor: '#A054E0',
              $$inputPlaceholderColor: '#A054E0',
              $$nextuiColorsAccents2: '#A054E0',
            }}
            onChange={handleChange}
            shadow
          />
        </SearchbarContainer>
        <SecondSearchbarContainer>
            <div style={{alignSelf: "center"}}>
            Fill to also send assets
            </div>
          <Input
            width="85px"
            Placeholder="Amount"
            type="number"
            color="default"
            min="0"
            onChange={handleChangeAmount}
          />
          <Dropdown>
            <Dropdown.Button flat>ETH</Dropdown.Button>
            <Dropdown.Menu aria-label="Static Actions">
              <Dropdown.Item key="new">USDC</Dropdown.Item>
              <Dropdown.Item key="copy">USDT</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </SecondSearchbarContainer>
        <SubmitContainer>
          <ResultsModel address ={address} setAddress={setAddress} amount={amount}></ResultsModel>
        </SubmitContainer>
      </LandingPageBox>
      <Bubbles></Bubbles>
      

    </div>
  )
}
export default LandingPage
