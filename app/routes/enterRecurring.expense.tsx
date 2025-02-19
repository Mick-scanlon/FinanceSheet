import FormInput from "../components/FormInput";
import {
  expenseEntryMap,
  expenseInputTypeMap,
  expenseSchema,
} from "../constants";
import { ActionFunctionArgs } from "@remix-run/node";
import { PrismaClient } from "@prisma/client";
import FormFooter from "../components/FormFooter";

export async function action({ request }: ActionFunctionArgs) {
  const {
    category,
    description,
    amount,
    date,
    paymentUsed,
    recurring,
    shared,
  } = expenseSchema.parse(await request.formData());

  const prisma = new PrismaClient();

  //change once session storage works
  const user_id = 1;

  const createExpense = await prisma.expenses.create({
    data: {
      category: category,
      description: description,
      user_id: user_id,
      amount: amount,
      date: new Date(date as string).toISOString(),
      payment_method: paymentUsed,
      recurring: true,
      shared: shared,
    },
  });
  return "";
}

export default function enterRecurringExpense() {
  let labels: string[] = [];
  for (let label of expenseEntryMap.keys()) {
    labels.push(label);
  }

  return (
    <div className="flex h-screen items-top justify-center">
      <div className="flex flex-col gap-2 w-[200px]">
        <form
          method="POST"
          className="flex flex-col gap-2"
          name="recurringExpenseForm"
          action="/enterRecurring/expense"
        >
          <b className="text-md mt-6">Add Recurring Expense</b>
          {labels.map((label) => (
            <FormInput
              label={label}
              nameMap={expenseEntryMap}
              inputTypeMap={expenseInputTypeMap}
            />
          ))}
          <b>Shared?</b>
          <label>
            <input
              className="m-2"
              alt="Expense shared"
              name="shared"
              type="radio"
              value={"Shared"}
            ></input>
            Shared
          </label>
          <label>
            <input
              className="m-2"
              alt="Expense shared"
              name="shared"
              type="radio"
              value={"Owed"}
            ></input>
            Owed
          </label>
          <label>
            <input
              className="m-2"
              alt="Expense shared"
              name="shared"
              type="radio"
              value={"Not"}
              defaultChecked
            ></input>
            Not shared
          </label>
          <FormFooter />
        </form>
      </div>
    </div>
  );
}
