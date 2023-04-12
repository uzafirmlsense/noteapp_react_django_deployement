import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
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
  Textarea,
  IconButton,
} from "@chakra-ui/react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
} from "@chakra-ui/react";
import TextareaAutosize from "react-textarea-autosize";
import { DeleteIcon, AddIcon } from "@chakra-ui/icons";
import {backendRoot} from "../backendinfo";

const Home = () => {
  let [notes, setNotes] = useState([]);
  let { authTokens } = useContext(AuthContext);

  useEffect(() => {
    getNotes();
  }, []);
  console.log("hello");
  let updatenote = async (id, type, txt) => {
    let response = await fetch(`${backendRoot}update/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + String(authTokens.access),
      },
      body: JSON.stringify({
        id: id,
        type: type,
        txt: txt,
      }),
    });
    let data = await response.json();
    if (data.status == true) {
      getNotes();
    }
  };

  let addnote = async () => {
    let response = await fetch(`${backendRoot}add/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + String(authTokens.access),
      },
    });
    let data = await response.json();
    if (data.status == true) {
      getNotes();
    }
  };

  let deletenote = async (id) => {
    let response = await fetch(`${backendRoot}delete/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + String(authTokens.access),
      },
      body: JSON.stringify({ id: id }),
    });
    let data = await response.json();
    if (data.status == true) {
      getNotes();
    }
  };

  let getNotes = async () => {
    let response = await fetch(`${backendRoot}allnotes/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + String(authTokens.access),
      },
    });
    let data = await response.json();
    setNotes(data);
  };

  return (
    <div>
      <Flex
        minW={"100vw"}
        justifyContent={"center"}
        alignItems={"center"}
        flexDirection={"column"}
        paddingTop={"50px"}
      >
        <Flex mb="40px" minW={"500px"} flexDirection={"row"}>
          <Spacer />
          <Button
            rightIcon={<AddIcon />}
            colorScheme="teal"
            variant="solid"
            size="sm"
            onClick={() => addnote()}
          >
            Add Note
          </Button>
        </Flex>
        {notes.map((note) => {
          return (
            <>
              <Flex
                mb="50px"
                key={note.id}
                minW={"500px"}
                flexDirection={"column"}
              >
                <Input
                  key={note.id}
                  isRequired={true}
                  variant="unstyled"
                  padding={"5px"}
                  fontSize="lg"
                  ms={{ base: "0px", md: "0px" }}
                  type="text"
                  placeholder="Title"
                  fontWeight="500"
                  onChange={(e) => updatenote(note.id, "title", e.target.value)}
                  border="0px solid white"
                  defaultValue={note.title}
                />
                <hr
                  style={{
                    border: "0.5px solid #Dedede",
                    marginBottom: "10px",
                  }}
                ></hr>
                <TextareaAutosize
                  onChange={(e) => updatenote(note.id, "body", e.target.value)}
                  key={note.id}
                  spellCheck="false"
                  placeholder="Body"
                  style={{
                    border: "0px solid black",
                    resize: "none",
                    padding: "5px",
                    marginBottom: "10px",
                    outline: "none",
                  }}
                  type="text"
                  defaultValue={note.body}
                />
                <Flex flexDirection={"row"}>
                  <Spacer />
                  <IconButton
                    colorScheme="red"
                    aria-label="Search database"
                    icon={<DeleteIcon />}
                    size="sm"
                    onClick={() => deletenote(note.id)}
                  />
                </Flex>
                <hr
                  style={{ border: "0.5px solid #008080", marginTop: "10px" }}
                ></hr>
              </Flex>
            </>
          );
        })}
      </Flex>
    </div>
  );
};

export default Home;
