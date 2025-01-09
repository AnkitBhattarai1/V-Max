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
  Text,
  useToast
} from '@chakra-ui/react';
import Logo from "../Imges/PLY.png"
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { editProduct, getMovies } from '../Redux/MovieReducer/Action'
import '../Components/MoviesCard.css'

export const EditMovie = () => {
    const [Poster_Image, setPoster_Image] = useState("");
    const [Title, setTitle] = useState("");
    const [Runtime, setRuntime] = useState('');
    const [Description, setDescription] = useState('');
    const Movies=useSelector((store)=> store.productReducer.movies)
    const { _id } = useParams();
    const toast = useToast()
    const dispatch = useDispatch();
    const navigate=useNavigate()

    useEffect(() => {
        const data = Movies.find((el) => el._id === _id);
        setPoster_Image(data.Poster_Image);
        setTitle(data.Title);
        setRuntime(data.Runtime);
        setDescription(data.Description);
      }, [_id, Movies]);

      const handleEdit = () => {
        const data = { Poster_Image:Poster_Image, Title:Title, Runtime:Runtime,Description: Description };
        dispatch(editProduct({_id, data}))
        toast({
          title: `Movie Details Updated Successfully`,
          position: "top",
          isClosable: true,
        })
        dispatch(getMovies())
        navigate("/AdminPage")
       
      };

  return (
      <Box as="main" w={"98.5vw"} paddingLeft={"13%"} height={"200vh"} id='mainDiv'    bg={useColorModeValue('#000014', 'gray.800')} >
    <Container maxW="8xl" p={{ base: 5, md: 10 }}>
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
            spacing={6}
          >
            <Heading fontSize="2xl" color={"gray"} >Update User Details</Heading>
            <Text>User ID : {_id}</Text>
             <Image w={"30%"} src={Poster_Image} alt={"logo"} />
            <VStack spacing={4} w="100%">
            <FormControl id="Poster_Image">
                <FormLabel>Poster_Image</FormLabel>
                <Input rounded="md" type="text" value={Poster_Image} onChange={(e)=>setPoster_Image(e.target.value)} placeholder={"Enter your email"} />
              </FormControl>
            
              <FormControl id="Title">
                <FormLabel>Title</FormLabel>
                <Input rounded="md" type="text" value={Title} onChange={(e)=>setTitle(e.target.value)} placeholder={"Enter your email"} />
              </FormControl>

              <FormControl id="Runtime">
                <FormLabel>Runtime</FormLabel>
                <Input rounded="md" type="text" value={Runtime} onChange={(e)=>setRuntime(e.target.value)} placeholder={"Enter your email"} />
              </FormControl>
              <FormControl id="Description">
                <FormLabel>Description</FormLabel>
                <Input rounded="md" type="text" value={Description} onChange={(e)=>setDescription(e.target.value)} placeholder={"Enter your email"} />
              </FormControl>
            </VStack>
            <VStack w="100%">
              <Stack direction="row" justifyContent="space-between" w="100%">
              </Stack>
              <Button
                bg="blue.300"
                color="white"
                _hover={{
                  bg: 'blue.500'
                }}
                rounded="md"
                w="100%"
                onClick={handleEdit}
               
              >
                Update
              </Button>
            </VStack>
          </VStack>
        </Stack>
      </Center>
    </Container>
    </Box>
  )
}
