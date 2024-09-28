import { useNavigate } from "@remix-run/react";

export default function homePage() {
  const navigate = useNavigate();
  return (
    <div className="flex h-screen items-top justify-center">
      <div className="flex flex-col items-center gap-16">
        <header className="flex flex-col items-center gap-9">
          <button
            onClick={() => navigate("/")}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded float-left"
          >
            Logout
          </button>
          <h1 className="leading text-2xl font-bold text-gray-800 dark:text-gray-100">
            The App
          </h1>
        </header>
        <div className="h-[144px] w-[434px]">
          <button
            onClick={() => navigate("/enterExpense")}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded float-left"
          >
            Add Expense
          </button>
          <button
            onClick={() => navigate("/enterIncome")}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded float-right"
          >
            Add Income
          </button>
        </div>
        <nav className="flex flex-col items-center justify-center gap-4 rounded-3xl border border-gray-200 p-6 dark:border-gray-700">
          <p className="leading-6 text-gray-700 dark:text-gray-200">
            Previous Expenses here
          </p>
        </nav>
      </div>
    </div>
  );
}
