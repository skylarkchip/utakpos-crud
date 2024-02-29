import React from "react";
import { Input } from "@chakra-ui/react";
import { useField } from "formik";

function CustomInputFieldAlt(props) {
  const [field] = useField(props);

  return (
    <Input
      {...field}
      {...props}
      borderRadius="lg"
      _placeholder={{ fontSize: "sm" }}
      size="sm"
    />
  );
}

export default CustomInputFieldAlt;
