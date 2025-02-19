import { expenses, income } from "@prisma/client";

export const getSumExpenses = async (expenses: expenses[]): Promise<number> => {
  let result = 0;
  expenses.forEach((expense) => {
    result += expense.amount ?? 0;
  });
  return result;
};

export const getSumNetIncome = async (income: income[]): Promise<number> => {
  let result = 0;
  income.forEach((income) => {
    result +=
      (income.amount_gross ?? 0) -
      (income.amount_post ?? 0) -
      (income.amount_tax ?? 0) -
      (income.amount_pre ?? 0);
  });
  return result;
};
