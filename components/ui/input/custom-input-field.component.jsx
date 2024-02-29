import React from "react";
import { FormControl, FormLabel, Input } from "@chakra-ui/react";
import { useField } from "formik";

function CustomInputField(props) {
  const [field] = useField(props);

  return (
    <FormControl>
      <FormLabel htmlFor={props.id} fontSize="sm">
        {props.label}
      </FormLabel>
      <Input
        {...field}
        {...props}
        borderRadius="lg"
        _placeholder={{ fontSize: "sm" }}
        size="sm"
      />
    </FormControl>
  );
}

export default CustomInputField;
