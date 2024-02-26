import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  LinkBox,
  LinkOverlay,
  Stack,
  Text,
} from "@chakra-ui/react";

const Header = () => {
  const [sticky, setSticky] = useState(false);

  const scrollHeader = () => {
    if (window.scrollY >= 20) {
      setSticky(true);
    } else {
      setSticky(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", scrollHeader);

    return () => {
      window.addEventListener("scroll", scrollHeader);
    };
  }, []);

  return (
    <Box
      as="header"
      pos="fixed"
      py="6"
      borderBottomWidth="1px"
      borderBottomColor="gray.200"
      w="full"
      backgroundColor="white"
      zIndex="1"
    >
      <Stack direction="column" gap="4" px="6">
        <LinkBox>
          <LinkOverlay href="/">
            <Text fontWeight="700" color="blackAlpha.800" fontSize="md">
              Simple CRUD
            </Text>
          </LinkOverlay>
        </LinkBox>
      </Stack>
    </Box>
  );
};

export default Header;
