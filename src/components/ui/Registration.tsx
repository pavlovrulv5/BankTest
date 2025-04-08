import { useState } from "react";
import {
  Button,
  Card,
  Field,
  Input,
  Stack,
  Text,
  Checkbox,
} from "@chakra-ui/react";
import { PasswordInput } from "./password-input";
import { toaster } from "@/components/ui/toaster";

export const Registration = () => {
  const [formData, setFormData] = useState({
    login: "",
    password: "",
    confirmPassword: "",
    agreement: false,
  });

  const [errors, setErrors] = useState({
    login: "",
    password: "",
    confirmPassword: "",
    agreement: "",
  });

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Очистить ошибку при вводе данных пользователем
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const handleCheckboxChange = () => {
    setFormData((prev) => ({
      ...prev,
      agreement: !prev.agreement,
    }));
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      login: "",
      password: "",
      confirmPassword: "",
      agreement: "",
    };

    // Login validation
    if (!formData.login.trim()) {
      newErrors.login = "Логин обязателен";
      isValid = false;
    } else if (formData.login.length < 3) {
      newErrors.login = "Логин должен содержать не менее 3 символов";
      isValid = false;
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Пароль обязателен";
      isValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = "Пароль должен содержать не менее 6 символов";
      isValid = false;
    }

    // Валидация совпадения паролей
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Подтверждение пароля обязательно";
      isValid = false;
    }
    if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = "Пароли не совпадают";
      isValid = false;
    }

    // Валидация соглашения
    if (!formData.agreement) {
      newErrors.agreement = "Необходимо согласие на обработку данных";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      try {
        console.log("Registration attempt with:", formData);

        toaster.create({
          title: "Регистрация выполнена успешно",
          type: "success",
        });

        // Reset form after successful registration
        setFormData({
          login: "",
          password: "",
          confirmPassword: "",
          agreement: false,
        });
      } catch (error) {
        toaster.create({
          title: "Ошибка регистрации",
          description: "Произошла ошибка при регистрации",
          type: "error",
        });
      }
    } else {
      toaster.create({
        title: "Ошибка валидации",
        description: "Пожалуйста, проверьте введенные данные",
        type: "warning",
      });
    }
  };

  return (
    <Card.Root w="400px" minH={"500px"} maxH={"1000px"}>
      <Card.Header>
        <Card.Title>Регистрация</Card.Title>
        <Card.Description>
          Пожалуйста, укажите свои учетные данные для регистрации.
        </Card.Description>
      </Card.Header>
      <Card.Body>
        <Stack gap="4" w="full">
          <Field.Root>
            <Field.Label>Логин</Field.Label>
            <Input
              name="login"
              value={formData.login}
              onChange={handleInputChange}
            />
            {errors.login && <Text color={"red"}>{errors.login}</Text>}
          </Field.Root>
          <Field.Root>
            <Field.Label>Пароль</Field.Label>
            <PasswordInput
              name="password"
              value={formData.password}
              onChange={handleInputChange}
            />
            {errors.password && <Text color={"red"}>{errors.password}</Text>}
          </Field.Root>
          <Field.Root>
            <Field.Label>Повторите пароль</Field.Label>
            <PasswordInput
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
            />
            {errors.confirmPassword && (
              <Text color={"red"}>{errors.confirmPassword}</Text>
            )}
          </Field.Root>
          <Checkbox.Root
            checked={formData.agreement}
            onChange={handleCheckboxChange}
            variant={"outline"}
            marginTop={"10px"}
          >
            <Checkbox.HiddenInput />
            <Checkbox.Control />
            <Checkbox.Label>
              Я согласен на обработку персональных данных
            </Checkbox.Label>
          </Checkbox.Root>
          {errors.agreement && <Text color={"red"}>{errors.agreement}</Text>}
        </Stack>
      </Card.Body>
      <Card.Footer justifyContent="flex-end">
        <Button variant="outline" onClick={handleSubmit}>
          Зарегистрироваться
        </Button>
      </Card.Footer>
    </Card.Root>
  );
};

export default Registration;
