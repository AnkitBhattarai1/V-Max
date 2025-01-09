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
  import { MdSportsVolleyball } from "react-icons/md"
  import { BiSolidCategory } from "react-icons/bi"
  import {Link} from "react-router-dom"
  import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getMovies } from '../Redux/MovieReducer/Action'
import { MoviesCard } from '../Components/MoviesCard'
import "./Navbar.css"


export default function Navbar2() {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [data,setData]=useState([])
  const dispatch=useDispatch()
  const Movies=useSelector((store)=> store.productReducer.movies)
  
  const videoId = new URL("https://www.youtube.com/embed/tABlzTH8G9o?si=frgn1yoLc3W6RwJS").searchParams.get("v");

console.log(videoId)


  useEffect(()=>{
    dispatch(getMovies())
  },[])

  console.log(Movies)

  return (
    <Box as="section" bg={useColorModeValue('gray.50', 'gray.700')} minH="100vh"  w={"100vw"}>
      <SidebarContent display={{ base: 'none', md: 'unset' }} />
      <Drawer isOpen={isOpen} onClose={onClose} placement="left">
        <DrawerOverlay />
        <DrawerContent>
          <SidebarContent w="full" borderRight="none" />
        </DrawerContent>
      </Drawer>
      <Box ml={{ base: 0, md: 60 }} transition=".3s ease">
          <IconButton
            aria-label="Menu"
            display={{ base: 'inline-flex', md: 'none' }}
            onClick={onOpen}
            icon={<FiMenu />}
            color={"white"}
            size="md"
            bg={"rgba(66, 153, 225, 0.6)"}
          />

         

        <Box as="main" p={14} minH="auto"  bg={useColorModeValue('black', 'gray.800')}  className='Movies'>
        {
        Movies.length>0 && Movies.map((e)=>{
          return <MoviesCard  key={e.id} {...e}/>
        }  )
      }

         {/* //Cards Render */}
        </Box>
      </Box>
    </Box>
  );
}

const SidebarContent = ({ ...props }) => (
  <Box
    as="nav"
    pos="fixed"
    top="0"
    left="0"
    zIndex="sticky"
    h="full"
    // pb="10"
    overflowX="hidden"
    overflowY="auto"
    bg={useColorModeValue('black', 'gray.800')}
    borderColor={useColorModeValue('inherit', 'gray.700')}
    borderRightWidth="1px solid gray"
    w="60"
    {...props}
  >
    <VStack h="full"  alignItems="flex-start" justifyContent="space-between"  >
      <Box w="full">
        <Flex px="4" py="5" align="center">
          {/* <Icon as={RiFlashlightFill} h={8} w={8} /> */}
          <Text
            fontSize="2xl"
            ml="2"
            color={useColorModeValue('brand.500', 'black')}
            fontWeight="semibold"
          >
            <Image
                alt="Homepage Image"
                objectFit="cover"
                width="60px"
                src="https://img.hotstar.com/image/upload/v1656431456/web-images/logo-d-plus.svg"
              />
          </Text>
        </Flex>
        <Flex
          direction="column"
          as="nav"
          fontSize="md"
          color="gray.600"
          aria-label="Main Navigation"
          box-shadow ='rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;'
        >
          <Link to="/Login">
        <NavItem  icon={FaRegCircleUser}>My Space</NavItem>
        </Link>
        <Link to="/explore">
        <NavItem  icon={CiSearch}>Search</NavItem>
        </Link>
        <Link to="/">
        <NavItem  icon={GoHomeFill}>Home</NavItem>
        </Link>
        <Link to="/shows">
        <NavItem  icon={LiaTvSolid}>TV</NavItem>
        </Link>
        <Link to="/movies">
        <NavItem  icon={PiFilmSlateFill}>Movies</NavItem>
        </Link>
        <Link to="/">
        <NavItem  icon={MdSportsVolleyball}>Sports</NavItem>
        </Link>
        <Link to="/categories">
        <NavItem  icon={BiSolidCategory}>Categories</NavItem>
        </Link>
        </Flex>
      </Box>

      <Flex px="4" py="5" mt={10} justifyContent="center" alignItems="center">
        <Menu>
          <MenuButton
            as={Button}
            size={'sm'}
            rounded={'full'}
            variant={'link'}
            cursor={'pointer'}
            _hover={{ textDecoration: 'none' }}
          >
            <Avatar
              size={'sm'}
              name="User"
              src="https://avatars2.githubusercontent.com/u/37842853?v="
            />
          </MenuButton>
          <MenuList fontSize={17} zIndex={5555}>
            <MenuItem as={Link} to="/Login">
              Login
            </MenuItem>
            <MenuItem as={Link} to="#">
              SignUp
            </MenuItem>
            <MenuItem>Logout</MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </VStack>
  </Box>
);

const NavItem = (props) => {
  const color = useColorModeValue('gray.600', 'gray.300');

  const { icon, children } = props;
  return (
    <Flex
      align="center"
      px="4"
      py="3"
      cursor="pointer"
      role="group"
      fontWeight="semibold"
      transition=".15s ease"
      color={useColorModeValue('inherit', 'gray.400')}
      _hover={{
        bg: useColorModeValue('gray.100', 'gray.900'),
        color: useColorModeValue('black', 'white.200')
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