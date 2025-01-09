import { useState } from 'react';
import {
  Container,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  useColorModeValue,
  VStack,
  Center,
  InputGroup,
  InputRightElement,
  Checkbox,
  Link,
  Box,
  Image
} from '@chakra-ui/react';
import Logo from "../Imges/PLY.png"
import { login } from '../Redux/Auth/Action';
import { useToast } from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import "./Navbar.css"

export const Admin = () => {
    const [show, setShow] = useState(false);
    const handleClick = () => setShow(!show);
    const [email,setemail]=useState("")
    const [password,setpassword]=useState("")
    const toast = useToast()
    const navigate=useNavigate()

   const handleLogin=()=>{
    const userData={
        email,
        password
    }
    //email admin@321
    //password admin@123
    console.log(userData)
    if(email=="admin@321"&&password=="admin@123"){
        toast({
            position: 'top',
            isClosable: true,
            duration: 2000,
            status: "success",
            render: () => (
              <Box color='white' p={3} bg='blue.500'>
                Admin Login successfully! 😊 
              </Box>
            ),
           
          })
          navigate("/AdminPage")

    }
    else{
        toast({
            position: 'top',
            isClosable: true,
            duration: 2000,
            status: "warning",
            render: () => (
              <Box color='white' p={3} bg='blue.500'>
                Please Check your Email or Password
              </Box>
            ),
           
          })
    }
       //  navigate("/")
   }



  return (
    <Box as="main" w={"98.5vw"} paddingLeft={"13%"} height={"100Vh"} id='mainDiv'   bg={useColorModeValue('#000014', 'gray.800')} >
    <Container maxW="7xl" p={{ base: 5, md: 10 }}>
      <Center>
        <Stack spacing={4}>
          <Stack align="center">
           
          </Stack>
          <VStack
            as="form"
            boxSize={{ base: 'xs', sm: 'sm', md: 'md' }}
            h="max-content !important"
            bg={useColorModeValue('#0b0b1f', 'gray.700')}
            rounded="lg"
            border={"1px solid gray"}
            boxShadow="lg"
            color={"gray"}
            p={{ base: 5, sm: 10 }}
            spacing={8}
          >
            <Heading fontSize="2xl" color={"gray"} >Login in to Admin account</Heading>
             <Image w={"30%"} src={Logo} alt={"logo"} />
            <VStack spacing={4} w="100%">
            
              <FormControl id="email">
                <FormLabel>Email</FormLabel>
                <Input rounded="md" type="email" value={email} onChange={(e)=>setemail(e.target.value)} placeholder={"Enter your email"} />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <InputGroup size="md" >
                  <Input rounded="md" type={show ? 'text' : 'password'} value={password} onChange={(e)=>setpassword(e.target.value)}  placeholder={"Enter your password"} />
                  <InputRightElement width="4.5rem">
                    <Button
                      h="1.75rem"
                      size="sm"
                      rounded="md"
                      bg={useColorModeValue('blue.300', 'gray.700')}
                      _hover={{
                        bg: useColorModeValue('blue.400', 'gray.800')
                      }}
                      onClick={handleClick}
                    >
                      {show ? 'Hide' : 'Show'}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
            </VStack>
            <VStack w="100%">
              <Stack direction="row" justifyContent="space-between" w="100%">
                <Checkbox colorScheme="blue" size="md">
                  Remember me
                </Checkbox>
                <Link fontSize={{ base: 'md', sm: 'md' }}>Forgot password?</Link>
              </Stack>
              <Button
                bg="blue.300"
                color="white"
                _hover={{
                  bg: 'blue.500'
                }}
                rounded="md"
                w="100%"
                onClick={handleLogin}
              >
                Login
              </Button>
            </VStack>
          </VStack>
        </Stack>
      </Center>
    </Container>
    </Box>
  )
}
