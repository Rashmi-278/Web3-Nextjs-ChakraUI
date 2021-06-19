import { useWeb3modal } from "../hooks/web3";
import React, { useEffect, useState } from 'react';
import Blockies from 'react-blockies' ;
import { GrConnect, GrLink } from 'react-icons/gr'
import { Button } from "@chakra-ui/react"

const truncate = (address) => {
    return address.slice(0,6) + "..." + address.slice(-4) ; 
}

const ConnectWallet = () => {
    const [ signerAddress, SetSignerAddress ] = useState('');
    const { connectWallet, disconnectWallet, provider, error } = useWeb3modal();

    useEffect(() => {
        const getSignerAddress = async() => {
            const signer = await provider.getSigner();
            const address = await signer.getAddress();
            SetSignerAddress(address);
            console.log(address)

        }
        if (provider) getSignerAddress()
        else SetSignerAddress('')
    }, [provider])

    const handleConnect =  async () => {
        console.log("handleConnect fn")
        await connectWallet();
    }
    
    const handleDisconnect = () => {
        disconnectWallet();
    }

    return(
    <Button  colorScheme="pink" variant="solid"
    onClick= { signerAddress ?  handleDisconnect : handleConnect }
    >
        {signerAddress? 
    <Blockies seed={signerAddress.toLowerCase()} size={8} scale={3} />
    : <GrConnect/> }
   <div style={{ marginLeft: "5px" }}>
   { signerAddress ?  truncate(signerAddress) : "Connect Wallet"}
   </div>
    </Button>
    )
}
export default ConnectWallet;