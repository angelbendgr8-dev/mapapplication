import {
  Box,
  Flex,
  FlexProps,
  HStack,
  IconButton,
  Input,
  MenuDivider,
  MenuItem,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { FormEvent } from "react";
import { FiBell, FiMenu } from "react-icons/fi";
import Search from "../SearchComponent";

interface MobileProps extends FlexProps {
  onOpen: () => void;
  onFilter: (input: string) => void;
}

const MobileNav = ({ onFilter, onOpen, ...rest }: MobileProps) => {
  const handleChange = (e: FormEvent<HTMLInputElement>) => {
    onFilter(e.currentTarget.value);
  };
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

      <HStack spacing={{ base: "0", md: "6" }}>
        <IconButton
          size="lg"
          variant="ghost"
          aria-label="open menu"
          icon={<FiBell />}
        />
      </HStack>
    </Flex>
  );
};

export default MobileNav;
