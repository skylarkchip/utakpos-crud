import React from "react";
import { Container, Heading } from "@chakra-ui/react";
import Layout from "@/components/layout/layout.component";

const Home = () => {
  return (
    <Layout>
      <Heading as="h1" fontSize="3xl">
        Dashboard
      </Heading>
    </Layout>
  );
};

export default Home;
