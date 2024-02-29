import React from "react";
import {
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Switch,
} from "@chakra-ui/react";
import { useField } from "formik";

function CustomSwitch(props) {
  // console.log(props);
  const [field] = useField(props);

  return (
    <FormControl>
      <Flex gap="2" alignItems="center">
        <FormLabel
          htmlFor={props.id}
          fontSize="sm"
          m="0"
          color="blackAlpha.800"
        >
          {props.label}
        </FormLabel>
        <Switch colorScheme="teal" {...field} {...props} />
      </Flex>
      {props.helper && (
        <FormHelperText fontSize="xs">{props.helper}</FormHelperText>
      )}
    </FormControl>
  );
}

export default CustomSwitch;
