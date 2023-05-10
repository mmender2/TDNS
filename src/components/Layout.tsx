import { ReactNode } from "react";
import { Flex } from "@chakra-ui/react";

type Props = {
  children?: ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <Flex
      flexDirection="row"
      alignItems="center" 
      justifyContent="right"
      h="100vh"
      
    >
      {children}
    </Flex>
  );
}
