import { Card, Field, Input, Stack } from "@chakra-ui/react";
import { PasswordInput } from "./password-input";
import React, { useState, useEffect } from "react";

export interface BankCardOutProps {
  cardData: {
    cardNumber: string;
    expiryMonth: string;
    expiryYear: string;
    expiryCvv: string;
  };
  setCardData: (data: {
    cardNumber: string;
    expiryMonth: string;
    expiryYear: string;
    expiryCvv: string;
  }) => void;
  setIsValidate: (value: boolean) => void;
}

export const BankCardOut = ({
  cardData,
  setCardData,
  setIsValidate,
}: BankCardOutProps) => {
  const [errors, setErrors] = useState({
    cardNumber: "!",
    expiryMonth: "!",
    expiryYear: "!",
    expiryCvv: "!",
  });

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

  const handleExpiryMonthChange = (event: { target: { value: string } }) => {
    const value = event.target.value.replace(/[^0-9]/g, "");
    const limitedValue = value.slice(0, 2);

    if (limitedValue.length < 2) {
      setErrors((prev) => ({
        ...prev,
        expiryMonth: "Неверно указан месяц",
      }));
    } else {
      setErrors((prev) => ({
        ...prev,
        expiryMonth: "",
      }));
    }

    setCardData({
      ...cardData,
      expiryMonth: limitedValue,
    });
  };

  const handleExpiryYearChange = (event: { target: { value: string } }) => {
    const value = event.target.value.replace(/[^0-9]/g, "");
    const limitedValue = value.slice(0, 2);

    if (limitedValue.length < 2) {
      setErrors((prev) => ({
        ...prev,
        expiryYear: "Неверно указан год",
      }));
    } else {
      setErrors((prev) => ({
        ...prev,
        expiryYear: "",
      }));
    }

    setCardData({
      ...cardData,
      expiryYear: limitedValue,
    });
  };

  const handleCvv = (event: { target: { value: string } }) => {
    const value = event.target.value.replace(/[^0-9]/g, "");
    const limitedValue = value.slice(0, 3);
    console.log(limitedValue.length);
    if (limitedValue.length < 3) {
      setErrors((prev) => ({
        ...prev,
        expiryCvv: "Неверно указан CVV",
      }));
    } else {
      setErrors((prev) => ({
        ...prev,
        expiryCvv: "",
      }));
    }
    console.log(errors);
    setCardData({
      ...cardData,
      expiryCvv: limitedValue,
    });
  };
  useEffect(() => {
    if (
      errors.cardNumber != "" &&
      errors.expiryCvv != "" &&
      errors.expiryMonth != "" &&
      errors.expiryYear != ""
    ) {
      setIsValidate(true);
    } else {
      setIsValidate(false);
    }
  }, [errors]);

  return (
    <Card.Root maxW="sm" w={"1000px"} h={"220px"}>
      <Card.Header>
        <Card.Description fontSize={"30px"}>Отправитель</Card.Description>
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
      <Card.Footer flexDirection={"row"} w={"100%"}>
        <Field.Root
          flexDirection={"row"}
          gap={"10px"}
          alignItems={"center"}
          marginRight={"20px"}
        >
          <Input
            w={"80px"}
            value={cardData.expiryMonth}
            onChange={handleExpiryMonthChange}
            placeholder="Месяц"
          />
          /
          <Input
            w={"80px"}
            value={cardData.expiryYear}
            onChange={handleExpiryYearChange}
            placeholder="Год"
          />
        </Field.Root>
        <Field.Root>
          <PasswordInput
            w={"120px"}
            value={cardData.expiryCvv}
            onChange={handleCvv}
            placeholder="CVV"
          />
        </Field.Root>
      </Card.Footer>
    </Card.Root>
  );
};

export default BankCardOut;
