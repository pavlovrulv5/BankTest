import { Card, Field, Input, Stack, InputGroup } from "@chakra-ui/react";
import { usePaymentInputs } from "react-payment-inputs";
import { LuCreditCard } from "react-icons/lu";
import { useState } from "react";

export interface BankCardInProps {
  cardData: {
    cardNumber: string;
  };
  setCardData: (data: { cardNumber: string }) => void;
  setIsValidate: (value: boolean) => void;
}

export const BankCardIn = ({
  cardData,
  setCardData,
  setIsValidate,
}: BankCardInProps) => {
  const [errors, setErrors] = useState({
    cardNumber: "",
  });
  const { wrapperProps, getCardNumberProps } = usePaymentInputs();
  const handleCardNumberChange = (event: { target: { value: string } }) => {
    const value = event.target.value.replace(/[^0-9]/g, "");
    const formattedValue =
      value
        .replace(/\s/g, "")
        .match(/.{1,4}/g)
        ?.join(" ") || "";
    const limitedValue = formattedValue.slice(0, 19);

    if (limitedValue.length < 19) {
      setErrors((prev) => ({
        ...prev,
        cardNumber: "Неверно указан номер карты",
      }));
      setIsValidate(false);
    } else {
      setErrors((prev) => ({
        ...prev,
        cardNumber: "",
      }));
      setIsValidate(true);
    }

    setCardData({
      ...cardData,
      cardNumber: limitedValue,
    });
  };

  return (
    <Card.Root
      maxW={{ base: "350px", sm: "sm" }}
      w={"382px"}
      h={"220px"}
      marginLeft={{ base: "20px", sm: "0px" }}
    >
      <Card.Header>
        <Card.Description fontSize={"30px"}>Получатель</Card.Description>
      </Card.Header>
      <Card.Body>
        <Stack gap="4" w="full">
          <Field.Root invalid={!!errors.cardNumber}>
            <InputGroup {...wrapperProps} endElement={<LuCreditCard />}>
              <Input
                {...getCardNumberProps()}
                value={cardData.cardNumber}
                onChange={handleCardNumberChange}
                placeholder="Номер карты"
              />
            </InputGroup>
          </Field.Root>
        </Stack>
      </Card.Body>
    </Card.Root>
  );
};

export default BankCardIn;
