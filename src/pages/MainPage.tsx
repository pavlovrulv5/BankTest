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
  const [isFirstCardValidate, setIsFirstCardValidate] = useState(false);
  const [isSecondCardValidate, setIsSecondCardValidate] = useState(false);

  return (
    <Box w={"100vw"} h={"100%"} bg={"white"}>
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
          <Flex
            w="100%"
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            flexDirection={["column", "column", "column", "row", "row"]}
          >
            <Tabs.Content value="BankCardOut">
              <BankCardOut
                cardData={senderCard}
                setCardData={setSenderCard}
                setIsValidate={setIsFirstCardValidate}
              />
            </Tabs.Content>
            <Box
              paddingLeft={"50px"}
              paddingRight={"50px"}
              paddingTop={{ base: "15px" }}
            >
              <Icon size={"2xl"}>
                <FaArrowAltCircleRight />
              </Icon>
            </Box>
            <Tabs.Content value="BankCardOut">
              <BankCardIn
                cardData={recipientCard}
                setCardData={setRecipientCard}
                setIsValidate={setIsSecondCardValidate}
              />
            </Tabs.Content>
          </Flex>
        </Tabs.Root>
        <InputCard
          senderCard={senderCard}
          recipientCard={recipientCard}
          setCardData={setSenderCard}
          setRecipientCardData={setRecipientCard}
          firstValidate={isFirstCardValidate}
          secondValidate={isSecondCardValidate}
          setFirstValidate={setIsFirstCardValidate}
          setSecondValidate={setIsSecondCardValidate}
        />
      </Box>
    </Box>
  );
};

export default MainPage;
