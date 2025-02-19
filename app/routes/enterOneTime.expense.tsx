import { useNavigate } from "@remix-run/react";
import {
  redButtonCss,
  blueButtonCss,
  textInputCss,
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
      recurring: false,
      shared: shared,
    },
  });
  return "";
}

export default function enterOneTimeExpense() {
  const navigate = useNavigate();

  let labels: string[] = [];
  for (let label of expenseEntryMap.keys()) {
    labels.push(label);
  }

  return (
    <div className="flex h-screen items-top justify-center">
      <div className="flex flex-col items-left gap-16">
        <form
          method="POST"
          className="flex flex-col gap-2"
          name="expenseForm"
          action="/enterOneTime/expense"
        >
          <b className="text-xl mt-6">Add One Time Expense</b>
          {labels.map((label) => (
            <FormInput label={label} />
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
export function FormInput(props: { label: string }) {
  return (
    <>
      <label>{props.label}</label>
      <input
        min="0"
        max="99999"
        step="1"
        className={textInputCss}
        name={expenseEntryMap.get(props.label)}
        type={expenseInputTypeMap.get(props.label)}
        required
      ></input>
    </>
  );
}
