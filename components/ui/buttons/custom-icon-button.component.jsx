import React from "react";
import { IconButton } from "@chakra-ui/react";

function CustomIconButton({
  color,
  hoverColor,
  fontSize,
  icon,
  onChange,
  variant,
}) {
  return (
    <IconButton
      icon={icon}
      variant={variant}
      type="button"
      fontSize={fontSize}
      color={color}
      maxWidth="max-content"
      onClick={onChange}
      _hover={{ color: hoverColor }}
    />
  );
}

export default CustomIconButton;
