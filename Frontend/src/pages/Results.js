import React from "react";
import { Modal, Button, Text, Input, Row, Checkbox } from "@nextui-org/react";
import { SendIcon } from "../components/sendIcon";
import {utils} from "ethers";
import axios from "axios";
import { useState, useEffect } from 'react'
import toast, { Toaster } from 'react-hot-toast';

const notify = () => toast('Here is your toast.');


function ResultsModel({address}) {
  const [visible, setVisible] = React.useState(false);
  const [result, setResult] = useState('')

//   const handler = () => setVisible(true);

async function getResult() {
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
  function handler () {
    if (utils.isAddress(address)){
        setVisible(true);
    } else {
    }
  }

  const closeHandler = () => {
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
          <Button auto onClick={closeHandler}>
            Send &nbsp; <SendIcon size={15} />
          </Button>
        </Modal.Footer>
      </Modal>
      
    </div>
    
  );
}
export default ResultsModel