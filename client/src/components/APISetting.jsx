import React, {useState, useEffect} from 'react'
import styled from '@emotion/styled';
import { Button, TextField } from "@mui/material";
import { editApiKey, importApiKey } from '../utils/connect';
import { useStateContext } from '../contexts/ContextProvider';

const Container = styled.div`
    height:98%;
    margin-bottom:2%;
    width:50%;
    border: 1px solid #ccc;
    border-radius: 40px;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
    box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.2);
`

const TextStyle = styled.div`
    background-image: linear-gradient(90deg,#2e4f8b 0%,#3e589d 35%,#8f619b 60%,#d0718f 70%);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    font-size: 12px;
    font-weight: bold;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 2vh;
    margin-top: 2vh;
`;

function APISetting() {
  const [isEditApiKey, setIsEditApiKey] = useState(false)
  const { userId } = useStateContext();
  const [apiKey, setApiKey] = useState("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")
  const [tempApiKey, setTempApiKey] = useState();

  useEffect(async () => {
    try {
      const apikeyData = await importApiKey(userId);
      setApiKey(apikeyData);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const processApiKey = (apiKey) => {
      let str = '';
      for (let i = 0; i < apiKey.length - 6; i++) {
          str += "∗";
      }
      return apiKey.slice(0, 3)+str+apiKey.slice(-3)
  }

  const handleEdit = () => {
    setIsEditApiKey(!isEditApiKey)
    setTempApiKey(apiKey)
  }

  const handleCancel = () => {
    setIsEditApiKey(!isEditApiKey)
    setTempApiKey(apiKey)
  }

  const handleConfirm = async () => {
    setIsEditApiKey(!isEditApiKey)
    setApiKey(tempApiKey)
    try{
      await editApiKey()
    }
    catch (error) {
      console.log(error)
    }
  }
  
  return (
    <Container>
        <TextStyle>API Key :</TextStyle>
        {
          isEditApiKey && 
          <TextField 
            id="api-key" 
            variant="outlined" 
            value={tempApiKey} 
            onChange={(e) => setTempApiKey(e.target.value)}
            size="small"
          />
        }
        {
          !isEditApiKey && <TextStyle>{processApiKey(apiKey)}</TextStyle>
        }
        {!isEditApiKey && <Button variant="contained" color="primary" onClick={handleEdit} style={{width:"6rem", marginLeft:"1rem"}}>
          Edit
        </Button>}
        {isEditApiKey && <Button variant="contained" color="secondary" onClick={handleCancel} style={{width:"6rem", marginLeft:"1rem"}}>
          Cancel
        </Button>}
        {isEditApiKey && <Button variant="contained" color="primary" onClick={handleConfirm} style={{width:"6rem", marginLeft:"1rem"}}>
          Confirm
        </Button>}
    </Container>

  )
}

export default APISetting
