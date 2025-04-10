import Header from "@/components/ui/Header";
import BankTable from "@/components/ui/BankTable";
import { Box } from "@chakra-ui/react";

const TablePage = () => {
  return (
    <Box w={"80vw"} h={"100vh"}>
      <Header></Header>
      <BankTable></BankTable>
    </Box>
  );
};

export default TablePage;
