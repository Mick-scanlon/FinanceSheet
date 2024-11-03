import { useLoaderData, useNavigate } from "@remix-run/react";
import { blueButtonCss, redButtonCss } from "../constants";
import { PrismaClient } from "@prisma/client";
import { zfd } from "zod-form-data";
import { z } from "zod";
import ExpenseTable from "../components/ExpenseTable";

export const loader = async () => {
  const prisma = new PrismaClient();
  const userId = 1;
  // get expenses
  const expenses = await prisma.expenses.findMany({
    where: { user_id: userId },
  });
  return expenses;
};

export default function homePage() {
  const navigate = useNavigate();
  const data = useLoaderData<typeof loader>();

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
        <ExpenseTable expenses={data} />
        <button onClick={() => navigate("/")} className={redButtonCss}>
          Logout
        </button>
      </div>
    </div>
  );
}
