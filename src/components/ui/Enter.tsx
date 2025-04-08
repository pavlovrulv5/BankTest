import { useState } from "react";
import { Button, Card, Field, Input, Stack, Text } from "@chakra-ui/react";
import { PasswordInput } from "./password-input";
import { toaster } from "@/components/ui/toaster";

export const Enter = () => {
  const [formData, setFormData] = useState({
    login: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    login: "",
    password: "",
  });

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { login: "", password: "" };

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

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      // Simulate login attempt
      try {
        // Here you would typically make an API call for authentication
        console.log("Login attempt with:", formData);

        // Show success toast
        toaster.create({
          title: "Вход выполнен успешно",
          type: "success",
        });

        // Reset form after successful login
        setFormData({ login: "", password: "" });
      } catch (error) {
        // Show error toast
        toaster.create({
          title: "Ошибка входа",
          description: "Неверный логин или пароль",
          type: "error",
        });
      }
    } else {
      // Show validation error toast
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
