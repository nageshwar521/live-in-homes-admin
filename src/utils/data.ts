import { faker } from "@faker-js/faker";

export const mockTransactionData = () => {
  return Array.from({ length: 10000 }, (_, i) => ({
    id: i,
    name: faker.person.fullName(),
    email: faker.internet.email(),
    amount: faker.finance.amount(),
    date: faker.date.past(),
    status: faker.word.words(),
  }));
};

export const mockTransactionDataColumns = () => {
  return [
    { field: "id", headerName: "ID" },
    {
      field: "name",
      headerName: "Name",
      sortable: true,
      filter: "agSetColumnFilter",
      filterParams: {
        caseSensitive: true,
      },
    },
    { field: "email", headerName: "Email" },
    { field: "amount", headerName: "Amount" },
    { field: "date", headerName: "Date" },
    { field: "status", headerName: "Status" },
  ];
};
