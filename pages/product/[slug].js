import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Flex,
  Heading,
  VStack,
} from "@chakra-ui/react";
import { FaChevronRight } from "react-icons/fa6";

// Components
import Layout from "@/components/layout/layout.component";
import ProductFormWrapper from "@/components/ui/forms/product-form-wrapper.component";

// Hooks
import useFetchProduct from "@/hooks/useFetchProduct";

function ProductPage() {
  const router = useRouter();
  // console.log(router.query.slug[0]);
  const product = useFetchProduct(router.query.slug);

  return (
    <Layout>
      <VStack w="full" align="left" spacing="6">
        <Breadcrumb separator={<FaChevronRight color="gray" fontSize="12" />}>
          <BreadcrumbItem>
            <BreadcrumbLink
              as={Link}
              href="/products"
              _hover={{ textDecoration: "none" }}
              fontSize="sm"
            >
              Products
            </BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink href="#" fontSize="sm">
              Product Name
            </BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
        <Flex justifyContent="space-between" alignItems="center">
          <Heading as="h1" fontSize="3xl">
            {product?.name}
          </Heading>
        </Flex>
        <ProductFormWrapper product={product} />
      </VStack>
    </Layout>
  );
}

export default ProductPage;
