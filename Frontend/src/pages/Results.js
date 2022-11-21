import React from "react";
import { Modal, Button, Text, Input, Row, Checkbox } from "@nextui-org/react";
import { SendIcon } from "../components/sendIcon";
import {utils, BigNumber} from "ethers";
import axios from "axios";
import { useState, useEffect } from 'react'
import { ethers } from 'ethers';
import { usePrepareSendTransaction, useSendTransaction } from 'wagmi';









const provider = new ethers.providers.JsonRpcProvider('https://eth-mainnet.g.alchemy.com/v2/TJiDkA_krKu332d64XO1lp8ER7JCLX-U')



function ResultsModel({address, setAddress, amount, setAmount}) {

  const { config } = usePrepareSendTransaction({
    request: { to: address, value: BigNumber.from(String(amount*1000000000000000000)) },
  })
  const { data, isLoading, isSuccess, sendTransaction } =
    useSendTransaction(config)

  const [visible, setVisible] = React.useState(false);
  const [result, setResult] = useState('')
  const [path, setPath] = useState(require('../images/loadingFish.gif'));
  const [colorT, setColor] = useState('')
  const [line, setLine] = useState('')
  const [amountNotZero, setAmountNotZero] = useState(false)

  const imgPath = ['../images/evil.png','../images/hidden.png','../images/suit.png','../images/happy.png']
  const colors = ['#FF4A4A','#FFB636', '#8CD47E', '#68BD46']
  const lines = ['uh oh this fish might be dangerous...', "we're not too sure about this one", "This guys is harmless", "You've met the most honest fish in the ocean"]
  
//   const handler = () => setVisible(true);
async function sendTransactionHandler() {
  if (amount > 0) {
    sendTransaction?.();
  }
}
  

async function getResult() {
    setAmountNotZero(amount > 0)
    if (utils.isAddress(address)){
        setAddress(address)

    } else if (address.includes(".eth")) {
        var ens = await provider.resolveName(address)
        console.log(ens)
        setAddress(ens)
    }
   address = await provider.resolveName(address);
    console.log(address)
    await axios
      .get('http://127.0.0.1:3001/' + address, {})
      .then(function (response) {
        console.log('YAYYA')
       
        response.data = Math.round(response.data*100)
        setResult(response.data)
 
        if (response.data > 75) {
          setPath(imgPath[3])
          setColor(colors[3])
          setLine(lines[3])
        } else if (response.data <= 75 && response.data > 50) {
          setPath(imgPath[2])
          setColor(colors[2])
          setLine(lines[2])
        } else if (response.data <= 50 && response.data > 25) {
          setPath(imgPath[1])
          setColor(colors[1])
          setLine(lines[1])
        }else {
          setPath(imgPath[0])
          setColor(colors[0])
          setLine(lines[0])
        }
      })
      .catch(function (error) {
        console.log(error)
      })
  }
  async function handler () {


    if (utils.isAddress(address) || address.includes(".eth")){
        setVisible(true);
    } else {
    }
  }

  const closeHandler = () => {
    setResult('');
    setVisible(false);
    setPath(require('../images/loadingFish.gif'));
    setLine('');
    setAmount('');
    console.log("closed");
  };

  

  return (
    <div>
      {/* <SnackbarProvider /> */}
      <Button  onPress={() => {getResult(address)}}css={{width:"176px", background: "#621BEB"}} auto shadow onClick={handler}>
        {amount > 0 ? "Send ": "Check"}
      </Button>
      <Modal
        closeButton
        aria-labelledby="modal-title"
        open={visible}
        onClose={closeHandler}
      >
        <Modal.Header>
          <Text id="modal-title" size={18}>
           Results
          </Text>
        </Modal.Header>
        <Modal.Body style={{alignItems:'center', paddingTop:'0'}}>
            <p style={{fontSize: '20px'}}> {line}</p>
            <img src={path} style={{width: '75%'}}/>
            <p style={{color:colorT, fontSize:'45px' }}> {result}% </p>
            <p style={{fontSize: '20px'}}>Address: {address.slice(0,8)}...{address.slice(32,40)}</p>
            {amountNotZero ? <p style={{fontSize: '20px'}}>Amount: {amount}</p> : <></>}
        </Modal.Body>
        <Modal.Footer>
          
          {/* {conditional thing} */}
          <Button auto flat color="error" onClick={closeHandler}>
            Close
          </Button>
          {amount > 0 ? <Button auto onClick={() => {sendTransactionHandler(); closeHandler(); }}>
            Send &nbsp; <SendIcon size={15} />
          </Button>: <></>}
          
        </Modal.Footer>
      </Modal>

    </div>
    
  );
}
export default ResultsModel