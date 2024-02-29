import React from "react";
import { Field, useField } from "formik";
import { FormControl, FormLabel, Textarea } from "@chakra-ui/react";

function CustomTextArea(props) {
  const [field] = useField(props);
  return (
    <FormControl>
      <FormLabel fontSize="sm" htmlFor={props.id}>
        {props.label}
      </FormLabel>
      <Textarea
        {...field}
        {...props}
        height="250px"
        _placeholder={{ fontSize: "sm" }}
      />
    </FormControl>
  );
}

export default CustomTextArea;
