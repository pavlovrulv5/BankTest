import { Card, Field, Input, Stack } from "@chakra-ui/react";
import { PasswordInput } from "./password-input";
import React, { useState } from "react";

export const BankCardIn = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [errors, setErrors] = useState({
    cardNumber: "",
  });
  const handleCardNumberChange = (event) => {
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
    }
    setCardNumber(limitedValue);
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
              value={cardNumber}
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
