import React from "react";
import {
  Button,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { LuCheckCircle, LuEye, LuTrash2, LuXCircle } from "react-icons/lu";

// Components
import DeleteProductDialog from "../alert-dialog/delete-product-dialog.component";

function ProductsTable({ products }) {
  const router = useRouter();

  return (
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
                        onClick={() => router.push(`/product/${product.slug}`)}
                      >
                        View
                      </Button>
                    </WrapItem>
                    <WrapItem>
                      <DeleteProductDialog productId={product.id} />
                    </WrapItem>
                  </Wrap>
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </TableContainer>
  );
}

export default ProductsTable;
