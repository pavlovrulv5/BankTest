import { Button, Card, Field, Input } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useTransactionStore } from "@/store/transactionsStore";
import { toaster } from "@/components/ui/toaster";

export interface InputCardProps {
  senderCard: {
    cardNumber: string;
    expiryMonth: string;
    expiryYear: string;
    expiryCvv: string;
  };
  recipientCard: {
    cardNumber: string;
  };
  setCardData: (data: {
    cardNumber: string;
    expiryMonth: string;
    expiryYear: string;
    expiryCvv: string;
  }) => void;
  setRecipientCardData: (data: { cardNumber: string }) => void;
  globalIsValidate: boolean;
}

export const InputCard = ({
  senderCard,
  recipientCard,
  setCardData,
  setRecipientCardData,
  globalIsValidate,
}: InputCardProps) => {
  const addTransaction = useTransactionStore((state) => state.addTransaction);

  const [amount, setAmount] = useState({
    amount: 0,
    commission: 0,
    total: 0,
  });

  const [errors, setErrors] = useState({
    amount: "",
  });

  const handleAmountChange = (event: { target: { value: string } }) => {
    const value = event.target.value.replace(/[^0-9.]/g, "");
    const limitedValue = value.slice(0, 15);
    if (isNaN(parseInt(value))) {
      setAmount({
        ...amount,
        amount: 0,
      });
    }
    if (limitedValue === "" || parseFloat(limitedValue) <= 0) {
      setErrors((prev) => ({
        ...prev,
        amount: "Неверно указана сумма",
      }));
    } else {
      setErrors((prev) => ({
        ...prev,
        amount: "",
      }));
    }

    setAmount({
      ...amount,
      amount: parseInt(limitedValue),
    });
  };

  useEffect(() => {
    const current = amount.amount || 0;
    const currentCommission = (current / 100) * 5;
    const currentTotal = current + currentCommission;

    setAmount((prev) => ({
      ...prev,
      commission: currentCommission,
      total: currentTotal,
    }));
  }, [amount.amount]);

  const handleConfirm = () => {
    let isValidate = true;
    if (!globalIsValidate) {
      isValidate = false;
      toaster.create({
        title: "Ошибка валидации",
        description:
          "Пожалуйста, проверьте правильность данных банковских карт.",
        type: "warning",
      });
    }
    if (!amount.amount) {
      isValidate = false;
      setErrors((prev) => ({
        ...prev,
        amount: "Неверно указана сумма",
      }));
      toaster.create({
        title: "Ошибка валидации",
        description: "Пожалуйста, введите сумму.",
        type: "warning",
      });
      return; // Stop further processing
    }
    if (amount.amount === 0) {
      isValidate = false;
      toaster.create({
        title: "Ошибка валидации",
        description: "Сумма перевода не может быть равна 0.",
        type: "warning",
      });
    }
    setErrors((prev) => ({
      // If all ok, remove errors
      ...prev,
      amount: "",
    }));
    if (isValidate) {
      addTransaction({
        sender: senderCard.cardNumber,
        recipient: recipientCard.cardNumber,
        amount: amount.amount,
        commission: amount.commission,
        total: amount.total,
      });
      toaster.create({
        title: "Перевод выполнен успешно",
        type: "success",
      });
      setCardData({
        cardNumber: "",
        expiryMonth: "",
        expiryYear: "",
        expiryCvv: "",
      });
      setRecipientCardData({
        cardNumber: "",
      });
      setAmount({
        amount: 0,
        commission: 0,
        total: 0,
      });
    }
  };

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
          <Input
            value={amount.amount}
            onChange={handleAmountChange}
            type="number"
          />
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
          <Input
            value={amount.commission.toFixed(2)}
            readOnly
            color={"black"}
          />
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
          <Input value={amount.total.toFixed(2)} readOnly />
        </Field.Root>
        <Card.Title fontSize={"18px"} textAlign="right">
          РУБ.
        </Card.Title>
      </Card.Footer>
      <Field.Root alignItems={"center"} justifyContent="flex-start" px="185px">
        <Button
          color={"white"}
          bg={"green"}
          variant="subtle"
          size="xs"
          onClick={handleConfirm}
        >
          ПОДТВЕРДИТЬ
        </Button>
      </Field.Root>
    </Card.Root>
  );
};

export default InputCard;
