import React from "react";
import { Modal, Button, Text, Input, Row, Checkbox } from "@nextui-org/react";
import { SendIcon } from "../components/sendIcon";
import {utils, BigNumber} from "ethers";
import axios from "axios";
import { useState, useEffect } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import { ethers } from 'ethers'
import { usePrepareSendTransaction, useSendTransaction } from 'wagmi'




const provider = new ethers.providers.JsonRpcProvider('https://eth-mainnet.g.alchemy.com/v2/TJiDkA_krKu332d64XO1lp8ER7JCLX-U')



function ResultsModel({address, setAddress, amount}) {

  const { config } = usePrepareSendTransaction({
    request: { to: address, value: BigNumber.from(String(amount*1000000000000000000)) },
  })
  const { data, isLoading, isSuccess, sendTransaction } =
    useSendTransaction(config)

  const [visible, setVisible] = React.useState(false);
  const [result, setResult] = useState('')

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
      .get('http://127.0.0.1:5000/' + address, {})
      .then(function (response) {
        console.log('YAYYA')
        setResult(response.data)
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
        <Modal.Body>
            {result}
      
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