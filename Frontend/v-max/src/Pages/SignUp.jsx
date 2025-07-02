import React from 'react';
import { registerUser, startRegistration, verifyCode } from '../Services/registrationService';

import {
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  useColorModeValue,
  VStack,
  Image,
  Flex,
  Box,
  HStack,
  Text
} from '@chakra-ui/react';
import Logo from "../Imges/PLY.png"
import { useDispatch } from 'react-redux';
import { useToast } from '@chakra-ui/react';
import { useNavigate ,useLocation} from 'react-router-dom';
import { Container } from '@chakra-ui/react';

const initialState = {
  first_name: '',
  last_name:'',
  middle_name:'',
  dob: '',
  email: '',
  password: '',
  verificationCode: Array(6).fill('') // Array to store 6 digits
};

export const SignUp = () => {
  const [user, setUser] = React.useState(initialState);
  const [step, setStep] = React.useState(1); // Track the current step
  const dispatch = useDispatch();
  const toast = useToast();
  const navigate = useNavigate();
 const location = useLocation(); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleCodeChange = (index, value) => {
    if (/^[0-9]*$/.test(value)) { // Allow only numerical input
      const newCode = [...user.verificationCode];
      newCode[index] = value;
      setUser((prev) => ({ ...prev, verificationCode: newCode }));

      // Auto-focus the next box
      if (value && index < 5) {
        document.getElementById(`code-box-${index + 1}`).focus();
      }
    }
  };

  const handleDetailsSubmit = async () => {
    if ( user.email === '') {
      toast({
        position: 'top',
        isClosable: true,
        duration: 2000,
        status: 'warning',
        render: <Box color="white" bg="blue.500" p="20px">Please fill out all required fields</Box>
      });
      return;
    }

    if (!user.email.includes('@gmail.com')) {
      toast({
        position: 'top',
        
        isClosable: true,
        duration: 2000,
        status: 'error',
        render: <Box color="white" bg="red.500" p="20px">Email must be a valid Gmail address</Box>
      });      
      return;      
    }

      const result = await startRegistration(user.email);

      if(result.success){
     toast({
        position: 'top',   
        isClosable: true,
        duration: 2000,
        status: 'error',
        render: <Box color="white" bg="green.500" p="20px">Verification Code sent successful</Box>
      });  
        setStep(2); // Move to verification step
        }
      
      else{
    toast({
        position: 'top',    
        isClosable: true,
        duration: 2000,
        status: 'error',
        render: <Box color="white" bg="red.500" p="20px">Failed to send verification code</Box>
    });  
      }
      };

  const handleCodeSubmit = async () => {

      if(!(user.verificationCode.length === 6))
      {toast({
        position: 'top',
        isClosable: true,
        duration: 2000,
        status: 'error',
        render: <Box color="white" bg="red.500" p="20px">The code must be 6 digits</Box>
      });
          return;
      }

        const result = await verifyCode(user.email, user.verificationCode.join('')); 

      if(result.success){    
        toast({
        position: 'top',
        isClosable: true,
        duration: 2000,
        status: 'success',
        render: <Box color="white" bg="green.500" p="20px">Verification successful!</Box>
      });
            setStep(3); 
        }
        // Move to set password step
  };

  const handlePasswordSubmit =  async (e) => {
    e.preventDefault();

      if (user.password === '') {
      toast({
        position: 'top',
        isClosable: true,
        duration: 2000,
        status: 'warning',
        render: <Box color="white" bg="blue.500" p="20px">Please set a password</Box>
      });
      return;
    }

    //dispatch(postSignup(user));


      const result = await registerUser(user);  

    if(result.success){
      toast({
      position: 'top',
      isClosable: true,
      duration: 2000,
      status: 'success',
      render: () => (
        <Box color="white" p={3} bg="blue.500">
          {user.Name}, your account has been created successfully! 😊
        </Box>
      )
    });

    setUser(initialState);
    navigate('/Login');
  }
  };

  return (
    <Box as="main" w="100vw" minH="100vh" display="flex" alignItems="center" justifyContent="center" bgGradient="linear(to-br, #000014 60%, #1a237e 100%)">
      <Container maxW="lg" p={{ base: 5, md: 10 }} centerContent>
        <Flex align="center" justify="center" direction="column">
          <Stack spacing={6} align="center">
            <Image w="80px" src={Logo} alt="logo" mb={2} borderRadius="full" boxShadow="lg" border="2px solid #2196f3" />
            <Heading fontSize="2xl" color="#fff" fontWeight="bold" letterSpacing="wide" textShadow="0 2px 8px #1a237e">Create Your Account</Heading>
            <Text color="gray.300" fontSize="md">Sign up to get started with V-Max</Text>
            <VStack
              as="form"
              boxSize={{ base: 'xs', sm: 'sm', md: 'md' }}
              minH="700px"
              bg={useColorModeValue('#0b0b1f', 'gray.800')}
              rounded="2xl"
              border="1.5px solid #2196f3"
              boxShadow="2xl"
              color="#fff"
              p={{ base: 5, sm: 10 }}
              spacing={6}
              w="100%"
              justify="center"
            >
              {step === 1 && (
                <>
                  <FormControl id="email">
                    <FormLabel color="#90caf9" fontWeight="bold" fontSize="lg">Email</FormLabel>
                    <Input rounded="lg" type="email" placeholder="Enter your Gmail address" name="email" value={user.email} onChange={handleChange} bg="#181a2a" color="#fff" borderColor="#2196f3" _placeholder={{ color: 'gray.400' }} fontSize="md" boxShadow="0 0 8px #2196f3" />
                  </FormControl>
                  <Button
                    bgGradient="linear(to-r, #2196f3, #21cbf3)"
                    color="#fff"
                    _hover={{ bgGradient: 'linear(to-r, #21cbf3, #2196f3)', boxShadow: '0 0 16px #21cbf3' }}
                    rounded="lg"
                    w="100%"
                    fontWeight="extrabold"
                    fontSize="xl"
                    letterSpacing="wider"
                    shadow="md"
                    onClick={handleDetailsSubmit}
                  >
                    Send Verification Code
                  </Button>
                </>
              )}
              {step === 2 && (
                <>
                  <FormControl>
                    <FormLabel color="#90caf9" fontWeight="bold" fontSize="lg">Enter Verification Code</FormLabel>
                    <HStack spacing={3} justifyContent="center">
                      {user.verificationCode.map((digit, index) => (
                        <Input
                          key={index}
                          id={`code-box-${index}`}
                          type="text"
                          maxLength="1"
                          value={digit}
                          onChange={(e) => handleCodeChange(index, e.target.value)}
                          textAlign="center"
                          rounded="lg"
                          width="3.2rem"
                          height="3.2rem"
                          fontSize="2xl"
                          bg="#181a2a"
                          color="#fff"
                          borderColor="#21cbf3"
                          boxShadow="0 0 8px #21cbf3"
                          _focus={{ borderColor: '#2196f3', boxShadow: '0 0 16px #2196f3' }}
                        />
                      ))}
                    </HStack>
                  </FormControl>
                  <Button
                    bgGradient="linear(to-r, #2196f3, #21cbf3)"
                    color="#fff"
                    _hover={{ bgGradient: 'linear(to-r, #21cbf3, #2196f3)', boxShadow: '0 0 16px #21cbf3' }}
                    rounded="lg"
                    w="100%"
                    fontWeight="extrabold"
                    fontSize="xl"
                    letterSpacing="wider"
                    shadow="md"
                    onClick={handleCodeSubmit}
                  >
                    Verify Code
                  </Button>
                </>
              )}
              {step === 3 && (
                <>
                  <FormControl id="FirstName">
                    <FormLabel color="#90caf9" fontWeight="bold">First Name</FormLabel>
                    <Input rounded="lg" type="text" placeholder="Enter your First Name" name="first_name" value={user.first_name} onChange={handleChange} bg="#181a2a" color="#fff" borderColor="#2196f3" _placeholder={{ color: 'gray.400' }} fontSize="md" />
                  </FormControl>
                  <FormControl id="MiddleName">
                    <FormLabel color="#90caf9" fontWeight="bold">Middle Name</FormLabel>
                    <Input rounded="lg" type="text" placeholder="Enter your Middle Name" name="middle_name" value={user.middle_name} onChange={handleChange} bg="#181a2a" color="#fff" borderColor="#2196f3" _placeholder={{ color: 'gray.400' }} fontSize="md" />
                  </FormControl>
                  <FormControl id="LastName">
                    <FormLabel color="#90caf9" fontWeight="bold">Last Name</FormLabel>
                    <Input rounded="lg" type="text" placeholder="Enter your Last Name" name="last_name" value={user.last_name} onChange={handleChange} bg="#181a2a" color="#fff" borderColor="#2196f3" _placeholder={{ color: 'gray.400' }} fontSize="md" />
                  </FormControl>
                  <FormControl id="Email">
                    <FormLabel color="#90caf9" fontWeight="bold">Email</FormLabel>
                    <Input rounded="lg" type="email" placeholder="Enter your Email" name="email" value={user.email} onChange={handleChange} bg="#181a2a" color="#fff" borderColor="#2196f3" _placeholder={{ color: 'gray.400' }} fontSize="md" />
                  </FormControl>
                  <FormControl id="DateOfBirth">
                    <FormLabel color="#90caf9" fontWeight="bold">Date of Birth</FormLabel>
                    <Input rounded="lg" type="date" name="dob" value={user.dob} onChange={handleChange} bg="#181a2a" color="#fff" borderColor="#2196f3" fontSize="md" />
                  </FormControl>
                  <FormControl id="password">
                    <FormLabel color="#90caf9" fontWeight="bold">Password</FormLabel>
                    <Input
                      rounded="lg"
                      type="password"
                      placeholder="Set your password"
                      name="password"
                      value={user.password}
                      onChange={handleChange}
                      bg="#181a2a"
                      color="#fff"
                      borderColor="#2196f3"
                      _placeholder={{ color: 'gray.400' }}
                      fontSize="md"
                    />
                  </FormControl>
                  <Button
                    bgGradient="linear(to-r, #2196f3, #21cbf3)"
                    color="#fff"
                    _hover={{ bgGradient: 'linear(to-r, #21cbf3, #2196f3)', boxShadow: '0 0 16px #21cbf3' }}
                    rounded="lg"
                    w="100%"
                    fontWeight="extrabold"
                    fontSize="xl"
                    letterSpacing="wider"
                    shadow="md"
                    onClick={handlePasswordSubmit}
                  >
                    Sign Up
                  </Button>
                  <Text color="#b3e5fc" w="100%" textAlign="center" fontWeight="bold" fontSize="md">Already have an account? <a href='/Login' style={{color:'#21cbf3', fontWeight:'bold', textDecoration:'underline'}}>Login</a></Text>
                </>
              )}
            </VStack>
          </Stack>
        </Flex>
      </Container>
    </Box>
  );
};
