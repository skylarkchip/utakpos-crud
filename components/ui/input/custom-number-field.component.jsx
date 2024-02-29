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
import { useField } from "formik";

function CustomNumberField(props) {
  const [field, _, helpers] = useField(props);
  return (
    <FormControl>
      <FormLabel htmlFor={props.id} fontSize="sm">
        {props.label}
      </FormLabel>
      <NumberInput
        defaultValue={0}
        min={0}
        size="sm"
        value={field.value}
        onChange={(valueString) => helpers.setValue(Number(valueString))}
      >
        <NumberInputField borderRadius="lg" />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
    </FormControl>
  );
}

export default CustomNumberField;
