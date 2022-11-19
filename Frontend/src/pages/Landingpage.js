import React from 'react'
import { useState, useEffect } from 'react'
import {
    LandingPageBox,
    LogoContainer,
    SearchbarContainer
} from "../components/flexboxes"
import SearchBar from '../components/searchbar'
import Bubbles from './Bubbles';
import { BsSearch } from "react-icons/bs";

function LandingPage() {
    //keeps track of address to search
    const [searchInput, setSearchInput] = useState("");

    useEffect(() => {
        //run model in backend and fetch data to check if spam
        //display appropriate images
    })
    return(
        <div>
            <Bubbles />
            <LandingPageBox>
                
                <LogoContainer style={{display: "flex", paddingTop: "8%"}}>
                    <img src="../images/logo.png" alt='fish logo' width="25%" height="15%" paddingTop="8%"/>
                </LogoContainer>
                <SearchbarContainer>
                    <form style={{display: "flex", width: "50%"}}>  
                        <SearchBar onChange={(e) => setSearchInput(e.target.value)}></SearchBar>
                        <BsSearch style={{height: '25px', width:'25px', padding:'5px'}}></BsSearch> 
                    </form>
                </SearchbarContainer>
                
            </LandingPageBox>
            
        </div>
    )
}
export default LandingPage