import React from "react";
import {
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Switch,
} from "@chakra-ui/react";
import { Field } from "formik";

function CustomSwitch({ label, isChecked, name, onChange, helperText }) {
  return (
    <FormControl>
      <Flex gap="2" alignItems="center">
        <FormLabel fontSize="sm" m="0" color="blackAlpha.800">
          {label}
        </FormLabel>
        <Field
          as={Switch}
          colorScheme="teal"
          type="checkbox"
          name={name}
          checked={isChecked}
          onChange={onChange}
        />
      </Flex>
      {helperText && (
        <FormHelperText fontSize="xs">{helperText}</FormHelperText>
      )}
    </FormControl>
  );
}

export default CustomSwitch;
