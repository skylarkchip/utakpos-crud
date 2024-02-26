import React from "react";
import {
  FormControl,
  FormLabel,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from "@chakra-ui/react";
import { Field } from "formik";

function CustomNumberField({ label, name, placeholder, value }) {
  return (
    <FormControl>
      <FormLabel fontSize="sm">{label}</FormLabel>
      <NumberInput defaultValue={0} min={0} size="sm" value={value}>
        <Field
          as={NumberInputField}
          name={name}
          placeholder={placeholder}
          borderRadius="lg"
        />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
    </FormControl>
  );
}

export default CustomNumberField;
