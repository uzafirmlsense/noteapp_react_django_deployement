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

const Signup = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("hello");
  };
  let { loginUser } = useContext(AuthContext);
  return (
    <Flex width={"100%"} height={"100vh"}>
      <AbsoluteCenter>
        <Container minW={"300px"} justifyContent={"flex-end"}>
          <form onSubmit={handleSubmit}>
            <FormControl>
              <FormLabel
                display="flex"
                ms="4px"
                fontSize="sm"
                fontWeight="500"
                color={"black"}
                mb="8px"
              >
                Username<Text color={"black"}>*</Text>
              </FormLabel>
              <Input
                isRequired={true}
                variant="outline"
                fontSize="sm"
                ms={{ base: "0px", md: "0px" }}
                type="text"
                placeholder="Min. 8 characters"
                mb="24px"
                fontWeight="500"
                size="lg"
              />
              <FormLabel
                ms="4px"
                fontSize="sm"
                fontWeight="500"
                color={"black"}
                display="flex"
              >
                Password<Text color={"black"}>*</Text>
              </FormLabel>
              <InputGroup size="md">
                <Input
                  type="password"
                  isRequired={true}
                  fontSize="sm"
                  placeholder="Min. 8 characters"
                  mb="24px"
                  size="lg"
                  variant="outline"
                />
              </InputGroup>
              <FormLabel
                ms="4px"
                fontSize="sm"
                fontWeight="500"
                color={"black"}
                display="flex"
              >
                Confirm Password<Text color={"black"}>*</Text>
              </FormLabel>
              <InputGroup size="md">
                <Input
                  type="password"
                  isRequired={true}
                  fontSize="sm"
                  placeholder="Min. 8 characters"
                  mb="24px"
                  size="lg"
                  variant="outline"
                />
              </InputGroup>
              <Flex
                justifyContent="space-between"
                align="center"
                mb="24px"
              ></Flex>
              <Button
                // isLoading={loading}
                type="submit"
                fontSize="sm"
                colorScheme='teal'
                variant="solid"
                fontWeight="500"
                w="100%"
                h="50"
                mb="24px"
              >
                Sign Up
              </Button>
              {/* {error ? <font color="red">{error}</font> : <font></font>} */}
            </FormControl>
          </form>
        </Container>
        <Link to="/login">
          <Text color={"blue"} textDecoration={"underline"}>
            Log In
          </Text>
        </Link>
      </AbsoluteCenter>
    </Flex>
  );
};

export default Signup;
