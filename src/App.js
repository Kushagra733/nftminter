import './App.css';
import React,{ useEffect, useState} from 'react';
import {create} from 'ipfs-http-client';
import Web3 from 'web3'
import ABI from './contractabi.js'
const client = create('https://ipfs.infura.io:5001/api/v0');

function App() {

  const [web3,setweb3] = useState(null);
  const [imageurl,seturl] = useState('');
  const [metadataURI,setmeta] = useState('')
  const [add,setadd] = useState('');
  const [contract,setcontract] = useState(null);
  const [tokenID,setID] = useState("")
 
  const onchange = async(e)=>{

    const x = e.target.files[0]
    try {
      const added = await client.add(x)
      const ur = `https://ipfs.infura.io/ipfs/${added.path}`
      seturl(ur);
      
      const y = await client.add({
        "name":"myNFT",
        "description":"Kushagra's NFT",
        "image":`${ur}`,
        
      });
      const URI = `https://ipfs.infura.io/ipfs/${y.path}`
      setmeta(URI);
      

    } catch (error) {
      console.log('Error uploading file: ', error)
    }  

  }

  useEffect(()=>{
    if (window.ethereum) {
  
      // res[0] for fetching a first wallet
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((res) => setadd(res[0]));

        setweb3(new Web3(window.ethereum));
        const x = new Web3(window.ethereum);
      x && setcontract(new x.eth.Contract(ABI,'0x359ce2176d0Eb2BBFf562bb57CC4cac19B87d649'))




    } else {
      alert("install metamask extension!!");
    }
  },[])
  

  const submit=()=>{
        contract.methods.mint(add,metadataURI).send({from:add}).then((res)=>{
          console.log(res);
          setID("https://testnets.opensea.io/assets/rinkeby/0x359ce2176d0eb2bbff562bb57cc4cac19b87d649/"+res.transactionIndex)
        });
        
  }
  
  
  return (
    <>
    <div className="head">
      <h1>NFT - MINTER</h1>
    </div>
    <div className='upload'>
        <input type="file"  name='file' onChange={onchange}/> 
        <button onClick={submit} >submit</button>   
    </div>
    <div className="opensea">
      <a href={tokenID}>{tokenID}</a>
    </div>
    </>

  );
}

export default App;