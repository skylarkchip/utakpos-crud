import React, { useEffect, useState } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Flex,
  Heading,
  VStack,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import Link from "next/link";
import { FaChevronRight } from "react-icons/fa6";

// Firebase
import { db } from "@/firebase";
import { collection, onSnapshot, query } from "firebase/firestore";

// Components
import Layout from "@/components/layout/layout.component";
import CustomButton from "@/components/ui/buttons/custom-button.component";
import ProductsTable from "@/components/ui/table/products-table.component";

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
        <ProductsTable products={products} />
      </VStack>
    </Layout>
  );
}

export default ProductsPage;
