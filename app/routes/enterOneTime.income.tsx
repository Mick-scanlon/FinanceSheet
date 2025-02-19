import { useNavigate } from "@remix-run/react";
import {
  redButtonCss,
  blueButtonCss,
  textInputCss,
  incomeEntryMap,
  incomeInputTypeMap,
} from "../constants";
import { ActionFunctionArgs } from "@remix-run/node";
import { PrismaClient } from "@prisma/client";
import { zfd } from "zod-form-data";
import FormFooter from "../components/FormFooter";

const incomeSchema = zfd.formData({
  amount_gross: zfd.numeric(),
  amount_tax: zfd.numeric(),
  amount_pre: zfd.numeric(),
  amount_post: zfd.numeric(),
  date: zfd.text(),
});

export async function action({ request }: ActionFunctionArgs) {
  const { amount_gross, amount_pre, amount_tax, amount_post, date } =
    incomeSchema.parse(await request.formData());

  const prisma = new PrismaClient();
  // TODO add id get
  const userId = 1;

  const createIncome = await prisma.income.create({
    data: {
      amount_gross: amount_gross,
      amount_tax: amount_tax,
      amount_pre: amount_pre,
      amount_post: amount_post,
      paid_date: new Date(date as string).toISOString(),
      user_id: userId,
    },
  });
  return "";
}

export default function enterOneTimeIncome() {
  const navigate = useNavigate();

  let labels: string[] = [];
  for (let label of incomeEntryMap.keys()) {
    labels.push(label);
  }

  return (
    <div className="flex h-screen items-top justify-center">
      <div className="flex flex-col gap-2 w-[200px]">
        <form
          method="POST"
          className="flex flex-col gap-2"
          name="oneTimeIncomeForm"
          action="/enterOneTime/income"
        >
          <b className="text-xl mt-6">Add One-Time Income</b>
          {labels.map((label) => (
            <FormInput label={label} />
          ))}
          <button type="submit" className={blueButtonCss + " mt-6"}>
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

// TODO combine with expense function
export function FormInput(props: { label: string }) {
  return (
    <>
      <label>{props.label}</label>
      <input
        min="0"
        max="99999"
        step="0.01"
        className={textInputCss}
        name={incomeEntryMap.get(props.label)}
        type={incomeInputTypeMap.get(props.label)}
        required
      ></input>
    </>
  );
}
