import { Box, Table } from "@chakra-ui/react";
import { useTransactionStore } from "@/store/transactionsStore";

const BankTable = () => {
  const transactions = useTransactionStore((state) => state.transactions);

  const formatCardNumber = (cardNumber: string) => {
    if (!cardNumber) return "Н/Д";
    const parts = cardNumber.split(" ");
    if (parts.length !== 4) return cardNumber;

    return `${parts[0].slice(0, 2)}** **** **** ${parts[3]}`;
  };

  const formatAmount = (amount: number | null | undefined) => {
    if (amount === null || amount === undefined) {
      return "0.00";
    }

    const numAmount = typeof amount === "number" ? amount : parseFloat(amount);

    if (isNaN(numAmount)) {
      return "0.00";
    }

    return numAmount.toFixed(2);
  };

  return (
    <Box p={["10px", "50px"]}>
      <Table.Root size={["sm", "md", "lg"]} color={"black"} variant={"outline"}>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>Отправитель</Table.ColumnHeader>
            <Table.ColumnHeader>Получатель</Table.ColumnHeader>
            <Table.ColumnHeader textAlign="end">
              Сумма перевода
            </Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {transactions.length === 0 ? (
            <Table.Row>
              <Table.Cell colSpan={3} textAlign="center">
                Нет данных о транзакциях
              </Table.Cell>
            </Table.Row>
          ) : (
            transactions.map((transaction) => (
              <Table.Row key={transaction.id}>
                <Table.Cell>{formatCardNumber(transaction.sender)}</Table.Cell>
                <Table.Cell>
                  {formatCardNumber(transaction.recipient)}
                </Table.Cell>
                <Table.Cell textAlign="end">
                  {formatAmount(transaction.amount)} ₽
                </Table.Cell>
              </Table.Row>
            ))
          )}
        </Table.Body>
      </Table.Root>
    </Box>
  );
};

export default BankTable;
