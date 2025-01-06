import { useLoaderData, useNavigate } from "@remix-run/react";
import {
  blueButtonCss,
  expenseHeaders,
  incomeHeaders,
  redButtonCss,
} from "../constants";
import { PrismaClient } from "@prisma/client";
import { zfd } from "zod-form-data";
import { z } from "zod";
import BaseTable from "../components/BaseTable";

export const loader = async () => {
  var expenseArray: any[] = [];
  var incomeArray: any[] = [];

  const prisma = new PrismaClient();
  const userId = 1;
  // get expenses, order of select statement is important
  const expenses = await prisma.expenses.findMany({
    where: { user_id: userId },
    select: {
      date: true,
      category: true,
      amount: true,
      description: true,
      shared: true,
      recurring: true,
    },
  });
  expenses.forEach((expense) => expenseArray.push(Object.entries(expense)));
  // get expenses, order of select statement is important
  const income = await prisma.income.findMany({
    where: { user_id: userId },
    select: {
      paid_date: true,
      amount_gross: true,
      amount_pre: true,
      amount_tax: true,
      amount_post: true,
    },
  });
  income.forEach((income) => incomeArray.push(Object.entries(income)));

  return [expenses, income];
};

export default function homePage() {
  const navigate = useNavigate();
  const expenses = useLoaderData<typeof loader>()[0];
  const income = useLoaderData<typeof loader>()[1];
  var expenseArray: any[] = [];
  var incomeArray: any[] = [];

  income.forEach((income) => incomeArray.push(Object.entries(income)));
  expenses.forEach((expense) => expenseArray.push(Object.entries(expense)));
  return (
    <div className="flex h-screen items-top justify-center">
      <div className="flex flex-col items-center gap-10">
        <header className="flex mt-5 flex-col items-center gap-9">
          <h1 className="leading text-2xl font-bold text-gray-800 dark:text-gray-100">
            MyFinanceApp
          </h1>
        </header>
        <div className="h-[44px] w-[300px]">
          <button
            onClick={() => navigate("/enterExpense")}
            className={blueButtonCss + " float-left"}
          >
            Add Expense
          </button>
          <button
            onClick={() => navigate("/enterIncome")}
            className={blueButtonCss + " float-right"}
          >
            Add Income
          </button>
        </div>
        <div>
          <h1>Expenses</h1>
          <BaseTable content={expenseArray} headers={expenseHeaders} />
          <h1>Income</h1>
          <BaseTable content={incomeArray} headers={incomeHeaders} />
        </div>
        <button onClick={() => navigate("/")} className={redButtonCss}>
          Logout
        </button>
      </div>
    </div>
  );
}
