import React from "react";
import { Formik } from "formik";
import { Flex, Text, useToast } from "@chakra-ui/react";
import { LuCheckCheck } from "react-icons/lu";

// Firebase
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { db } from "@/firebase";

// Components
import ProductForm from "./product-form.component";
import { useRouter } from "next/router";

const ProductFormWrapper = ({ product }) => {
  const toast = useToast();
  const router = useRouter();

  return (
    <Formik
      enableReinitialize
      initialValues={{
        name: product?.name || "",
        slug: product?.slug || "",
        description: product?.description || "",
        category: product?.category || "",
        price: product?.price || 0,
        quantity: product?.quantity || 0,
        isVisible: product?.isVisible || false,
        enableVariation: product?.enableVariation || false,
        variations: product?.variations || [],
        combinations: product?.combinations || [],
      }}
      onSubmit={async (values, actions) => {
        console.log(values);
        try {
          if (product) {
            const docRef = doc(db, "products", product.id);
            await setDoc(docRef, values);

            toast({
              position: "bottom-right",
              isClosable: true,
              duration: 3000,
              render: () => (
                <Flex
                  gap="2"
                  justifyContent="center"
                  alignItems="center"
                  borderRadius="lg"
                  backgroundColor="teal.400"
                  p="3"
                >
                  <LuCheckCheck color="white" />
                  <Text fontSize="sm" color="white">
                    Product Updated
                  </Text>
                </Flex>
              ),
              onCloseComplete: () => {
                router.replace("/products");
              },
            });
          } else {
            const docRef = await addDoc(collection(db, "products"), values);

            toast({
              position: "bottom-right",
              isClosable: true,
              duration: 3000,
              render: () => (
                <Flex
                  gap="2"
                  justifyContent="center"
                  alignItems="center"
                  borderRadius="lg"
                  backgroundColor="teal.400"
                  p="3"
                >
                  <LuCheckCheck color="white" />
                  <Text fontSize="sm" color="white">
                    Product Added
                  </Text>
                </Flex>
              ),
              onCloseComplete: () => {
                router.replace("/products");
              },
            });

            // console.log(docRef);
            actions.resetForm();
          }
        } catch (error) {
          console.log(error);
        }
      }}
    >
      <ProductForm />
    </Formik>
  );
};

export default ProductFormWrapper;
