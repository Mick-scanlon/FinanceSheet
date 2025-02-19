import { useLoaderData, useNavigate } from "@remix-run/react";
import {
  blueButtonCss,
  previewExpenseTableHeaders,
  previewIncomeTableHeaders,
  redButtonCss,
} from "../constants";
import BaseTable from "../components/BaseTable";
import {
  DetermineLeftToSpend,
  getCurrentMonthExpenses,
  getCurrentMonthIncome,
  getLastMonthIncome,
} from "../services/CalculationService";
import Header from "../components/Header";

export const loader = async () => {
  return {
    currMonthExpenses: await getCurrentMonthExpenses(),
    currMonthIncome: await getCurrentMonthIncome(),
    lastMonthIncome: await getLastMonthIncome(),
    sillyNumber: await DetermineLeftToSpend(),
  };
};

export default function homePage() {
  const navigate = useNavigate();
  const expenses = useLoaderData<typeof loader>().currMonthExpenses;
  const income = useLoaderData<typeof loader>().lastMonthIncome;
  const sillyNumber = useLoaderData<typeof loader>().sillyNumber;

  return (
    <div className="flex h-screen items-top justify-center">
      <div className="flex flex-col items-center gap-5 w-[300px]">
        <Header sillyNumber={sillyNumber} />
        <h1 className="leading text-xl font-bold text-gray-800 dark:text-gray-100">
          Add One-Time
        </h1>
        <div className="h-[44px] space-x-5">
          <button
            onClick={() => navigate("/enterOneTime/expense")}
            className={blueButtonCss + " float-left"}
          >
            Expense
          </button>
          <button
            onClick={() => navigate("/enterOneTime/income")}
            className={blueButtonCss + " float-right"}
          >
            Income
          </button>
        </div>
        {/* <h1 className="text-lg">Add Recurring</h1>
        <div className="h-[44px] space-x-5">
          <button
            onClick={() => navigate("/enterRecurring/expense")}
            className={blueButtonCss + " float-left"}
          >
            Expense
          </button>
          <button
            onClick={() => navigate("/enterRecurring/income")}
            className={blueButtonCss + " float-right"}
          >
            Income
          </button>
        </div>
        <div className="flex flex-col items-center ">
          <h1 className="text-lg">Expenses</h1>
          <BaseTable
            content={expenses}
            headers={previewExpenseTableHeaders}
            type="expense"
          />
          <button
            onClick={() => navigate("/viewExpenses")}
            className={blueButtonCss + " mt-2"}
          >
            View All Expenses
          </button>
          <h1 className="text-lg mt-4">Income</h1>
          <BaseTable
            content={income}
            headers={previewIncomeTableHeaders}
            type="income"
          />
          <button
            onClick={() => navigate("/viewIncome")}
            className={blueButtonCss + " mt-2"}
          >
            View All Income
          </button>
        </div> */}
        <button
          onClick={() => navigate("/")}
          className={redButtonCss + " mt-5"}
        >
          Logout
        </button>
      </div>
    </div>
  );
}
