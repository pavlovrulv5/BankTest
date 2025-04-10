import { Box, Tabs, Flex, Icon } from "@chakra-ui/react";
import BankCardOut from "@/components/ui/BankCardOut";
import BankCardIn from "@/components/ui//BankCardIn";
import { FaArrowAltCircleRight } from "react-icons/fa";
import InputCard from "@/components/ui/InputCard";
import { useState } from "react";
import Header from "@/components/ui/Header";

const MainPage = () => {
  const [senderCard, setSenderCard] = useState({
    cardNumber: "",
    expiryMonth: "",
    expiryYear: "",
    expiryCvv: "",
  });

  const [recipientCard, setRecipientCard] = useState({
    cardNumber: "",
  });
  const [isValidate, setIsValidate] = useState(false);
  return (
    <Box w={"80vw"} h={"100vh"}>
      <Header></Header>
      <Box
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Tabs.Root
          variant="enclosed"
          fitted
          defaultValue={"BankCardOut"}
          flexDirection={"row"}
        >
          <Flex w="100%" flexDirection={"row"}>
            <Tabs.Content value="BankCardOut">
              <BankCardOut
                cardData={senderCard}
                setCardData={setSenderCard}
                setIsValidate={setIsValidate}
              />
            </Tabs.Content>
            <Box alignContent={"center"} padding={"50px"}>
              <Icon size={"2xl"}>
                <FaArrowAltCircleRight />
              </Icon>
            </Box>
            <Tabs.Content value="BankCardOut">
              <BankCardIn
                cardData={recipientCard}
                setCardData={setRecipientCard}
                setIsValidate={setIsValidate}
              />
            </Tabs.Content>
          </Flex>
        </Tabs.Root>
        <InputCard
          senderCard={senderCard}
          recipientCard={recipientCard}
          setCardData={setSenderCard}
          setRecipientCardData={setRecipientCard}
          globalIsValidate={isValidate}
        />
      </Box>
    </Box>
  );
};

export default MainPage;
