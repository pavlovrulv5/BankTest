import { Card, Field, Input, Stack } from "@chakra-ui/react";
import React, { useState } from "react";

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

  const handleCardNumberChange = (event: { target: { value: string } }) => {
    const value = event.target.value.replace(/[^0-9]/g, "");
    setIsValidate(true);
    const formattedValue =
      value
        .replace(/\s/g, "")
        .match(/.{1,4}/g)
        ?.join(" ") || "";
    const limitedValue = formattedValue.slice(0, 19);

    if (limitedValue.length < 19) {
      setIsValidate(false);
      setErrors((prev) => ({
        ...prev,
        cardNumber: "Неверно указан номер карты",
      }));
    } else {
      setErrors((prev) => ({
        ...prev,
        cardNumber: "",
      }));
    }

    setCardData({
      ...cardData,
      cardNumber: limitedValue,
    });
  };

  return (
    <Card.Root maxW="sm" w={"1000px"} h={"220px"}>
      <Card.Header>
        <Card.Description fontSize={"30px"}>Получатель</Card.Description>
      </Card.Header>
      <Card.Body>
        <Stack gap="4" w="full">
          <Field.Root>
            <Input
              value={cardData.cardNumber}
              onChange={handleCardNumberChange}
              placeholder="Номер карты"
            />
          </Field.Root>
        </Stack>
      </Card.Body>
    </Card.Root>
  );
};

export default BankCardIn;
