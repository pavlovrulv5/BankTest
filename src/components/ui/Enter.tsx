import { useState } from "react";
import { Button, Card, Field, Input, Stack, Text } from "@chakra-ui/react";
import { PasswordInput } from "./password-input";
import { toaster } from "@/components/ui/toaster";
import { useNavigate } from "react-router-dom";

export const Enter = () => {
  const [formData, setFormData] = useState({
    login: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    login: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (errors.hasOwnProperty(name)) {
      setErrors({
        ...errors,
        [name]: "",
      } as typeof errors);
    }
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { login: "", password: "" };

    if (!formData.login.trim()) {
      newErrors.login = "Логин обязателен";
      isValid = false;
    } else if (formData.login.length < 3) {
      newErrors.login = "Логин должен содержать не менее 3 символов";
      isValid = false;
    }

    if (!formData.password) {
      newErrors.password = "Пароль обязателен";
      isValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = "Пароль должен содержать не менее 6 символов";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      try {
        toaster.create({
          title: "Вход выполнен успешно",
          type: "success",
        });

        setFormData({ login: "", password: "" });

        navigate("/main");
      } catch (error) {
        toaster.create({
          title: "Ошибка входа",
          description: "Неверный логин или пароль",
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
    <Card.Root w="400px" h={"500px"}>
      <Card.Header>
        <Card.Title>Вход в систему</Card.Title>
        <Card.Description>Введите свои учетные данные</Card.Description>
      </Card.Header>
      <Card.Body>
        <Stack gap="8" w="full">
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
        </Stack>
      </Card.Body>
      <Card.Footer justifyContent="flex-end">
        <Button variant="outline" onClick={handleSubmit}>
          Войти
        </Button>
      </Card.Footer>
    </Card.Root>
  );
};

export default Enter;
