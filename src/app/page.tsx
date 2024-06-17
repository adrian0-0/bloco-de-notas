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
  Select,
} from "@chakra-ui/react";
import { annotationsMock } from "@data/annotations";
import { IAnnotation, IGroup, IGroupValue } from "@/interface/annotation";
import { FaFilePen } from "react-icons/fa6";
import { useEffect, useState } from "react";

export default function Home() {
  const [annotations, setAnnotations] = useState<IAnnotation[]>([]);
  const [annotation, setAnnotation] = useState<IAnnotation>({
    id: 0,
    name: "",
    group: IGroup.GENERAL,
  });

  useEffect(() => {
    const annotationsMap = () => {
      annotationsMock.map((annotationsMock) => ({
        [annotationsMock.id]: annotationsMock.group,
      }));
      return annotationsMock;
    };
    console.log(annotationsMap());
    setAnnotations(annotationsMap());
  }, []);

  function handleInputChange(e: any) {
    const { name, value } = e.target;
    const id = parseInt(name);
    console.log(annotations);
    setAnnotation((pv) => ({ ...pv, ["id"]: id, ["name"]: value }));
  }

  async function onSubmit(e: any) {
    e.preventDefault(0);
    annotationsMock.push(annotation);
    setAnnotation((pv) => ({ ...pv, ["id"]: 0, ["name"]: "" }));
  }

  return (
    <Flex
      w="100%"
      h={"100%"}
      mt={"5rem"}
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
                  name={`${annotations.length + 1}`}
                  onChange={(e: any) => handleInputChange(e)}
                  value={annotation.name}
                ></Input>
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Selecione o tipo da tarefa: </FormLabel>
                <Select
                  name={annotation.group}
                  onChange={(e: any) => handleInputChange(e)}
                  // value={annotations}
                >
                  {annotations.map((annotations) => (
                    <option key={annotations.id}>{`${
                      IGroupValue[annotations.group]
                    }`}</option>
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
          <Box>
            <Table>
              <Thead>
                <Tr>
                  <Th>ID</Th>
                  <Th>Tipo</Th>
                  <Th>Tarefa</Th>
                </Tr>
              </Thead>
              <Tbody>
                {annotations.map((annotations) => (
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
          </Box>
        </CardFooter>
      </Card>
    </Flex>
  );
}
