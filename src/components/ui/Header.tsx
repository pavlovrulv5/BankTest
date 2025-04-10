import {
  Box,
  Flex,
  HStack,
  Link,
  Button,
  Icon,
  // useColorModeValue, Убрали импорт useColorModeValue
} from "@chakra-ui/react";
import { FaFacebook, FaTwitter, FaInstagram, FaFrog } from "react-icons/fa";

function Header() {
  const bgColor = "gray.50"; // Светло-серый фон
  const linkColor = "gray.700"; // Темно-серый цвет ссылок
  const hoverColor = "blue.500"; // Синий цвет при наведении
  const iconColor = "gray.500"; // Серый цвет иконок
  const iconHoverColor = "blue.600"; // Синий цвет иконок при наведении

  return (
    <Box
      bg={bgColor}
      w={"100%"}
      paddingLeft={"30px"}
      paddingRight={"30px"}
      marginBottom={"80px"}
    >
      <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
        <Box>
          <Icon size={"2xl"} color={"green"}>
            <FaFrog />
          </Icon>
        </Box>

        <HStack alignItems={"center"}>
          <HStack
            as={"nav"}
            display={{ base: "none", md: "flex" }}
            gap={"100px"}
          >
            <Link
              href={"/"}
              color={linkColor}
              _hover={{ textDecoration: "none", color: hoverColor }}
            >
              Главная
            </Link>
            <Link
              href={"/table"}
              color={linkColor}
              _hover={{ textDecoration: "none", color: hoverColor }}
            >
              Таблица
            </Link>
          </HStack>
        </HStack>
        <Flex alignItems={"center"} gap={"20px"}>
          <Button
            as="a"
            aria-label="Facebook"
            color={iconColor}
            _hover={{ color: iconHoverColor }}
            variant="ghost"
            p={0}
            minW="auto"
          >
            <FaFacebook />
          </Button>
          <Button
            as="a"
            aria-label="Twitter"
            color={iconColor}
            _hover={{ color: iconHoverColor }}
            variant="ghost"
            p={0}
            minW="auto"
          >
            <FaTwitter />
          </Button>
          <Button
            as="a"
            aria-label="Instagram"
            color={iconColor}
            _hover={{ color: iconHoverColor }}
            variant="ghost"
            p={0}
            minW="auto"
          >
            <FaInstagram />
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
}

export default Header;
