import React, { useContext } from "react";
import { Link } from "react-router-dom";
import {
  Flex,
  Spacer,
  Button,
  Center,
  AbsoluteCenter,
  Text,
  Box,
  InputGroup,
  InputLeftElement,
  Container,
  Input,
  InputRightElement,
} from "@chakra-ui/react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
} from "@chakra-ui/react";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  let { user, logoutUser } = useContext(AuthContext);
  return (
    <div>
      {user && (
        <Flex height={"70px"} alignItems={"center"} backgroundColor={"teal"} as="nav" p="5px">
          <Text paddingLeft={"10px"} fontSize={"24px"} color={"white"} as="h1">{user.username}'s notes</Text>
          <Spacer/>
            <Button
            onClick={logoutUser}
            _hover={{backgroundColor:"#319795"}}
              // isLoading={loading}
              type="submit"
              fontSize="sm"
              colorScheme="teal"
              variant="solid"
              fontWeight="500"
              w="100px"
              h="40px"
              // mb="24px"
            >
              Log Out
            </Button>
        </Flex>
      )}
    </div>
  );
};

export default Navbar;
