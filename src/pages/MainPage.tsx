import { Box, Tabs, Flex, Icon, Center } from "@chakra-ui/react";
import BankCardOut from "@/components/ui/BankCardOut";
import BankCardIn from "@/components/ui//BankCardIn";
import { FaArrowAltCircleRight } from "react-icons/fa";
import { BiBox } from "react-icons/bi";
import InputCard from "@/components/ui/InputCard";

const MainPage = () => {
  return (
    <Box
      w={"100%"}
      h={"100%"}
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Box>
        <Tabs.Root
          variant="enclosed"
          fitted
          defaultValue={"BankCardOut"}
          flexDirection={"row"}
        >
          <Flex w="100%" flexDirection={"row"}>
            <Tabs.Content value="BankCardOut">
              <BankCardOut />
            </Tabs.Content>
            <Box alignContent={"center"} padding={"50px"}>
              <Icon size={"2xl"}>
                <FaArrowAltCircleRight />
              </Icon>
            </Box>
            <Tabs.Content value="BankCardOut">
              <BankCardIn />
            </Tabs.Content>
          </Flex>
        </Tabs.Root>
      </Box>
      <InputCard></InputCard>
    </Box>
  );
};

export default MainPage;
