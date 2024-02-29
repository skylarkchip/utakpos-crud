import React, { useEffect, useState } from "react";
import Layout from "@/components/layout/layout.component";
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
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { FaChevronRight } from "react-icons/fa6";
import Link from "next/link";
import {
  LuCheckCircle,
  LuEye,
  LuPencilLine,
  LuTrash2,
  LuXCircle,
} from "react-icons/lu";
import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "@/firebase";
import CustomButton from "@/components/ui/buttons/custom-button.component";
import { useRouter } from "next/router";

function ProductsPage() {
  const [products, setProducts] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const q = query(collection(db, "products"));
    const unsub = onSnapshot(q, (querySnapshot) => {
      let itemsArr = [];

      querySnapshot.forEach((doc) => {
        itemsArr.push({ ...doc.data(), id: doc.id });
      });
      // console.log(itemsArr);
      setProducts(itemsArr);
    });
  }, []);

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
              List
            </BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
        <Flex justifyContent="space-between" alignItems="center">
          <Heading as="h1" fontSize="3xl">
            Products
          </Heading>
          <CustomButton
            backgroundColor="orange.500"
            buttonSize="sm"
            fontSize="sm"
            color="white"
            onClick={() => router.push("/products/new")}
          >
            New Product
          </CustomButton>
        </Flex>
        <TableContainer
          w="full"
          borderWidth="1px"
          borderColor="blackAlpha.300"
          borderRadius="lg"
        >
          <Table variant="simple" size="lg">
            <Thead backgroundColor="gray.50">
              <Tr>
                <Th
                  fontWeight="600"
                  textTransform="capitalize"
                  fontSize="sm"
                  letterSpacing="0"
                  color="blackAlpha.900"
                >
                  Product Name
                </Th>
                <Th
                  fontWeight="600"
                  textTransform="capitalize"
                  fontSize="sm"
                  letterSpacing="0"
                  color="blackAlpha.900"
                >
                  Category
                </Th>
                <Th
                  fontWeight="600"
                  textTransform="capitalize"
                  fontSize="sm"
                  letterSpacing="0"
                  color="blackAlpha.900"
                >
                  Visibility
                </Th>
                <Th
                  fontWeight="600"
                  textTransform="capitalize"
                  fontSize="sm"
                  letterSpacing="0"
                  color="blackAlpha.900"
                >
                  Price
                </Th>
                <Th
                  fontWeight="600"
                  textTransform="capitalize"
                  fontSize="sm"
                  letterSpacing="0"
                  color="blackAlpha.900"
                  colSpan="2"
                >
                  Quantity
                </Th>
              </Tr>
            </Thead>
            <Tbody backgroundColor="white">
              {products.map((product) => {
                return (
                  <Tr key={product.id}>
                    <Td color="blackAlpha.900" fontSize="sm" fontWeight="400">
                      {product.name}
                    </Td>
                    <Td color="blackAlpha.900" fontSize="sm" fontWeight="400">
                      {product.category}
                    </Td>
                    <Td color="blackAlpha.900" fontSize="sm" fontWeight="400">
                      {product.isVisible ? (
                        <LuCheckCircle color="teal" size="16" />
                      ) : (
                        <LuXCircle color="red" size="16" />
                      )}
                    </Td>
                    <Td
                      color={
                        product.variations.length > 0
                          ? "teal.500"
                          : "blackAlpha.900"
                      }
                      fontSize="sm"
                      fontWeight="400"
                    >
                      {product.variations.length > 0
                        ? "Check Variation"
                        : product.price}
                    </Td>
                    <Td
                      color={
                        product.variations.length > 0
                          ? "teal.500"
                          : "blackAlpha.900"
                      }
                      fontSize="sm"
                      fontWeight="400"
                    >
                      {product.variations.length > 0
                        ? "Check Variation"
                        : product.quantity}
                    </Td>
                    <Td>
                      <Wrap>
                        <WrapItem>
                          <Button
                            color="blackAlpha.600"
                            fontSize="xs"
                            fontWeight="400"
                            leftIcon={<LuEye />}
                            size="sm"
                            variant="ghost"
                            onClick={() =>
                              router.push(`/product/${product.slug}`)
                            }
                          >
                            View
                          </Button>
                        </WrapItem>
                        <WrapItem>
                          <Button
                            color="red.600"
                            fontSize="xs"
                            fontWeight="400"
                            leftIcon={<LuTrash2 />}
                            size="sm"
                            variant="ghost"
                          >
                            Delete
                          </Button>
                        </WrapItem>
                      </Wrap>
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </TableContainer>
      </VStack>
    </Layout>
  );
}

export default ProductsPage;
