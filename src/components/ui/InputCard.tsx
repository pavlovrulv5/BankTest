import { Button, Card, Field, Input } from "@chakra-ui/react";
import { a } from "framer-motion/m";
import React, { useEffect, useState } from "react";

export const InputCard = () => {
  const [amount, setAmount] = useState({ amount: 0, commission: 0, total: 0 });
  const [errors, setErrors] = useState({
    cardNumber: "",
  });
  const handleAmountChange = (event) => {
    const value = event.target.value.replace(/[^0-9.]/g, "");
    const limitedValue = value.slice(0, 15);
    if (limitedValue.length < 15) {
      setErrors((prev) => ({
        ...prev,
        cardNumber: "Неверно указана сумма",
      }));
    }
    setAmount((prev) => ({
      ...prev,
      amount: limitedValue,
    }));
  };
  useEffect(() => {
    const current = amount.amount;
    const currentCommission = (current / 100) * 5;
    const currentTotal = parseInt(current) + currentCommission;
    setAmount((prev) => ({
      ...prev,
      commission: currentCommission,
      total: currentTotal,
    }));
    console.log(amount);
  }, [amount.amount]);
  return (
    <Card.Root maxW={"600px"} border={"none"} marginTop={"20px"}>
      <Card.Header
        display="grid"
        gridTemplateColumns="140px 1fr 50px"
        alignItems="center"
        gap="20px"
        marginBottom="15px"
      >
        <Card.Description fontSize={"18px"} textAlign="left">
          Сумма перевода
        </Card.Description>
        <Field.Root w={"100%"}>
          <Input value={amount.amount} onChange={handleAmountChange} />
        </Field.Root>
        <Card.Description fontSize={"18px"} textAlign="right">
          РУБ.
        </Card.Description>
      </Card.Header>

      <Card.Body
        display="grid"
        gridTemplateColumns="140px 1fr 50px"
        alignItems="center"
        gap="20px"
      >
        <Card.Description fontSize={"18px"} textAlign="left">
          Комиссия за перевод
        </Card.Description>
        <Field.Root>
          <Input value={amount.commission} readOnly color={"black"} />
        </Field.Root>
        <Card.Description fontSize={"18px"} textAlign="right">
          РУБ.
        </Card.Description>
      </Card.Body>

      <Card.Footer
        display="grid"
        gridTemplateColumns="140px 1fr 50px"
        alignItems="center"
        gap="20px"
      >
        <Card.Title fontSize={"18px"} textAlign="left">
          Итого с учетом комиссии
        </Card.Title>
        <Field.Root>
          <Input value={amount.total} readOnly />
        </Field.Root>
        <Card.Title fontSize={"18px"} textAlign="right">
          РУБ.
        </Card.Title>
      </Card.Footer>
      <Field.Root alignItems={"center"} justifyContent="flex-start" px="185px">
        <Button color={"white"} bg={"green"} variant="subtle" size="xs">
          ПОДТВЕРДИТЬ
        </Button>
      </Field.Root>
    </Card.Root>
  );
};
export default InputCard;
