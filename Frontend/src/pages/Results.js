import React from "react";
import { Modal, Button, Text, Input, Row, Checkbox } from "@nextui-org/react";
import { SendIcon } from "../components/sendIcon";
import {utils, BigNumber} from "ethers";
import axios from "axios";
import { useState, useEffect } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import { ethers } from 'ethers'
import { usePrepareSendTransaction, useSendTransaction } from 'wagmi'


const notify = () => toast('Here is your toast.');



const provider = new ethers.providers.JsonRpcProvider('https://eth-mainnet.g.alchemy.com/v2/TJiDkA_krKu332d64XO1lp8ER7JCLX-U')



function ResultsModel({address, setAddress, amount}) {

  const { config } = usePrepareSendTransaction({
    request: { to: address, value: BigNumber.from(String(amount*1000000000000000000)) },
  })
  const { data, isLoading, isSuccess, sendTransaction } =
    useSendTransaction(config)

  const [visible, setVisible] = React.useState(false);
  const [result, setResult] = useState('')
  const [path, setPath] = useState('')
  const [colorT, setColor] = useState('')
  const imgPath = ['../images/deadfish.png','../images/midfish.png','../images/livefish.png']
  const colors = ['#FF4A4A','#FFB636','#68BD46']
  
//   const handler = () => setVisible(true);

async function getResult() {
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
 
        if (response.data > 70) {
          setPath(imgPath[2])
          setColor(colors[2])
        } else if (response.data < 40) {
          setPath(imgPath[0])
          setColor(colors[0])
        } else {
          setPath(imgPath[1])
          setColor(colors[1])
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
    console.log("closed");
  };

  

  return (
    <div>
      <Button  onPress={() => {getResult(address)}}css={{width:"176px", background: "#621BEB"}} auto shadow onClick={handler}>
        Check
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
            <img src={path} alt='fish image'/>
            <p style={{color:colorT, fontSize:'40px' }}> {result}% </p>
        </Modal.Body>
        <Modal.Footer>
          <Button auto flat color="error" onClick={closeHandler}>
            Close
          </Button>
          <Button auto onClick={() => {sendTransaction?.(); closeHandler(); }}>
            Send &nbsp; <SendIcon size={15} />
          </Button>
        </Modal.Footer>
      </Modal>
      
    </div>
    
  );
}
export default ResultsModel