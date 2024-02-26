import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Flex,
  HStack,
  Heading,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  VStack,
} from "@chakra-ui/react";
import Link from "next/link";
import { FaChevronRight } from "react-icons/fa6";
import Layout from "@/components/layout/layout.component";
import { LuEye, LuFileEdit, LuTrash } from "react-icons/lu";
import CategoryModal from "@/components/ui/modal/category-modal.component";

function CategoriesPage() {
  return (
    <Layout>
      <VStack w="full" align="left" spacing="6">
        <Breadcrumb separator={<FaChevronRight color="gray" fontSize="12" />}>
          <BreadcrumbItem>
            <BreadcrumbLink
              as={Link}
              href="#"
              _hover={{ textDecoration: "none" }}
              fontSize="sm"
            >
              Products
            </BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink href="#" fontSize="sm">
              Category List
            </BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
        <Flex justifyContent="space-between" alignItems="center">
          <Heading as="h1" fontSize="3xl">
            Categories
          </Heading>
          <CategoryModal />
        </Flex>
        <TableContainer
          w="full"
          borderWidth="1px"
          borderColor="blackAlpha.300"
          borderRadius="lg"
        >
          <Table variant="simple" size="md">
            <Thead
              backgroundColor="gray.50"
              borderBottomWidth="1px"
              borderBottomColor="red.900"
            >
              <Tr>
                <Th
                  fontWeight="500"
                  textTransform="capitalize"
                  fontSize="sm"
                  letterSpacing="0"
                  color="blackAlpha.900"
                >
                  Name
                </Th>
                <Th
                  fontWeight="500"
                  textTransform="capitalize"
                  fontSize="sm"
                  letterSpacing="0"
                  color="blackAlpha.900"
                >
                  Description
                </Th>
                <Th
                  fontWeight="500"
                  textTransform="capitalize"
                  fontSize="sm"
                  letterSpacing="0"
                  color="blackAlpha.900"
                >
                  Actions
                </Th>
              </Tr>
            </Thead>
            <Tbody backgroundColor="white">
              <Tr>
                <Td color="blackAlpha.900" fontSize="sm" fontWeight="400">
                  Test
                </Td>
                <Td color="blackAlpha.900" fontSize="sm" fontWeight="400">
                  Test
                </Td>
                <Td>
                  <HStack spacing="2">
                    <Button
                      variant="ghost"
                      size="sm"
                      display="flex"
                      gap="1"
                      color="gray.500"
                      fontWeight="500"
                    >
                      <LuEye />
                      View
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      display="flex"
                      gap="1"
                      color="orange.400"
                      fontWeight="500"
                    >
                      <LuFileEdit />
                      Edit
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      display="flex"
                      gap="1"
                      color="red.400"
                      fontWeight="500"
                    >
                      <LuTrash />
                      Delete
                    </Button>
                  </HStack>
                </Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>
      </VStack>
    </Layout>
  );
}

export default CategoriesPage;
