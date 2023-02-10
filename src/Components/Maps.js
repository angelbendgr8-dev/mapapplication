import { Box, Flex, IconButton, Text, useDisclosure } from "@chakra-ui/react";
import React, { useCallback, useEffect, useRef, useState } from "react";

import mapboxgl, { Map } from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import _ from "lodash";
import moment from "moment";
import { BsFillInfoCircleFill } from "react-icons/bs";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";

mapboxgl.accessToken =
  "pk.eyJ1IjoiYW5nZWxiZW5kZ3I4IiwiYSI6ImNsZHg4cXFudjBldngzcnBranFremQ3NXUifQ.ufbJt9MFsJSp1jt6-w6kbQ";
// interface SelectedItemProps {
//     item: CityItemProps | {};
// }

function InitialFocus({ open, onClose, weather, name }) {
  // const { isOpen, onOpen, onClose } = useDisclosure();
  console.log(weather);
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  return (
    <>
      {/* <Button onClick={onOpen}>Open Modal</Button>
      <Button ml={4} ref={finalRef}>
        I'll receive focus on close
      </Button> */}

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={open}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{name} weather</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Flex
              flexDirection={"column"}
              justifyItems="center"
              alignItems="center"
            >
              <Box borderRadius={5} bg="aliceblue" m="4" p="5">
               
                <TableContainer>
                  <Table variant="simple">
                    <TableCaption>
                      Today
                    </TableCaption>
                    <Thead>
                      <Tr>
                        <Th>title</Th>
                        <Th>value</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      <Tr>
                        <Td>inches</Td>
                        
                        <Td isNumeric>25.4</Td>
                      </Tr>
                      <Tr>
                        <Td>feet</Td>
                       
                        <Td isNumeric>30.48</Td>
                      </Tr>
                     
                    </Tbody>
                    
                  </Table>
                </TableContainer>
              </Box>
              <Box borderRadius={5} bg='darkcyan' m="4" p="5">
              <TableContainer>
                  <Table variant="simple">
                    <TableCaption>
                      Tomorrow
                    </TableCaption>
                    <Thead>
                      <Tr>
                        <Th>title</Th>
                        <Th>value</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      <Tr>
                        <Td>inches</Td>
                        
                        <Td isNumeric>25.4</Td>
                      </Tr>
                      <Tr>
                        <Td>feet</Td>
                       
                        <Td isNumeric>30.48</Td>
                      </Tr>
                     
                    </Tbody>
                    
                  </Table>
                </TableContainer>
              </Box>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
export default function Maps({ item }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const mapContainer = useRef();
  const map = useRef();
  const [lng, setLng] = useState(3.406448);
  const [lat, setLat] = useState(6.465422);
  const [zoom, setZoom] = useState(9);
  const [weatherData, setweatherData] = useState({});

  useEffect(() => {
    // if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map(
      {
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v12",
        center: [lng, lat],

        zoom: zoom,
      },
      [lng, lat]
    );
    // console.log(mapContainer.current)
  });
  const getWeather = useCallback(async (latitude, longitude) => {
    const time = moment();
    const today = time.format("yyyy-M-d");
    const tomorrow = time.add(1, "day").format("yyyy-M-d");
    console.log(tomorrow);
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${latitude},${longitude}/${today}/${tomorrow}?key=6GWRA4LXKXNSZ7LZKKLL9C8MF`;
    fetch(url)
      .then((res) => res.json())
      .then((json) => {
        // const { days } = json;
        console.log(json);
        // setweatherData(days);
      })
      .catch((err) => console.error("error:" + err));
  }, []);

  useEffect(() => {
    if (item) {
      setLng(item.lng);
      setLat(item.lat);
      getWeather(item.lat, item.lng);
    }
  }, [item]);

  return (
    <Box>
      <InitialFocus
        open={isOpen}
        onClose={onClose}
        weather={weatherData}
        name={item?.name}
      />
      {_.isEmpty(item) ? (
        <Box>
          {/* <Button onClick={onOpen} colorScheme="blue">
            <IconButton
              size="lg"
              variant="ghost"
              aria-label="open menu"
              icon={<BsFillInfoCircleFill />}
            />
          </Button> */}

          <Box ref={mapContainer} height={"600"} />
        </Box>
      ) : (
        <Box flexDirection={"column"}>
          <IconButton
            onClick={onOpen}
            size="md"
            variant="ghost"
            aria-label="open menu"
            icon={<BsFillInfoCircleFill />}
          />

          <Box ref={mapContainer} height={"600"} />
        </Box>
      )}
    </Box>
  );
}
