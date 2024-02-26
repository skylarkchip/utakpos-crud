import React from "react";
import {
  Button,
  Collapse,
  Flex,
  LinkBox,
  LinkOverlay,
  Text,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import Link from "next/link";
import { LuBox, LuHome, LuPlusCircle, LuSquareStack } from "react-icons/lu";
import { FaChevronDown, FaChevronUp } from "react-icons/fa6";

const SideNav = () => {
  const { isOpen, onToggle } = useDisclosure();
  return (
    <VStack spacing={8} w="full" h="full" align="left">
      <LinkBox
        color="blackAlpha.800"
        display="flex"
        gap="2"
        alignItems="center"
        px="4"
        py="2"
        _hover={{
          opacity: 0.6,
          backgroundColor: "gray.200",
          borderRadius: "lg",
        }}
      >
        <LuHome />
        <LinkOverlay as={Link} href="/">
          <Text fontSize="sm" fontWeight="500">
            Dashboard
          </Text>
        </LinkOverlay>
      </LinkBox>
      <VStack spacing="4" w="full" align="left">
        <Flex
          onClick={onToggle}
          cursor="pointer"
          justifyContent="space-between"
          alignItems="center"
          color="blackAlpha.800"
          px="4"
        >
          <Text fontSize="sm" fontWeight="500">
            Shop
          </Text>
          {isOpen ? <FaChevronUp /> : <FaChevronDown />}
        </Flex>
        <Collapse in={isOpen} animate>
          <VStack w="full" align="left" spacing="2">
            <LinkBox
              color="blackAlpha.800"
              display="flex"
              gap="2"
              alignItems="center"
              px="4"
              py="2"
              _hover={{
                opacity: 0.6,
                backgroundColor: "gray.200",
                borderRadius: "lg",
              }}
            >
              <LuBox />
              <LinkOverlay as={Link} href="/products">
                <Text fontSize="sm" fontWeight="500">
                  Products
                </Text>
              </LinkOverlay>
            </LinkBox>
            <LinkBox
              color="blackAlpha.800"
              display="flex"
              gap="2"
              alignItems="center"
              px="4"
              py="2"
              _hover={{
                opacity: 0.6,
                backgroundColor: "gray.200",
                borderRadius: "lg",
              }}
            >
              <LuSquareStack />
              <LinkOverlay as={Link} href="/categories">
                <Text fontSize="sm" fontWeight="500">
                  Categories
                </Text>
              </LinkOverlay>
            </LinkBox>
          </VStack>
        </Collapse>
      </VStack>
    </VStack>
  );
};

export default SideNav;
