import React, { useEffect } from "react";
import {
  Box,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  VStack,
} from "@chakra-ui/react";
import { Form, FieldArray, useFormikContext } from "formik";
import { LuPlus, LuTrash } from "react-icons/lu";

// Util
import { generateCombinations } from "@/utils/generate-combinations";
import { generateSlug } from "@/utils/generate-slug";

// Components
import CustomInputField from "../input/custom-input-field.component";
import CustomTextArea from "../input/custom-textarea-component";
import CustomSwitch from "../switch/custom-switch.component";
import CustomIconButton from "../buttons/custom-icon-button.component";
import CustomButton from "../buttons/custom-button.component";
import CustomInputFieldAlt from "../input/custom-input-field-alt.component";
import CustomNumberField from "../input/custom-number-field.component";
import CustomNumberFieldAlt from "../input/custom-number-field-alt.component";

const ProductForm = () => {
  const { values, setFieldValue, isSubmitting } = useFormikContext();

  useEffect(() => {
    const combinations = generateCombinations(
      values.variations,
      values.combinations
    );
    setFieldValue("combinations", combinations);
  }, [values.variations, setFieldValue]);

  return (
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
                  id="name"
                  label="Name"
                  name="name"
                  placeholder="Name"
                  type="text"
                  onChange={(e) => {
                    setFieldValue("name", e.target.value);
                    setFieldValue("slug", generateSlug(e.target.value));
                  }}
                />
                <CustomInputField
                  backgroundColor="gray.50"
                  id="slug"
                  label="Slug"
                  isReadOnly={true}
                  name="slug"
                  type="text"
                />
              </Flex>
              <CustomTextArea
                label="Description"
                name="description"
                placeholder="Description"
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
                  id="category"
                  label="Category"
                  name="category"
                  placeholder="Category"
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
                helper="You can add variations if this product has options, like
                  size or color."
                id="enableVariation"
                isChecked={values.enableVariation}
                label="Enable Variations"
                name="enableVariation"
                onChange={(e) => {
                  setFieldValue("enableVariation", e.target.checked);
                  if (!e.target.checked) {
                    setFieldValue("variations", []);
                    setFieldValue("combinations", []);
                  }
                }}
              />

              {!values.enableVariation && (
                <Flex w="full" gap="4">
                  <CustomInputField
                    id="price"
                    label="Price"
                    name="price"
                    placeholder="Price"
                  />
                  <CustomNumberField
                    id="quantity"
                    label="Quantity"
                    name="quantity"
                    placeholder="Quantity"
                  />
                </Flex>
              )}
              {values.enableVariation && (
                <>
                  <FieldArray name="variations">
                    {({ insert, remove, push }) => (
                      <VStack spacing="4" w="full" align="left">
                        {values.variations.length > 0 &&
                          values.variations.map((variation, index) => (
                            <VStack
                              className="variation"
                              key={index}
                              w="full"
                              align="left"
                              spacing="4"
                              p="4"
                              bgColor="gray.50"
                              borderRadius="lg"
                            >
                              <Flex alignItems="flex-end">
                                <CustomInputField
                                  backgroundColor="white"
                                  label="Variation Name"
                                  name={`variations.${index}.name`}
                                  placeholder="Variation"
                                />
                                <CustomIconButton
                                  color="gray.400"
                                  fontSize="xs"
                                  hoverColor="red.400"
                                  icon={<LuTrash />}
                                  onChange={() => remove(index)}
                                  type="button"
                                  variant="ghost"
                                />
                              </Flex>
                              <FieldArray
                                name={`variations.${index}.options`}
                                render={(optionHelpers) => (
                                  <VStack spacing="2" w="full" align="left">
                                    <FormControl>
                                      <FormLabel fontSize="sm">
                                        Options
                                      </FormLabel>
                                      {variation.options.map(
                                        (option, optionIndex) => (
                                          <Flex
                                            w="full"
                                            alignItems="center"
                                            className="option"
                                            key={optionIndex}
                                          >
                                            <CustomInputFieldAlt
                                              backgroundColor="white"
                                              name={`variations.${index}.options.${optionIndex}`}
                                              placeholder="Option"
                                            />
                                            <CustomIconButton
                                              color="gray.400"
                                              fontSize="xs"
                                              hoverColor="red.400"
                                              icon={<LuTrash />}
                                              onChange={() =>
                                                optionHelpers.remove(index)
                                              }
                                              type="button"
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
                        <CustomButton
                          backgroundColor="transparent"
                          color="teal.400"
                          fontSize="sm"
                          onClick={() => push({ name: "", options: [""] })}
                          type="button"
                          variant="ghost"
                        >
                          <LuPlus />
                          Add Variation
                        </CustomButton>
                      </VStack>
                    )}
                  </FieldArray>

                  <FieldArray name="combinations">
                    {({ insert, remove, push }) => (
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
                              {Object.keys(values.combinations[0] || {}).map(
                                (key) => (
                                  <Th
                                    key={key}
                                    fontWeight="600"
                                    textTransform="capitalize"
                                    letterSpacing="0"
                                  >
                                    {key}
                                  </Th>
                                )
                              )}
                            </Tr>
                          </Thead>
                          <Tbody>
                            {/* {console.log(values.combinations)} */}
                            {values.combinations.map((combination, index) => (
                              <Tr key={index}>
                                {Object.entries(combination)
                                  .sort((a, b) => {
                                    if (["price", "quantity"].includes(a[0]))
                                      return 1;
                                    if (["price", "quantity"].includes(b[0]))
                                      return -1;
                                    return 0;
                                  })
                                  .map(([key, value], idx) => (
                                    <Td key={idx}>
                                      {["price", "quantity"].includes(key) ? (
                                        key === "price" ? (
                                          <CustomInputFieldAlt
                                            name={`combinations.${index}.${key}`}
                                            type="number"
                                          />
                                        ) : (
                                          <CustomNumberFieldAlt
                                            name={`combinations.${index}.${key}`}
                                          />
                                        )
                                      ) : (
                                        <Text fontSize="sm">{value}</Text>
                                      )}
                                    </Td>
                                  ))}
                              </Tr>
                            ))}
                          </Tbody>
                        </Table>
                      </TableContainer>
                    )}
                  </FieldArray>
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
  );
};

export default ProductForm;
