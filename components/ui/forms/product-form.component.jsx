import React from "react";
import { Field, FieldArray, Form, Formik } from "formik";
import {
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Stack,
  Switch,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { LuCheckCheck, LuPlus, LuTrash, LuUserCheck } from "react-icons/lu";

// Utils
import { generateCombinations } from "@/utils/generate-combinations";
import { generateSlug } from "@/utils/generate-slug";

// Firebase
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/firebase";

// Components
import CustomInputField from "../input/custom-input-field.component";
import CustomTextArea from "../input/custom-textarea-component";
import CustomSwitch from "../switch/custom-switch.component";
import CustomIconButton from "../buttons/custom-icon-button.component";
import CustomButton from "../buttons/custom-button.component";
import CustomNumberField from "../input/custom-number-field.component";

const ProductForm = () => {
  const toast = useToast();
  const initialValues = {
    name: "",
    slug: "",
    description: "",
    category: "",
    price: 0,
    quantity: 0,
    isVisible: false,
    enableVariation: false,
    variations: [],
    variationCombinations: [],
  };

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      onSubmit={async (values, actions) => {
        try {
          const formattedVariations = values.enableVariation
            ? generateCombinations(values.variations).map(
                (combination, index) => ({
                  ...combination,
                  price: values.variationCombinations[index].price,
                  quantity: values.variationCombinations[index].quantity,
                })
              )
            : [];
          const submittedValues = {
            name: values.name,
            slug: values.slug,
            description: values.description,
            category: values.category,
            price: values.enableVariation ? 0 : values.price,
            quantity: values.enableVariation ? 0 : values.quantity,
            isVisible: values.isVisible,
            enableVariation: values.enableVariation,
            variations: formattedVariations,
          };
          const docRef = await addDoc(
            collection(db, "products"),
            submittedValues
          );

          toast({
            position: "bottom-right",
            isClosable: true,
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
          });
          actions.resetForm();
        } catch (err) {}
        // console.log(values);
      }}
    >
      {({ values, setFieldValue, isSubmitting }) => (
        <Form>
          <Flex flexDirection={{ base: "column", lg: "row" }} gap="8">
            <VStack spacing="4" flex="2">
              <Box
                borderWidth="1px"
                borderColor="blackAlpha.200"
                borderRadius="lg"
                backgroundColor="white"
                w="full"
              >
                <Box p="4">
                  <Text fontWeight="700">Product Information</Text>
                </Box>
                <Divider />
                <VStack spacing="4" align="left" w="full" px="6" py="4">
                  <Flex gap="4">
                    <CustomInputField
                      label="Name"
                      name="name"
                      placeholder="Name"
                      value={values.name}
                      onChange={(e) => {
                        setFieldValue("name", e.target.value);
                        setFieldValue("slug", generateSlug(e.target.value));
                      }}
                    />
                    <CustomInputField
                      label="Slug"
                      isReadOnly={true}
                      name="slug"
                      value={values.slug}
                    />
                  </Flex>
                  <CustomTextArea
                    label="Description"
                    name="description"
                    placeholder="Description"
                    onChange={(e) =>
                      setFieldValue("description", e.target.value)
                    }
                    value={values.description}
                  />
                </VStack>
                <Divider />
                <Box p="4">
                  <Text fontWeight="700">Product Association</Text>
                </Box>
                <Divider />
                <Box px="6" py="4">
                  <Box maxW={{ base: "full", md: "50%" }}>
                    <CustomInputField
                      label="Category"
                      name="category"
                      placeholder="Category"
                      onChange={(e) =>
                        setFieldValue("category", e.target.value)
                      }
                      value={values.category}
                    />
                  </Box>
                </Box>
              </Box>
              <Box
                borderWidth="1px"
                borderColor="blackAlpha.200"
                borderRadius="lg"
                backgroundColor="white"
                w="full"
              >
                <Box p="4">
                  <Text fontWeight="700">Sales Information</Text>
                </Box>
                <Divider />
                <VStack spacing="4" py="4" px="6">
                  <CustomSwitch
                    helperText="You can add variations if this product has options, like
                      size or color."
                    isChecked={values.enableVariation}
                    name="enableVariation"
                    onChange={(e) => {
                      setFieldValue("enableVariation", e.target.checked);
                      if (e.target.checked) {
                        const combinations = generateCombinations(
                          values.variations
                        );
                        setFieldValue(
                          "variationCombinations",
                          combinations.map(() => ({
                            price: "",
                            quantity: "",
                          }))
                        );
                      } else {
                        setFieldValue("variations", []);
                        setFieldValue("variationCombinations", []);
                      }
                    }}
                    label="Enable Variations"
                  />
                  {!values.enableVariation && (
                    <Stack direction="row" spacing="4" align="left" w="full">
                      <CustomInputField
                        label="Price"
                        name="price"
                        placeholder="Price"
                        value={values.price}
                        onChange={(e) => setFieldValue("price", e.target.value)}
                      />
                      <CustomNumberField
                        label="Quantity"
                        name="quantity"
                        placeholder="Quantity"
                        value={values.quantity || 0}
                        // onChange={(e) =>
                        //   setFieldValue("quantity", e.target.value)
                        // }
                      />
                    </Stack>
                  )}
                  {values.enableVariation && (
                    <>
                      <FieldArray
                        name="variations"
                        render={(arrayHelpers) => (
                          <VStack spacing="4" align="left" w="full">
                            {values.variations.map((variation, index) => (
                              <VStack
                                spacing="4"
                                key={index}
                                backgroundColor="gray.50"
                                p="4"
                                borderRadius="10"
                              >
                                <Flex
                                  justifyContent="space-between"
                                  alignItems="flex-end"
                                  w="full"
                                >
                                  <CustomInputField
                                    backgroundColor="white"
                                    label="Variation Name"
                                    name={`variations[${index}].type`}
                                    placeholder="Variation"
                                    // value={variation.type || ""}
                                  />
                                  <CustomIconButton
                                    color="gray.400"
                                    fontSize="xs"
                                    hoverColor="red.400"
                                    icon={<LuTrash />}
                                    onChange={() => arrayHelpers.remove(index)}
                                    variant="ghost"
                                  />
                                </Flex>

                                <FieldArray
                                  name={`variations[${index}].options`}
                                  render={(optionHelpers) => (
                                    <VStack spacing="4" w="full" align="left">
                                      <FormControl>
                                        <FormLabel fontSize="sm">
                                          Options
                                        </FormLabel>
                                        {variation.options.map(
                                          (option, optionIndex) => (
                                            <Flex
                                              key={optionIndex}
                                              justifyContent="center"
                                              w="full"
                                              alignItems="center"
                                            >
                                              <Box
                                                backgroundColor="white"
                                                w="full"
                                              >
                                                <Field
                                                  as={Input}
                                                  name={`variations[${index}].options[${optionIndex}]`}
                                                  placeholder="Option"
                                                  borderRadius="lg"
                                                  size="sm"
                                                  _placeholder={{
                                                    fontSize: "xs",
                                                  }}
                                                  value={option || ""}
                                                />
                                              </Box>
                                              <CustomIconButton
                                                color="gray.400"
                                                fontSize="xs"
                                                hoverColor="red.400"
                                                icon={<LuTrash />}
                                                onChange={() =>
                                                  optionHelpers.remove(
                                                    optionIndex
                                                  )
                                                }
                                                variant="ghost"
                                              />
                                            </Flex>
                                          )
                                        )}
                                      </FormControl>
                                      <CustomButton
                                        backgroundColor="transparent"
                                        color="teal.400"
                                        fontSize="sm"
                                        onClick={() => optionHelpers.push("")}
                                        type="button"
                                        variant="ghost"
                                      >
                                        <LuPlus />
                                        Add Option
                                      </CustomButton>
                                    </VStack>
                                  )}
                                />
                              </VStack>
                            ))}
                            {values.variations.length < 3 && (
                              <Flex w="full" justifyContent="flex-start">
                                <CustomButton
                                  backgroundColor="transparent"
                                  color="teal.400"
                                  fontSize="sm"
                                  onClick={() =>
                                    arrayHelpers.push({
                                      type: "",
                                      options: [""],
                                    })
                                  }
                                  type="button"
                                  variant="ghost"
                                >
                                  <LuPlus />
                                  Add Variation
                                </CustomButton>
                              </Flex>
                            )}
                          </VStack>
                        )}
                      />
                      {values.variations.length > 0 && (
                        <TableContainer
                          w="full"
                          borderWidth="1px"
                          borderColor="blackAlpha.200"
                          borderRadius="lg"
                        >
                          <Table
                            variant="simple"
                            size="md"
                            overflowX="scroll"
                            w="full"
                          >
                            <Thead backgroundColor="gray.50">
                              <Tr>
                                {values.variations.map((variation) => (
                                  <Th
                                    key={variation.type}
                                    fontWeight="600"
                                    textTransform="capitalize"
                                    letterSpacing="0"
                                  >
                                    {variation.type}
                                  </Th>
                                ))}
                                <Th
                                  fontWeight="600"
                                  textTransform="capitalize"
                                  letterSpacing="0"
                                >
                                  Price
                                </Th>
                                <Th
                                  fontWeight="600"
                                  textTransform="capitalize"
                                  letterSpacing="0"
                                >
                                  Quantity
                                </Th>
                              </Tr>
                            </Thead>
                            <Tbody>
                              {generateCombinations(values.variations).map(
                                (combination, index) => (
                                  <Tr key={index}>
                                    {Object.entries(combination).map(
                                      ([type, option]) => (
                                        <Td
                                          color="blackAlpha.800"
                                          key={type}
                                          fontSize="xs"
                                          fontWeight="600"
                                        >{`${option} `}</Td>
                                      )
                                    )}
                                    <Td>
                                      <Field
                                        as={Input}
                                        borderRadius="lg"
                                        fontSize="xs"
                                        minWidth="24"
                                        name={`variationCombinations[${index}].price`}
                                        placeholder="Price"
                                        size="sm"
                                        type="number"
                                        // value={combination.price || 0}
                                      />
                                    </Td>
                                    <Td>
                                      <NumberInput
                                        defaultValue={0}
                                        min={0}
                                        size="sm"
                                        // value={combination.quantity || 0}
                                      >
                                        <Field
                                          as={Input}
                                          borderRadius="lg"
                                          fontSize="xs"
                                          minWidth="24"
                                          name={`variationCombinations[${index}].quantity`}
                                          placeholder="Quantity"
                                          size="sm"
                                        />
                                        <NumberInputStepper>
                                          <NumberIncrementStepper />
                                          <NumberDecrementStepper />
                                        </NumberInputStepper>
                                      </NumberInput>
                                    </Td>
                                  </Tr>
                                )
                              )}
                            </Tbody>
                          </Table>
                        </TableContainer>
                      )}
                    </>
                  )}
                </VStack>
              </Box>
            </VStack>
            <VStack spacing="4" flex="1">
              <Box
                borderWidth="1px"
                borderColor="blackAlpha.200"
                borderRadius="lg"
                backgroundColor="white"
                w="full"
              >
                <Box p="4">
                  <Text fontWeight="700">Status</Text>
                </Box>
                <Divider />
                <VStack spacing="4" px="6" py="4">
                  <CustomSwitch
                    isChecked={values.isVisible}
                    name="isVisible"
                    onChange={(e) => {
                      setFieldValue("isVisible", e.target.checked);
                    }}
                    label="Visible"
                  />
                  <Flex w="full" gap="4">
                    <CustomButton
                      backgroundColor="teal.400"
                      buttonSize="sm"
                      color="white"
                      fontSize="xs"
                      isLoading={isSubmitting}
                      type="submit"
                      variant="solid"
                    >
                      Submit
                    </CustomButton>
                    <CustomButton
                      backgroundColor="gray.200"
                      buttonSize="sm"
                      color="blackAlpha.800"
                      fontSize="xs"
                      type="button"
                      variant="solid"
                    >
                      Cancel
                    </CustomButton>
                  </Flex>
                </VStack>
              </Box>
            </VStack>
          </Flex>
        </Form>
      )}
    </Formik>
  );
};

export default ProductForm;
