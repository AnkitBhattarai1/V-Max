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
  Image,
  Text
} from '@chakra-ui/react';
import Logo from "../Imges/PLY.png"
import { login } from '../Redux/Auth/Action';
import { useToast } from '@chakra-ui/react'
import { useDispatch, useSelector, useStore } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import "./Navbar.css"

export const Login = () => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const [email_or_username,setemail_or_username]=useState("")
  const [password,setpassword]=useState("")
  const dispatch=useDispatch()
  const location=useLocation()
  const navigate=useNavigate()
  const toast = useToast()
  const store = useStore();
  const auth=useSelector((store)=>store.authReducer.isAuth)
  const err=useSelector((store)=>store.authReducer.isError)

  
 console.log(auth)

 
 const handleLogin=()=>{
   if (!email_or_username || !password) {
     toast({
       position: 'top',
       isClosable: true,
       duration: 2000,
       status: "error",
       render: () => (
         <Box color='white' p={3} bg='red.500'>
           Please fill in both email and password fields.
         </Box>
       ),
     });
     return;
   }
   const userData={
       email_or_username,
       password
   }
   dispatch(login(userData)).then((res)=>{
     // If the login action returns a fulfilled promise, show success; otherwise, show failure
     const state = store.getState();
     if(state.authReducer.isAuth && !state.authReducer.isError){
       toast({
         position: 'top',
         isClosable: true,
         duration: 2000,
         status: "success",
         render: () => (
           <Box color='white' p={3} bg='blue.500'>
             Login successfully! 😊 
           </Box>
         ),
       });
       navigate("/home");
     } else {
       toast({
         position: 'top',
         isClosable: true,
         duration: 2000,
         status: "error",
         render: () => (
           <Box color='white' p={3} bg='red.500'>
             Login failed! Incorrect email or password.
           </Box>
         ),
       });
     }
   });
}







  return (
    <Box as="main" w="100vw" minH="100vh" display="flex" alignItems="center" justifyContent="center" bgGradient="linear(to-br, #000014 60%, #1a237e 100%)" id='mainDiv'>
      <Container maxW="lg" p={{ base: 5, md: 10 }}>
        <Center>
          <Stack spacing={6} align="center">
            <Image w="80px" src={Logo} alt="logo" mb={2} borderRadius="full" boxShadow="lg" border="2px solid #2196f3" />
            <Heading fontSize="2xl" color="#fff" fontWeight="bold" letterSpacing="wide" textShadow="0 2px 8px #1a237e">Welcome Back!</Heading>
            <Text color="gray.300" fontSize="md">Login to your account to continue</Text>
            <VStack
              as="form"
              boxSize={{ base: 'xs', sm: 'sm', md: 'md' }}
              bg={useColorModeValue('#0b0b1f', 'gray.800')}
              rounded="2xl"
              border="1.5px solid #2196f3"
              boxShadow="2xl"
              color="#fff"
              p={{ base: 5, sm: 10 }}
              spacing={6}
              w="100%"
            >
              <FormControl id="email">
                <FormLabel color="#90caf9">Email</FormLabel>
                <Input rounded="md" type="email" value={email_or_username} onChange={(e)=>setemail_or_username(e.target.value)} placeholder="Enter your email" bg="#181a2a" color="#fff" borderColor="#2196f3" _placeholder={{ color: 'gray.400' }} />
              </FormControl>
              <FormControl id="password">
                <FormLabel color="#90caf9">Password</FormLabel>
                <InputGroup size="md">
                  <Input rounded="md" type={show ? 'text' : 'password'} value={password} onChange={(e)=>setpassword(e.target.value)} placeholder="Enter your password" bg="#181a2a" color="#fff" borderColor="#2196f3" _placeholder={{ color: 'gray.400' }} />
                  <InputRightElement width="4.5rem">
                    <Button
                      h="1.75rem"
                      size="sm"
                      rounded="md"
                      bg={useColorModeValue('blue.300', 'gray.700')}
                      _hover={{ bg: useColorModeValue('blue.400', 'gray.800') }}
                      color="#fff"
                      onClick={handleClick}
                    >
                      {show ? 'Hide' : 'Show'}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Stack direction="row" justifyContent="space-between" w="100%">
                <Checkbox colorScheme="blue" size="md" color="#90caf9">Remember me</Checkbox>
                <Link fontSize={{ base: 'md', sm: 'md' }} color="#90caf9" _hover={{ color: '#2196f3', textDecoration: 'underline' }}>Forgot password?</Link>
              </Stack>
              <Button
                bgGradient="linear(to-r, #2196f3, #21cbf3)"
                color="#fff"
                _hover={{ bgGradient: 'linear(to-r, #21cbf3, #2196f3)', boxShadow: '0 0 10px #2196f3' }}
                rounded="md"
                w="100%"
                fontWeight="bold"
                fontSize="lg"
                letterSpacing="wide"
                onClick={handleLogin}
              >
                Login
              </Button>
              <Text color="gray.300">Are you Admin? <a href='/Admin' style={{color:'#21cbf3', fontWeight:'bold'}}>Click here</a></Text>
              <Text color="gray.400">Don't have an account? <a href='/SignUp' style={{color:'#2196f3', fontWeight:'bold'}}>Sign Up</a></Text>
            </VStack>
          </Stack>
        </Center>
      </Container>
    </Box>
  );
};
