"use client";
import Image from "next/image";
import styles from "./page.module.css";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  HStack,
  UnorderedList,
  ListItem,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Flex,
  Badge,
  Tr,
  Th,
  Tbody,
  Thead,
  Table,
  Td,
  Text,
  Select,
  IconButton,
  Stack,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  ButtonGroup,
} from "@chakra-ui/react";
import Pagination from "@choc-ui/paginator";
import { IAnnotation, IGroup, IGroupValue } from "@/interface/annotation";
import { FaFilePen } from "react-icons/fa6";
import { useEffect, useMemo, useState } from "react";
import React, { forwardRef } from "react";
import { FaFilter } from "react-icons/fa6";

export default function Home() {
  const [annotations, setAnnotations] = useState<IAnnotation[]>([]);
  const [annotationsMocks, setAnnotationsMocks] = useState<IAnnotation[]>([]);
  const [annotation, setAnnotation] = useState<IAnnotation>({
    id: "0",
    name: "",
    group: IGroup.GENERAL,
  });
  const [annotationsPage, setAnnotationsPage] = useState<IAnnotation[]>([]);
  const [page, setPage] = useState(1);
  const [annotationsPageVisibility, setAnnotationsPageVisibility] =
    useState(true);
  const [disableReturnButtonPage, setDisableReturnButtonPage] = useState(false);
  const [disableAdvanceButtonPage, setDisableAdvanceButtonPage] =
    useState(false);
  useState(true);
  const [pageCount, setPageCount] = useState<number[]>([]);
  const pageSize = 2;

  const pagination = () => {
    const offset = (page - 1) * pageSize;
    const eachAnnotationsPage = annotations.slice(offset, offset + pageSize);
    console.log(eachAnnotationsPage);
    return eachAnnotationsPage;
  };

  const totalPages = useMemo(() => {
    const pageNumber = Math.ceil(annotations.length / pageSize);
    const pageArray = Array.from({ length: pageNumber }, (v, i) => i + 1);
    setPageCount(pageArray);
  }, [annotationsPage]);

  useEffect(() => {
    fetch("https://6679ca0318a459f6395172e9.mockapi.io/annotations")
      .then((response) => response.json())
      .then((json) => {
        setAnnotationsMocks(json);
        setAnnotations(json);
      });
  }, []);

  useEffect(() => {
    setAnnotationsPage(pagination);
  }, [annotations, page]);

  function handleInputChange(e: any) {
    const { name, value } = e.target;
    const id = annotations.length + 1;
    setAnnotation((pv) => ({ ...pv, [name]: value, ["id"]: id.toString() }));
  }

  async function onSubmit(e: any) {
    e.preventDefault(0);
    annotations.push(annotation);
    setAnnotationsPage(pagination);
    setAnnotation({
      ["id"]: "0",
      ["name"]: "",
      ["group"]: IGroup.GENERAL,
    });
  }

  async function searchTask(e: any) {
    const { name, value } = e.target;
    setAnnotationsPageVisibility(false);
    const lowerCaseValue = value.toLowerCase();
    const regex = new RegExp(`${lowerCaseValue}`);
    const filterAnnotation = annotationsMocks.filter((e) =>
      e.name.toLowerCase().match(regex)
    );
    if (value) {
      return setAnnotations(filterAnnotation);
    } else if (value === "") {
      setAnnotationsPageVisibility(true);
    }
    return setAnnotations(annotationsMocks);
  }

  // COM USE MEMO
  // const returnPage = useMemo(() => {
  //   if (page === 1) {
  //     return setDisableReturnButtonPage(true);
  //   }
  //   setDisableAdvanceButtonPage(false);
  //   setDisableReturnButtonPage(false);
  //   return setPage(page - 1);
  // }, [page]);

  //SEM USE MEMO
  const returnPage = () => {
    if (page === 1) {
      return setDisableReturnButtonPage(true);
    }
    setDisableAdvanceButtonPage(false);
    setDisableReturnButtonPage(false);
    return setPage(page - 1);
  };

  const advancePage = () => {
    const lastPage = pageCount.length;
    if (page === lastPage) {
      return setDisableAdvanceButtonPage(true);
    }
    setDisableReturnButtonPage(false);
    setDisableAdvanceButtonPage(false);
    return setPage(page + 1);
  };

  const handleGroupFilter = async (index: any) => {
    setAnnotationsPageVisibility(false);
    const groupFilter = annotationsMocks.filter(function (e) {
      return e.group === index;
    });
    return setAnnotations(groupFilter);
  };

  return (
    <Flex
      w="100%"
      h={"100%"}
      my={"5rem"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Card w={"40%"}>
        <CardHeader>
          <FaFilePen size={"50px"} />
          <Heading textAlign={"center"} mb={"2rem"}>
            Bloco de Notas
          </Heading>
        </CardHeader>
        <CardBody>
          <form onSubmit={onSubmit}>
            <Stack spacing={"1.5rem"}>
              <FormControl isRequired>
                <FormLabel>Anotação: </FormLabel>
                <Input
                  placeholder="Digite uma anotação"
                  name={"name"}
                  onChange={(e: any) => handleInputChange(e)}
                  value={annotation.name}
                ></Input>
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Selecione o tipo da tarefa: </FormLabel>
                <Select
                  name={"group"}
                  onChange={(e: any) => {
                    handleInputChange(e);
                  }}
                  value={annotation.group}
                >
                  {Object.entries(IGroup).map(([key, value]) => (
                    <option key={key} value={value}>
                      {`${IGroupValue[value]}`}
                    </option>
                  ))}
                </Select>
              </FormControl>
              <Button type="submit" w={"min-content"}>
                Enviar
              </Button>
            </Stack>
          </form>
        </CardBody>
        <CardFooter display={"block"}>
          <Heading textAlign={"center"} mb={"2rem"}>
            Lista de Anotações
          </Heading>
          <Input
            type="search"
            name="name"
            onChange={(e) => searchTask(e)}
            placeholder="Pesquise a tarefa"
          ></Input>
          <Box mt={"1.5rem"}>
            <Table>
              <Thead>
                <Tr>
                  <Th>ID</Th>
                  <Th w={"10px"} h={"10px"}>
                    <HStack spacing={"0.5rem"}>
                      <Text>Tipo</Text>
                      <Menu>
                        <MenuButton
                          as={IconButton}
                          colorScheme="blue"
                          h={"25px"}
                          minW={"inherit"}
                          width={"25px"}
                          icon={<FaFilter size={"15px"} />}
                        ></MenuButton>
                        <MenuList>
                          {Object.entries(IGroup).map(([key, index]) => (
                            <MenuItem
                              key={key}
                              name="group"
                              onClick={(e) => {
                                handleGroupFilter(index);
                              }}
                            >
                              {IGroupValue[index]}
                            </MenuItem>
                          ))}
                        </MenuList>
                      </Menu>
                    </HStack>
                  </Th>
                  <Th>Tarefa</Th>
                </Tr>
              </Thead>
              <Tbody>
                {annotationsPageVisibility &&
                  annotationsPage.map((annotations) => (
                    <Tr key={annotations.id}>
                      <Td>{annotations.id}</Td>
                      <Td>
                        {" "}
                        <Badge>{IGroupValue[annotations.group]}</Badge>
                      </Td>
                      <Td>{annotations.name}</Td>
                    </Tr>
                  ))}
                {!annotationsPageVisibility &&
                  annotations.map((annotations) => (
                    <Tr key={annotations.id}>
                      <Td>{annotations.id}</Td>
                      <Td>
                        {" "}
                        <Badge>{IGroupValue[annotations.group]}</Badge>
                      </Td>
                      <Td>{annotations.name}</Td>
                    </Tr>
                  ))}
              </Tbody>
            </Table>
            <Flex
              w="full"
              p={50}
              alignItems="center"
              justifyContent="center"
              display={annotationsPageVisibility ? "flex" : "none"}
            >
              <ButtonGroup>
                <Button
                  onClick={() => returnPage()}
                  isDisabled={disableReturnButtonPage}
                >{`<`}</Button>
                {pageCount.map((pageCount) => (
                  <Button
                    key={pageCount}
                    onClick={() => {
                      setPage(pageCount);
                    }}
                  >
                    {pageCount}
                  </Button>
                ))}
                <Button
                  onClick={() => advancePage()}
                  isDisabled={disableAdvanceButtonPage}
                >{`>`}</Button>
              </ButtonGroup>
            </Flex>
          </Box>
        </CardFooter>
      </Card>
    </Flex>
  );
}
