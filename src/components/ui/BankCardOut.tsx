import { Card, Field, Input, Stack, InputGroup } from "@chakra-ui/react";
import { LuCreditCard } from "react-icons/lu";
import { usePaymentInputs } from "react-payment-inputs";
import { useState, useEffect } from "react";

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
    cardNumber: "",
    expiryMonth: "",
    expiryYear: "",
    expiryCvv: "",
  });
  const { wrapperProps, getCardNumberProps } = usePaymentInputs();
  useEffect(() => {
    const isValid =
      !errors.cardNumber &&
      !errors.expiryMonth &&
      !errors.expiryYear &&
      !errors.expiryCvv &&
      cardData.cardNumber.length === 19 &&
      cardData.expiryMonth.length === 2 &&
      cardData.expiryYear.length === 2 &&
      cardData.expiryCvv.length === 3;

    setIsValidate(isValid);
  }, [errors, cardData, setIsValidate]);

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

    if (
      limitedValue.length < 2 ||
      parseInt(limitedValue) > 12 ||
      parseInt(limitedValue) < 1
    ) {
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

    setCardData({
      ...cardData,
      expiryCvv: limitedValue,
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
        <Card.Description fontSize={"30px"}>Отправитель</Card.Description>
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
      <Card.Footer flexDirection={"row"} w={"100%"}>
        <Field.Root invalid={!!errors.expiryMonth}>
          <Input
            w={"80px"}
            value={cardData.expiryMonth}
            onChange={handleExpiryMonthChange}
            placeholder="Месяц"
          />
        </Field.Root>
        <Field.Root invalid={!!errors.expiryYear}>
          <Input
            w={"80px"}
            value={cardData.expiryYear}
            onChange={handleExpiryYearChange}
            placeholder="Год"
          />
        </Field.Root>
        <Field.Root invalid={!!errors.expiryCvv}>
          <Input
            w={"135px"}
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
