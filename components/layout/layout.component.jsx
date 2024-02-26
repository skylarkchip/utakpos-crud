import React from "react";
import { Box, Container, Flex, Stack, Text } from "@chakra-ui/react";
import SideNav from "../ui/sidenav/sidenav.component";
import Header from "./header.component";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <Box as="main">
        <Flex w="full" minHeight="100vh">
          <Box
            minH="100vh"
            position="fixed"
            top="0"
            left="0"
            backgroundColor="blackAlpha.50"
            w="20%"
            mt="15"
            py="12"
            display={{ base: "none", md: "block" }}
          >
            <Box h="100%" w="100%" py="16" px="4">
              <SideNav />
            </Box>
          </Box>
          <Box
            backgroundColor="blackAlpha.50"
            ml="auto"
            w={{ base: "full", md: "80%" }}
            mt="16"
            py="16"
            px="4"
          >
            <Container maxW="8xl" mx="auto">
              {children}
            </Container>
          </Box>
        </Flex>
      </Box>
    </>
  );
};

export default Layout;
