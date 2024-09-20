import type { MetaFunction } from "@remix-run/node";
import home

export const meta: MetaFunction = () => {
  return [
    { title: "MyFinances" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-16">
        <header className="flex flex-col items-center gap-9">
          <h1 className="leading text-2xl font-bold text-gray-800 dark:text-gray-100">
            The App<span className="sr-only">Remix</span>
          </h1>
          <div className="h-[144px] w-[434px]">
            <button>Add Expense</button>
            <button>Add Income</button>
          </div>
        </header>
        <nav className="flex flex-col items-center justify-center gap-4 rounded-3xl border border-gray-200 p-6 dark:border-gray-700">
          <p className="leading-6 text-gray-700 dark:text-gray-200">
            Transactions here
          </p>
        </nav>
      </div>
    </div>
  );
}