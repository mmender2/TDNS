import { TextField, IconButton} from "@material-ui/core"
import { AccountBalance, SearchOutlined } from '@material-ui/icons';
import "../App.css";
import { useRef, useState } from "react";
import { ReactComponent as Logo } from '../images/logo.svg';
import { useLocation, useNavigate } from "react-router-dom";
import {ethers} from 'ethers'
import Domains from '../artifacts/contracts/Domains.sol/Domains.json'

var value = ''
const Search = (props: any) => {
    
    // Initialize searchTerm state as an empty string
    const [searchTerm, setSearchTerm] = useState(""); 

    // Initialize availibility state as an empty string
    const [availibility, setColor] = useState('')

    // Retrieve selected option from SelectComponent
    const selected = props.message

    // useNavigate hook for navigation
    const navigate = useNavigate();

    // Function for navigating to searchResults page with searchTerm, availibility and selected option as state
    const navSearch = () => {
        navigate('/searchResults', {state: {name: searchTerm, color: availibility, value: selected} })
    }

// Function for checking the availibility of a domain
async function Avail() {

    const domain = searchTerm
    var contract

    // Retrieve the ethereum provider from window object
    const {ethereum} = window

    // Set the provider
    const provider = new ethers.providers.Web3Provider(ethereum); 

    // Get the signer
    const signer = provider.getSigner(); 

    // Set contract addresses
    const CONTRACT = '0x3992e228cF4f54a9C32B8e0001A82af5171657b1' 
    const CONTRACT2 = '0x94d1A39A9c96dAf874546D7384EBbab87174BaBe'
    const CONTRACT3 = '0x30D1E680C27aea768D7f44370Be8Eb504Ec8058C'

    // Create contracts
    const tfuel = new ethers.Contract(CONTRACT, Domains.abi, signer);
    const gworld = new ethers.Contract(CONTRACT2, Domains.abi, signer); 
    const theta = new ethers.Contract(CONTRACT3, Domains.abi, signer); 
    
    // Check selected option and set the contract variable accordingly
    if( selected === 'tfuel'){
        contract = tfuel
    }
    if( selected === 'gworld'){
        contract = gworld
    }
    else{
        contract = theta
    }

    // Check if domain is available
    let availibility = await contract.isAvail(domain)
    console.log(availibility)

    // If available, set availibility state as 'green', else set it as 'red'
    if (availibility === 'A')
    {
        availibility = 'green'
    }
    else
    {
        availibility = 'red'
    }
    setColor(availibility)

    return(availibility)
}

    Avail()
    
    return(
        
      <div >
            
            <div className='searchCont' style={{alignItems: "center", justifyContent: 'center'}} >
                
                <Logo style={{ height: '50%', width: '40%', paddingLeft: '50px',paddingRight: '50px', position: "absolute", verticalAlign: "middle", marginTop: 200, left: '30%', backgroundColor: '#1a202c', borderRadius: 10, overflow: 'auto', resize: 'both', display: 'flex', bottom: '100px' }} /> 
                <div>
                
                </div>
                <div style={{margin: 'auto', width: '100%'}}>
                    <TextField
                        
                        style={{width: '60%', display: "flex", position: "absolute", verticalAlign: "middle", backgroundColor: "white", borderRadius: 5, alignItems: "center", justifyContent: 'center', marginTop: 400, marginBottom: 50, left: '20%', right: '20%'}}
                        margin="normal"
                        className="textField"
                        fullWidth
                        id="standard-bare"
                        variant="outlined"
                        label="Search for Domains..."
                        onChange={(e) => setSearchTerm(e.target.value)}
                        InputProps={{
                        endAdornment: (
                            <IconButton onClick={async () => {navSearch();}} >
                            <SearchOutlined />
                            </IconButton>
                        ),
                        }}      
                    />


                    

                </div>
                
                
            </div>
        </div>
      
        
    )
}

export default Search