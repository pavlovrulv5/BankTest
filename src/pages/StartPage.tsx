import Enter from "@/components/ui/Enter";
import Registration from "@/components/ui/Registration";
import { Tabs, Box } from "@chakra-ui/react";

const StartPage = () => {
  return (
    <Box w={"100%"} h={"100%"}>
      {" "}
      <Tabs.Root variant="enclosed" fitted defaultValue={"Enter"}>
        <Tabs.List gap={"5px"} whiteSpace={"nowrap"}>
          <Tabs.Trigger value="Enter">Вход</Tabs.Trigger>
          <Tabs.Trigger value="Registration">Регистрация</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="Enter">
          <Enter />
        </Tabs.Content>
        <Tabs.Content value="Registration">
          <Registration />
        </Tabs.Content>
      </Tabs.Root>
    </Box>
  );
};

export default StartPage;
