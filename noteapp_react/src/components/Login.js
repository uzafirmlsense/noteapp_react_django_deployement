import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { GoogleLogin } from "react-google-login";
import { backendRoot } from "../backendinfo";
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
import { Outlet, Navigate } from "react-router-dom";

<Navigate to="/login" />;

const Login = () => {
  let { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const google = window.google;
  const client_id =
    "59866668171-ovrvhrn6jtcr3g9kklfrev82okl960f0.apps.googleusercontent.com";

  useEffect(() => {
    console.log("hello");
    if (user) {
      navigate("/");
    }
  });

  const google_login_success = async (res) => {
    let response = await fetch(`${backendRoot}verifyexists/`, {
      method: "POST",
      headers: {
        'Content-Type' : 'application/json',
        'Accept' : 'application/json',
      },
      body: JSON.stringify({ email: res.profileObj.email }),
    });
    let data = await response.json();
    if (data.status == true) {
      console.log(data.username)
      const username = data.username;
      const password = "JFek54}T@p0$#Q";
      const fakeEvent = {
        preventDefault: function () {},
        target: {
          username: { value: username },
          password: { value: password },
        },
      };
      loginUser(fakeEvent);
    }
    console.log("Login Success! Current user: ", res.profileObj);
    console.log("Login Success! Current user: ", res.profileObj.email);
  };

  const google_login_failure = (res) => {
    console.log("Login Failed! res: ", res);
  };

  // function handleCallbackResponse(response) {
  //   console.log("Encoded JWT ID token: " + response.credential);
  // }

  // useEffect(() => {
  //   google.accounts.id.initialize({
  //     client_id:
  //       "59866668171-ovrvhrn6jtcr3g9kklfrev82okl960f0.apps.googleusercontent.com",
  //     callback: handleCallbackResponse,
  //   });

  //   google.accounts.id.renderButton(document.getElementById("signInDiv"), {
  //     theme: "outline",
  //     size: "large",
  //   });
  // }, []);

  let { loginUser } = useContext(AuthContext);
  return (
    <Flex width={"100%"} height={"100vh"}>
      <AbsoluteCenter>
        <Container minW={"300px"} justifyContent={"flex-end"}>
          <form onSubmit={loginUser}>
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
                name="username"
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
                  isRequired={true}
                  fontSize="sm"
                  placeholder="Min. 8 characters"
                  mb="24px"
                  type="password"
                  size="lg"
                  name="password"
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
                colorScheme="teal"
                variant="solid"
                fontWeight="500"
                w="100%"
                h="50"
                mb="24px"
              >
                Log In
              </Button>

              <div id="signInDiv">
                <GoogleLogin
                  clientId={client_id}
                  buttonText="Login with google"
                  onSuccess={google_login_success}
                  onFailure={google_login_failure}
                  cookiePolicy={"single_host_origin"}
                  isSignedIn={true}
                />
              </div>
              {/* {error ? <font color="red">{error}</font> : <font></font>} */}
            </FormControl>
          </form>
        </Container>
        <Link to="/signup">
          <Text color={"blue"} textDecoration={"underline"}>
            Sign up
          </Text>
        </Link>
        {user && navigate("/")}
      </AbsoluteCenter>
    </Flex>
  );
};

export default Login;
