import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Heading,
  VStack,
} from "@chakra-ui/react";
import Link from "next/link";
import { FaChevronRight } from "react-icons/fa6";

import Layout from "@/components/layout/layout.component";
import ProductForm from "@/components/ui/forms/product-form.component";

function AddNewProductPage() {
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
              Create New
            </BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
        <Heading as="h1" fontSize="2xl">
          Create New Product
        </Heading>
        <ProductForm />
      </VStack>
    </Layout>
  );
}

export default AddNewProductPage;
