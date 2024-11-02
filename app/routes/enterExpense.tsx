import { useNavigate } from "@remix-run/react";
import { redButtonCss, blueButtonCss, textInputCss } from "../constants";
import { ActionFunctionArgs } from "@remix-run/node";
import { PrismaClient } from "@prisma/client";
import { zfd } from "zod-form-data";
import { z } from "zod";

const expenseSchema = zfd.formData({
  category: zfd.text(),
  description: zfd.text(),
  amount: zfd.numeric(),
  date: zfd.text(),
  paymentUsed: zfd.numeric(),
  recurring: zfd.text(z.coerce.boolean()),
  shared: zfd.text(),
});

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
  // here is where write and update will be called
  const prisma = new PrismaClient();

  const user_id = 1;
  // const amount = +body.get("cost");
  // const description = body.get("description") as string;
  // const category = body.get("category") as string;
  // const payment_method = 0;
  // const recurring = false;

  const createExpense = await prisma.expenses.create({
    data: {
      category: category,
      description: description,
      user_id: user_id,
      amount: amount,
      date: new Date(date as string).toISOString(),
      payment_method: paymentUsed,
      recurring: recurring,
      shared: shared,
    },
  });
  return "";
}

export default function enterExpense() {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen items-top justify-center">
      <div className="flex flex-col items-left gap-16">
        <form
          method="POST"
          className="flex flex-col gap-2"
          name="expenseForm"
          action="/enterExpense"
        >
          <b className="w-100">Date</b>
          <input
            className={textInputCss}
            alt="Expense Date"
            name="date"
            type="date"
            required
          ></input>
          <b>Cost</b>
          <input
            className={textInputCss}
            alt="Expense Amount"
            name="amount"
            type="number"
            required
          ></input>
          <b>Category</b>
          <input
            className={textInputCss}
            alt="Expense Category"
            name="category"
            type="text"
            required
          ></input>
          <b>Description</b>
          <input
            className={textInputCss}
            alt="Expense Description"
            name="description"
            type="text"
          ></input>
          <b>Payment Used</b>
          <input
            className={textInputCss}
            alt="Expense Payment Used"
            name="paymentUsed"
            type="number"
          ></input>
          <b>shared</b>
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
          <button type="submit" className={blueButtonCss}>
            Submit
          </button>
        </form>
        <button
          onClick={() => navigate("../homePage")}
          className={redButtonCss}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
