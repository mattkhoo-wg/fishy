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
  const [path, setPath] = useState('')
  const [color, setColor] = useState('')
  const imgPath = ['../images/deadfish.png','../images/midfish.png','../images/livefish.png']
  const colors = ['#FF4A4A','#FFB636','#68BD46']
  
//   const handler = () => setVisible(true);

async function getResult() {
    await axios
      .get('http://127.0.0.1:3001/' + address, {})
      .then(function (response) {
        console.log('YAYYA')
        setResult(Math.round(response.data*100))
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
        <Modal.Body style={{alignItems:'center', paddingTop:'0'}}>
            <img src={path} alt='fish image'/>
            <p style={{color:{color}, fontSize:'40px' }}> {color}{result}% </p>
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