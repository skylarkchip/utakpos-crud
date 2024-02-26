import { FormControl, FormLabel, Input } from "@chakra-ui/react";
import { Field } from "formik";
import React from "react";

function CustomInputField({
  backgroundColor,
  defaultValue,
  disabled,
  isReadOnly,
  label,
  name,
  onChange,
  placeholder,
  value,
}) {
  return (
    <FormControl>
      <FormLabel fontSize="sm">{label}</FormLabel>
      <Field
        as={Input}
        backgroundColor={backgroundColor ? backgroundColor : "unset"}
        borderRadius="lg"
        defaultValue={defaultValue}
        isReadOnly={isReadOnly}
        name={name}
        size="sm"
        placeholder={placeholder}
        _placeholder={{ fontSize: "xs" }}
        value={value}
        disabled={disabled}
        onChange={isReadOnly ? undefined : onChange}
      />
    </FormControl>
  );
}

export default CustomInputField;
