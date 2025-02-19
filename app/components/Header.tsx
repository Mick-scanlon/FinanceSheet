import LeftToSpend from "./LeftToSpend";

interface props {
  sillyNumber: number;
}

export default function Header({ sillyNumber }: props) {
  return (
    <header className="flex mt-5 flex-col items-center">
      <h1 className="leading text-2xl font-bold text-gray-800 dark:text-gray-100">
        OurFinanceApp
      </h1>
      <h3 className="leading text-xl font-bold text-gray-800 dark:text-gray-100">
        Left to Spend
      </h3>
      <LeftToSpend sillyNumber={sillyNumber} />
    </header>
  );
}
