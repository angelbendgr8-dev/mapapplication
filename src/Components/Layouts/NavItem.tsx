import React, { ReactText } from "react";
import { Flex, Link,Icon, FlexProps } from "@chakra-ui/react";

import { IconType } from 'react-icons';
import { CityItemProps } from "./Main";

interface NavItemProps extends FlexProps {
    children: ReactText;
    item: CityItemProps,
}
  const select = () => {
    console.log()
  }
  const NavItem = ({ item, children, ...rest }: NavItemProps) => {
    return (
      <Link href="#" style={{ textDecoration: 'none' }} _focus={{ boxShadow: 'none' }}>
        <Flex
          align="center"
          p="4"
          mx="4"
          borderRadius="lg"
          role="group"
          cursor="pointer"
          _hover={{
            bg: 'cyan.400',
            color: 'white',
          }}
          {...rest}>
          
          {children}
        </Flex>
      </Link>
    );
  };
  export default NavItem;
  
