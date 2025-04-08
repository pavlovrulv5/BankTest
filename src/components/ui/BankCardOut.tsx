import { Card, Field, Input, Stack } from "@chakra-ui/react";
import { PasswordInput } from "./password-input";
import React, { useState } from "react";

export const BankCardOut = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [expiryMonth, setExpiryMonth] = useState("");
  const [expiryYear, setExpiryYear] = useState("");
  const [expiryCvv, setexpiryCvv] = useState("");
  const [errors, setErrors] = useState({
    cardNumber: "",
    expiryMonth: "",
    expiryYear: "",
    expiryCvv: "",
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

  const handleExpiryMonthChange = (event) => {
    const value = event.target.value.replace(/[^0-9]/g, "");
    const limitedValue = value.slice(0, 2);
    if (limitedValue.length < 2) {
      setErrors((prev) => ({
        ...prev,
        expiryMonth: "Неверно указан месяц",
      }));
    }
    setExpiryMonth(limitedValue);
  };

  const handleExpiryYearChange = (event) => {
    const value = event.target.value.replace(/[^0-9]/g, "");
    const limitedValue = value.slice(0, 2);
    if (limitedValue.length < 2) {
      setErrors((prev) => ({
        ...prev,
        expiryYear: "Неверно указан год",
      }));
    }
    setExpiryYear(limitedValue);
  };
  const handleCvv = (event) => {
    const value = event.target.value.replace(/[^0-9]/g, "");
    const limitedValue = value.slice(0, 3);
    if (limitedValue.length < 3) {
      setErrors((prev) => ({
        ...prev,
        expiryCvv: "Неверно указан CVV",
      }));
    }
    setexpiryCvv(limitedValue);
  };

  return (
    <Card.Root maxW="sm" w={"1000px"} h={"220px"}>
      <Card.Header>
        <Card.Description fontSize={"30px"}>Отправитель</Card.Description>
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
      <Card.Footer flexDirection={"row"} w={"100%"}>
        <Field.Root
          flexDirection={"row"}
          gap={"10px"}
          alignItems={"center"}
          marginRight={"20px"}
        >
          <Input
            w={"80px"}
            value={expiryMonth}
            onChange={handleExpiryMonthChange}
            placeholder="Месяц"
          />
          /
          <Input
            w={"80px"}
            value={expiryYear}
            onChange={handleExpiryYearChange}
            placeholder="Год"
          />
        </Field.Root>
        <Field.Root>
          <PasswordInput
            w={"120px"}
            value={expiryCvv}
            onChange={handleCvv}
            placeholder="CVV"
          />
        </Field.Root>
      </Card.Footer>
    </Card.Root>
  );
};

export default BankCardOut;
