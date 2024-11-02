import { useNavigate } from "@remix-run/react";
import { redButtonCss, blueButtonCss, textInputCss } from "../constants";
import { ActionFunctionArgs } from "@remix-run/node";
import { PrismaClient } from "@prisma/client";
import { zfd } from "zod-form-data";

const incomeSchema = zfd.formData({
  amountGross: zfd.numeric(),
  amountTax: zfd.numeric(),
  amountPreTax: zfd.numeric(),
  amountPostTax: zfd.numeric(),
  date: zfd.text(),
});

export async function action({ request }: ActionFunctionArgs) {
  const { amountGross, amountPreTax, amountTax, amountPostTax, date } =
    incomeSchema.parse(await request.formData());
  // here is where write and update will be called
  const prisma = new PrismaClient();

  const userId = 1;

  const createIncome = await prisma.income.create({
    data: {
      amount_gross: amountGross,
      amount_tax: amountTax,
      amount_pre: amountPreTax,
      amount_post: amountPostTax,
      paid_date: new Date(date as string).toISOString(),
      user_id: userId,
    },
  });
  return "";
}

export default function enterIncome() {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen items-top justify-center">
      <div className="flex flex-col items-left gap-2">
        <form
          method="POST"
          className="flex flex-col gap-2"
          name="incomeForm"
          action="/enterIncome"
        >
          <b className="w-100">Paid Date</b>
          <input className={textInputCss} name="date" type="date"></input>
          <b>Gross Earnings</b>
          <input
            className={textInputCss}
            name="amountGross"
            type="text"
          ></input>
          <b>Pre-Tax Deductions</b>
          <input
            className={textInputCss}
            name="amountPreTax"
            type="text"
          ></input>
          <b>Taxes</b>
          <input className={textInputCss} name="amountTax" type="text"></input>
          <b>Post-tax Deductions</b>
          <input
            className={textInputCss}
            name="amountPostTax"
            type="text"
          ></input>
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
