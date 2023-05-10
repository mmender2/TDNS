import { useLocation, useNavigate } from "react-router-dom"; // Imports hooks for accessing the current location and navigation functions
import '../App.css' // Imports CSS file
import { FaCartPlus, FaCircle} from "react-icons/fa" // Imports icons from the Font Awesome library
import { createRef, useEffect, useState } from "react"; // Imports hooks for creating and managing component states
import { useEthers } from "@usedapp/core"; // Imports the useEthers hook from the Usedapp library
import {ethers} from 'ethers' // Imports the ethers library
import Domains from '../artifacts/contracts/Domains.sol/Domains.json' // Imports the JSON ABI of the Domains contract
import { IconButton } from "@chakra-ui/react"; // Imports the IconButton component from the Chakra UI library

const CONTRACT = '0x3992e228cF4f54a9C32B8e0001A82af5171657b1' // Sets the contract address for receiving funds
const CONTRACT2 = '0x94d1A39A9c96dAf874546D7384EBbab87174BaBe' // Sets the second contract address
const CONTRACT3 = '0x30D1E680C27aea768D7f44370Be8Eb504Ec8058C' // Sets the third contract address
var transaction = '' // Initializes an empty variable to store transaction details later

/* 
Returns search result, calculates if a domain is available, 
and handles minting and purchasing 
*/
const SearchResult = () => {
    
    const location = useLocation() // Retrieves the current location
    const searchResult = location.state.name // Retrieves the search term from the location state
    const value = location.state.value // Retrieves the value from the location state
    console.log('Value SR: ' + value) // Prints the value to the console
    const domain = searchResult // Sets the domain as the search result
    var color = location.state.color // Retrieves the color from the location state
    var transHash = '' // Initializes an empty variable to store transaction hash later

/* 
    Mints nft when purchased also sets price
*/
    async function Mint(){ // Defines an asynchronous function for minting the NFT and handling the purchase
        const searchResult = location.state.name // Retrieves the search term from the location state

        const record = '' // Initializes an empty variable for the record
        if(!searchResult){ // If no search result is available
            return window.location.href='https://twitter.com/TheGPooL' // Redirects to a Twitter page (to be changed to the homepage later)
        }
        const price = searchResult.length === 3 ? "0.05" : searchResult.length === 4 ? '0.03' : '0.01' // Determines the price based on the length of the search result
        console.log("minting domain", searchResult, "with price", price) // Logs the search result and price to the console
    
        try{
            const {ethereum} = window // Retrieves the ethereum object from the browser's window object
            if(ethereum){
                const provider = new ethers.providers.Web3Provider(ethereum); // Sets the provider as the Web3Provider from the ethers library using the ethereum object
                const signer = provider.getSigner(); // Retrieves the signer from the provider
                const contract = new ethers.Contract(CONTRACT, Domains.abi, signer); // Creates a new instance of the Domains contract using the contract address and ABI and the signer
                const contract2 = new ethers.Contract(CONTRACT2, Domains.abi, signer); // Contract creation
                const contract3 = new ethers.Contract(CONTRACT3, Domains.abi, signer); // Contract creation
                
                console.log('talk to the wallet and pay gas')
                
                let txn = await contract.register(domain, {
                    value: ethers.utils.parseEther(price)
                })
    
                const receipt = await txn.wait()
                if(receipt.status === 1){
                    console.log('domain minted at hash ' + txn.hash)
                    transHash = txn.hash
                }
                else{
                    console.log("Domain Unavailable")
                }
                txn = await contract.setRecord(domain, record); // Sets record
                await txn.wait()
                console.log("record set " + record)
                transaction = txn.hash
                location.state.color = 'red'
                
            }
            else{
                alert("Error txn failed")
            }
        }
        catch(error){
            console.log('error domain taken')
            alert("Domain Unavailable")   
        }    
    }

    return(  
        <div>
            <h2 className="box" style={{
                position: 'absolute', 
                width: '50%',
                display: 'flex',
                left: '25%',
                right: '20%',
                top: '70%',
                fontSize: 30,
                boxShadow: '1px 1px 10px'
                }
            }>
                <FaCircle style={{color: color}}></FaCircle>
                {searchResult}.{value}
                <IconButton style={{marginLeft: '40px'}} mr={5} icon={<FaCartPlus />} aria-label="home" onClick={Mint}></IconButton>
                <IconButton style={{marginLeft: '40px'}} mr={5} icon={<FaCircle />} aria-label="home"></IconButton>
                
            </h2>
            
        </div>
    )
}



export default SearchResult;