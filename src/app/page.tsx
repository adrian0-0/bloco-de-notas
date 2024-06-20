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
  Stack,
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
} from "@chakra-ui/react";
import Pagination from "@choc-ui/paginator";
import { annotationsMock } from "@data/annotations";
import { IAnnotation, IGroup, IGroupValue } from "@/interface/annotation";
import { FaFilePen } from "react-icons/fa6";
import { useEffect, useState } from "react";
import React, { forwardRef } from "react";

export default function Home() {
  const [annotations, setAnnotations] = useState<IAnnotation[]>([]);
  const [annotation, setAnnotation] = useState<IAnnotation>({
    id: 0,
    name: "",
    group: IGroup.GENERAL,
  });
  const [annotationsPage, setAnnotationsPage] = useState<IAnnotation[]>([]);
  const [current, setCurrent] = useState(1);
  const [annotationsPageVisibility, setAnnotationsPageVisibility] =
    useState(true);
  const pageSize = 2;
  const offset = (current - 1) * pageSize;

  useEffect(() => {
    setAnnotations(annotationsMock);
  }, []);

  useEffect(() => {
    const eachAnnotationsPage = annotationsMock.slice(
      offset,
      offset + pageSize
    );
    setAnnotationsPage(eachAnnotationsPage);
    setAnnotationsPageVisibility(true);
  }, [current]);

  function handleInputChange(e: any) {
    const { name, value } = e.target;
    const id = annotations.length + 1;
    setAnnotation((pv) => ({ ...pv, [name]: value, ["id"]: id }));
  }

  async function onSubmit(e: any) {
    e.preventDefault(0);
    annotations.push(annotation);
    setAnnotation((pv) => ({
      ...pv,
      ["id"]: 0,
      ["name"]: "",
      ["group"]: IGroup.GENERAL,
    }));
  }

  async function searchTask(e: any) {
    const { name, value } = e.target;
    setAnnotationsPageVisibility(false);
    const lowerCaseValue = value.toLowerCase();
    const regex = new RegExp(`${lowerCaseValue}`);
    const filterAnnotation = annotations.filter((e) =>
      e.name.toLowerCase().match(regex)
    );
    if (value) {
      return setAnnotations(filterAnnotation);
    } else if (value === "") {
      setAnnotationsPageVisibility(true);
    }
    return setAnnotations(annotationsMock);
  }

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
                  onChange={(e: any) => handleInputChange(e)}
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
                  <Th>Tipo</Th>
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
              <Pagination
                defaultCurrent={1}
                colorScheme="blue"
                pageSize={pageSize}
                total={annotations.length}
                onChange={(e: any) => {
                  setCurrent(e);
                }}
                paginationProps={{
                  display: "flex",
                }}
              />
            </Flex>
          </Box>
        </CardFooter>
      </Card>
    </Flex>
  );
}
