import React from "react";
import { Field } from "formik";
import { FormControl, FormLabel, Textarea } from "@chakra-ui/react";

function CustomTextArea({ label, name, placeholder }) {
  return (
    <FormControl>
      <FormLabel fontSize="sm">{label}</FormLabel>
      <Field
        as={Textarea}
        name={name}
        size="sm"
        borderRadius="lg"
        placeholder={placeholder}
        minHeight="200px"
        _placeholder={{ fontSize: "xs" }}
      />
    </FormControl>
  );
}

export default CustomTextArea;
