import { assignRef } from "@chakra-ui/react";
import React, {useState} from "react";
import { ReactDOM } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Search from "./Search";


const SelectComponent = () => {
    const [selectedOption, setSelectedOption] = useState('tfuel');
    // Retrieving the current window location for state
    const location = useLocation()

    // Creating a variable called value and setting it to the value of selectedOption
    var value = selectedOption

    // Defining a function called handleSelectChange which updates the selectedOption state variable
    const handleSelectChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setSelectedOption(event.target.value);
    }

    // Logging the value of the variable value to the console
    console.log('value:' + value)

    // Returning a JSX element containing a Search component and a dropdown menu with options for different values of selectedOption
    return(
        <>
            <Search message = {value}/>
            <select id='selectedOption' value={selectedOption} onChange={e => { handleSelectChange(e); } } style={{ position: 'absolute', left: '80%', marginTop: '400px' }}>
                <option selected value='tfuel'>tfuel</option>
                <option value='gworld'>gworld</option>
                <option value='theta'>theta</option>
            </select>
        </>
    )

}

export default SelectComponent
