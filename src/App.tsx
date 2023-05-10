import { Flex, Heading, IconButton, Spacer, useColorMode, useDisclosure, VStack } from "@chakra-ui/react";
import ConnectButton from "./components/ConnectButton";
import AccountModal from "./components/AccountModal";
import { FaSun, FaMoon, FaQuestion, FaHome, FaTwitter,FaUser } from "react-icons/fa"
import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./routes/Home";
import FAQ from "./routes/FAQ";
import SearchResult from "./routes/SearchRes";
import Account from "./routes/Account";
import Select from './components/Select';
import {motion as m} from 'framer-motion'

//import Domains from './artifacts/contacts/Domains.sol/Domains.json'

const domainAddress = '0x9fe46736679d2d9a65f0992f2272de9f3c7fa6e0'

function App() { 
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode, toggleColorMode} = useColorMode()
  const isDark = colorMode === 'dark'
  const navigate = useNavigate();
  const navFAQ = () => {
    navigate('/faq')
  }
  const navHome = () => {
    navigate('/')
  }
  const navTwit = () => {
    return window.location.href='https://twitter.com/TheGPooL'
  }
  const navAcc = () => {
    navigate('/account')
  }

  return (

    <><Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="faq" element={<FAQ />}> </Route>
      <Route path="searchResults" element={<SearchResult />}> </Route>
      <Route path='account' element={<Account />}></Route>
      <Route path='select' element={<Select />}></Route>
    </Routes>
    <VStack p={5}>
        <Flex w="100%" mb={350}>
          <ConnectButton handleOpenModal={onOpen}  />
          <AccountModal isOpen={isOpen} onClose={onClose} />
          <Spacer></Spacer>
          <IconButton mr={5} icon={<FaHome />} aria-label="home" onClick={navHome}></IconButton>
          <IconButton mr={5} icon={<FaUser />} aria-label="account" onClick={navAcc}></IconButton>
          <IconButton mr={5} icon={<FaQuestion />} aria-label="faq" onClick={navFAQ}></IconButton>
          <IconButton mr={5} icon={<FaTwitter />} aria-label="twitter" onClick={navTwit}></IconButton>
          <IconButton ml={8} icon={isDark ? <FaSun /> : <FaMoon />} onClick={toggleColorMode} aria-label={"darkMode"}></IconButton>
        </Flex>
        <Heading mb="50" size='md' fontWeight='semibold' color={isDark ? 'white' : 'black'}></Heading>
      
    </VStack></>
  ); 
}

export default App;
