import { Button } from "@chakra-ui/react";
import React from "react";

function CustomButton({
  backgroundColor,
  buttonSize,
  children,
  color,
  fontSize,
  isLoading,
  onClick,
  type,
  variant,
}) {
  return (
    <Button
      backgroundColor={variant === "ghost" ? "unset" : backgroundColor}
      color={color}
      fontSize={fontSize}
      maxWidth="max-content"
      onClick={onClick}
      size={buttonSize}
      type={type}
      variant={variant}
      isLoading={isLoading}
    >
      {children}
    </Button>
  );
}

export default CustomButton;
