import React, {  useEffect, useState } from "react";
import {
 
  Box,
  CloseButton,
  Flex,
  
  useColorModeValue,
  
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  BoxProps,
  
} from "@chakra-ui/react";

import MobileNav from "./MobileNav";
import NavItem from "./NavItem";
import data from "../../cities.json";
import _ from "lodash";
import Search from "../SearchComponent";
import Maps from "../Maps";

export interface CityItemProps {
  name: string;
  country: string;
  lat: string;
  lng: string;
}
// const LinkItems: Array<CityItemProps> = [
//   { name: 'Home', icon: FiHome },
//   { name: 'Trending', icon: FiTrendingUp },
//   { name: 'Explore', icon: FiCompass },
//   { name: 'Favourites', icon: FiStar },
//   { name: 'Settings', icon: FiSettings },
// ];

export default function Main() {
  const [cities, setCities] = useState(Array<CityItemProps>);
  const [filtered, setFiltered] = useState(Array<CityItemProps>);
  
  const [selectedCity, setSelectedCity] = useState<CityItemProps>()
  useEffect(() => {
    const temp = _.sortBy(data, () => Math.random() - Math.random()).slice(
      0,
      20
    );
    setCities(temp);
    setFiltered(temp)
  }, []);

  
  const filter = (input: string) => {
    console.log(input);
    const string = new RegExp(input,'g');
    console.log(string);
    if (_.isEmpty(input)) {
      setFiltered(cities);
    } else {
      const newCities = _.filter(cities, (item) => string.test(item.name));
      console.log(newCities);
      setFiltered(newCities);
    }
  };
  
  const selectCity = (item: CityItemProps) => {
    setSelectedCity(item)
  }
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
      <SidebarContent
        onFilter={filter}
        selectCity={selectCity}
        cities={filtered}
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent
            selectCity={selectCity}
            onFilter={filter}
            cities={filtered}
            onClose={onClose}
          />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav onFilter={filter} onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        <Maps  item={selectedCity}/>
      </Box>
    </Box>
  );
}

interface SidebarProps extends BoxProps {
  onClose: () => void;
  cities: Array<CityItemProps>;
  onFilter: (input: string) => void;
  selectCity: (item: CityItemProps) => void;
}

const SidebarContent = ({selectCity,onFilter, cities, onClose, ...rest }: SidebarProps) => {

  const select = (item: CityItemProps) => {
    selectCity(item);
  }
  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          MapApplication
        </Text>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      <Flex direction={"column"} h="full" overflowY={"scroll"}>
        <Box mx={'5'}>
        <Box display={{ base: "flex", md: "none" }}>

          <Search onFilter={onFilter} />
        </Box>
        </Box>
        {
          _.isEmpty(cities)?(
            <Box px='auto' justifyContent={'center'} alignItems={'center'}>
              <Text alignSelf={'center'} mx='auto'>No tiem found</Text>
            </Box>
          ):(
            <Box>
            {cities.map((city) => (
              <NavItem onClick={()=> {onClose(); select(city)}} item={city} key={city.name}>{city.name}</NavItem>
            ))}
            </Box>
          )
        }
        
      </Flex>
    </Box>
  );
};
