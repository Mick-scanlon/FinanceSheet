import { useNavigate } from "@remix-run/react";
import { blueButtonCss, redButtonCss } from "../constants";

export default function homePage() {
  const navigate = useNavigate();
  return (
    <div className="flex h-screen items-top justify-center">
      <div className="flex flex-col items-center gap-10">
        <header className="flex mt-5 flex-col items-center gap-9">
          <h1 className="leading text-2xl font-bold text-gray-800 dark:text-gray-100">
            MyFinanceApp
          </h1>
        </header>
        <div className="h-[44px] w-[380px]">
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
        <nav className="">
          <p className="leading-6 text-gray-700 dark:text-gray-200">
            Previous Expenses here
          </p>
        </nav>
        <button onClick={() => navigate("/")} className={redButtonCss}>
          Logout
        </button>
      </div>
    </div>
  );
}
