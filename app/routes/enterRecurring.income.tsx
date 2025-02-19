import { incomeEntryMap, incomeInputTypeMap } from "../constants";
import FormFooter from "../components/FormFooter";

export default function enterRecurringIncome() {
  return (
    <div className="flex h-screen items-top justify-center">
      <div className="flex flex-col gap-2 w-[200px]">
        <form
          method="POST"
          className="flex flex-col gap-2"
          name="recurringIncomeForm"
          action="/enterRecurring/income"
        >
          <FormFooter />
        </form>
      </div>
    </div>
  );
}
