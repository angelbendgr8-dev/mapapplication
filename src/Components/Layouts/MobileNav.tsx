import {
  Box,
  Flex,
  FlexProps,
 
  IconButton,
  
  useColorModeValue,
} from "@chakra-ui/react";
import {  FiMenu } from "react-icons/fi";
import Search from "../SearchComponent";

interface MobileProps extends FlexProps {
  onOpen: () => void;
  onFilter: (input: string) => void;
}

const MobileNav = ({ onFilter, onOpen, ...rest }: MobileProps) => {
 
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      overflowY={"auto"}
      bg={useColorModeValue("white", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent={{ base: "space-between", md: "flex-end" }}
      {...rest}
    >
      <IconButton
        display={{ base: "flex", md: "none" }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />
      <Box
        display={{ base: "none", md: "flex" }}
        marginRight={"auto"}
        width={"40%"}
      >
        <Search onFilter={onFilter} />
      </Box>

      
    </Flex>
  );
};

export default MobileNav;
