import React from "react";
import {
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from "@chakra-ui/react";
import { useField } from "formik";

function CustomNumberFieldAlt(props) {
  const [field, _, helpers] = useField(props);
  return (
    <NumberInput
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
  );
}

export default CustomNumberFieldAlt;
