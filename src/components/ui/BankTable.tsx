import { Table } from "@chakra-ui/react";

const BankTable = () => {
  return (
    <Table.Root size="sm">
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
        {items.map((item) => (
          <Table.Row key={item.id}>
            <Table.Cell>{item.sender}</Table.Cell>
            <Table.Cell>{item.recipient}</Table.Cell>
            <Table.Cell textAlign="end">{item.amount}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};

const items = [
  {
    id: 1,
    sender: "1111 1111 1111 1111",
    recipient: "2222 2222 2222 2222",
    amount: 999.99,
  },
  {
    id: 2,
    sender: "1111 1111 1111 1111",
    recipient: "2222 2222 2222 2222",
    amount: 49.99,
  },
  {
    id: 3,
    sender: "1111 1111 1111 1111",
    recipient: "2222 2222 2222 2222",
    amount: 150.0,
  },
  {
    id: 4,
    sender: "111111 1111 1111 1111",
    recipient: "2222 2222 2222 2222",
    amount: 799.99,
  },
  {
    id: 5,
    sender: "1111 1111 1111 1111",
    recipient: "2222 2222 2222 2222",
    amount: 199.99,
  },
];

export default BankTable;
