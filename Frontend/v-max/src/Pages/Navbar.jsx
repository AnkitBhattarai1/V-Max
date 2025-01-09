import {
  Avatar,
  Box,
  Flex,
  Icon,
  Text,
  Image,
  Button,
  Heading,
  Stack,
  VStack,
  Drawer,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  DrawerContent,
  IconButton,
  useDisclosure,
  DrawerOverlay,
  useColorModeValue
} from '@chakra-ui/react';
// Here we have used react-icons package for the icons
import { AiOutlineTeam, AiOutlineHome } from 'react-icons/ai';
import { BsFolder2, BsCalendarCheck } from 'react-icons/bs';
import { FiMenu } from 'react-icons/fi';
import { FaRegCircleUser } from "react-icons/fa6"
  import { CiSearch } from "react-icons/ci"
  import { GoHomeFill } from "react-icons/go";
  import { LiaTvSolid } from "react-icons/lia"
  import { PiFilmSlateFill } from "react-icons/pi"
  import { BiSolidCategory } from "react-icons/bi"
  import {Link, useNavigate} from "react-router-dom"
  import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getMovies } from '../Redux/MovieReducer/Action'
import { MoviesCard } from '../Components/MoviesCard'
import "./Navbar.css"
import Logo from "../Imges/PLY.png"
import { FaUserCircle } from "react-icons/fa";
import { logout } from '../Redux/Auth/Action';
import { useToast } from '@chakra-ui/react'
import { LOGOUT_SUCCESS } from '../Redux/Auth/ActionTypes';

export default function Navbar() {
  const auth  = useSelector((store) => store.authReducer.isAuth)
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [data,setData]=useState([])
  const dispatch=useDispatch()
  const Movies=useSelector((store)=> store.productReducer.movies)
 
  const videoId = new URL("https://www.youtube.com/embed/tABlzTH8G9o?si=frgn1yoLc3W6RwJS").searchParams.get("v");

console.log(auth, "I AM AUTH")


  useEffect(()=>{
    dispatch(getMovies())
  },[])

  // console.log(Movies)

  return (
    <Box as="section" bg={useColorModeValue('#000014', 'gray.700')}  w={"100%"}    >
      <SidebarContent display={{ base: 'none', md: 'unset' }}    />
      <Drawer isOpen={isOpen} onClose={onClose} placement="left">
        <DrawerOverlay />
        <DrawerContent>
          <SidebarContent w="full" borderRight="none"    />
        </DrawerContent>
      </Drawer>
      <Box ml={{ base: 0, md: 'auto' }} transition=".3s ease" background={"#000014"}   >
         {/* <Flex> */}
         <IconButton
            aria-label="Menu"
            display={{ base: 'inline-flex', md: 'none' }}
            onClick={onOpen}
            icon={<FiMenu />}
            color={"white"}
            size="md"
            mr={"20px"}
            bg={"black"}
            
          />
          {/* <img  width="10%" src={Logo} alt="" /> */}
         {/* </Flex> */}
      </Box>
    </Box>
  );
}


const SidebarContent = ({ ...props }) => {
  const auth = useSelector((store) => store.authReducer.isAuth);
  // const token = useSelector((store) => store.authReducer.token);
  const User = useSelector((store) => store.authReducer.users);
  const toast = useToast()
  const dispatch=useDispatch()
  const navigate=useNavigate()

 const handleLogout = () => {
  
    dispatch(logout())
        .then(() => {
            toast({
                position: 'top',
                isClosable: true,
                duration: 500,
                status: "success",
                render: () => (
                    <Box color='white' p={3} bg='blue.500'>
                        Logout successfully! 😊 
                    </Box>
                ),
            });
            
        })
        setTimeout(()=>{
          navigate(window.location.reload());
        },1000)
       
};



  return (
    <Box
      as="nav"
      pos="fixed"
      top="0"
      left="0"
      zIndex="sticky"
      h="full"
      overflowX="hidden"
      overflowY="auto"
      
      bg={useColorModeValue('#000014', 'gray.800')}
      borderColor={useColorModeValue('inherit', 'gray.700')}
      borderRightWidth="1px solid gray"
      w="13%"
      // border={"2px solid red"}
      
      {...props}
    >
      <VStack  h="full"  alignItems="flex-start" justifyContent="space-between"      >
        <Box w="full" id='navbox' >
          <Flex px="4" py="5" align="center">
            <Text
              fontSize="2xl"
              ml="2"
             
              color={useColorModeValue('brand.500', 'black')}
              fontWeight="semibold"
            >
              <Link to="/">
                <Image
                  alt="Homepage Image"
                  objectFit="cover"
                  width="80px"
                  mt={"40%"}
                  src={Logo}
                />
              </Link>
            </Text>
          </Flex>
          <Flex
            direction="column"
            as="nav"
           
            mt={"20px"}
            fontSize="md"
            color="gray.600"
            aria-label="Main Navigation"
            box-shadow='rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;'
          >
            <Link to="/Private">
              <NavItem icon={FaRegCircleUser}>My Space</NavItem>
            </Link>
            <Link to="/explore">
              <NavItem icon={CiSearch}>Search</NavItem>
            </Link>
            <Link to="/"  >
              <NavItem  icon={GoHomeFill}>Home</NavItem>
            </Link>
            <Link to="/shows">
              <NavItem icon={LiaTvSolid}>TV</NavItem>
            </Link>
            <Link to="/movies">
              <NavItem icon={PiFilmSlateFill}>Movies</NavItem>
            </Link>
            <Link to="/categories">
              <NavItem icon={BiSolidCategory}>Categories</NavItem>
            </Link>
          </Flex>
        </Box>

        <Flex px="4" py="5" mt={10} justifyContent="center" alignItems="center"   >
          <Menu>
            <MenuButton
              as={Button}
              size={'sm'}
              border={"2px solid blue"}
              rounded={'full'}
              variant={'link'}
              cursor={'pointer'}
             
              _hover={{ bg: useColorModeValue('#000018', 'gray.900'), color: useColorModeValue('#000014', 'white.200'), textDecoration: 'none' }}
            >
             {auth ? <Avatar
                size={'sm'}
                name="User"
                src="https://avatars2.githubusercontent.com/u/37842853?v=4"
              /> : <FaUserCircle  size={'30px'} />  
             }
            </MenuButton>
            <MenuList fontSize={15} zIndex={5555} background='transparent'>
              
              {auth  ? <MenuItem background='transparent' color="white" onClick={handleLogout} >Logout</MenuItem>  :
                <Box>
                  <MenuItem as={Link} to="/Login" background='transparent' color="white" >
                    Login
                  </MenuItem>
                  <MenuItem as={Link} to="/SignUp" background='transparent' color="white" >
                    SignUp
                  </MenuItem>
                </Box>
              }
            </MenuList>
          </Menu>
        </Flex>
      </VStack>
    </Box>
  );
};

const NavItem = (props) => {
  const color = useColorModeValue('#000014', 'gray.300');

  const { icon, children } = props;
  return (
    <Flex
      align="center"
      px="4"
      py="3"
      cursor="pointer"
      role="group"
      // border="1px solid pink"
      fontWeight="semibold"
      transition=".15s ease"
      color={useColorModeValue('inherit', 'gray.400')}
      _hover={{
        bg: useColorModeValue('#11112b', 'gray.900'),
        color: useColorModeValue('white', 'white.200')
      }}
    >
      {icon && (
        <Icon
          mx="2"
          boxSize="4"
          _groupHover={{
            color: color
          }}
          as={icon}
        />
      )}
      <Box className="hidden-text">{children}</Box>
    </Flex>
  );
};