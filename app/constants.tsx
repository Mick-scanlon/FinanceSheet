import { zfd } from "zod-form-data";
import { z } from "zod";

export const textInputCss =
  "shadow appearance-none border rounded py-2 px-3 text-grey-700 leading-tight focus:outline-none focus:shadow-outline";

export const blueButtonCss =
  "bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded";

export const redButtonCss =
  "bg-orange-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded";

export const previewExpenseTableHeaders = [
  "Date",
  "Category",
  "Cost",
  "Shared",
];

export var expenseEntryMap = new Map<string, string>([
  ["Date", "date"],
  ["Cost", "amount"],
  ["Category", "category"],
  ["Description", "description"],
  ["Payment Used", "paymentUsed"],
]);

export var expenseInputTypeMap = new Map<string, string>([
  ["Date", "date"],
  ["Cost", "number"],
  ["Category", "text"],
  ["Description", "text"],
  ["Payment Used", "number"],
]);

export const expenseSchema = zfd.formData({
  category: zfd.text(),
  description: zfd.text(),
  amount: zfd.numeric(),
  date: zfd.text(),
  paymentUsed: zfd.numeric(),
  recurring: zfd.text(z.coerce.boolean()),
  shared: zfd.text(),
});

export const previewIncomeTableHeaders = ["Date", "Gross Amount"];

// Label, DB name
export var incomeEntryMap = new Map<string, string>([
  ["Date", "date"],
  ["Gross Earnings", "amount_gross"],
  ["Pre-Tax Deductions", "amount_pre"],
  ["Taxes", "amount_tax"],
  ["Post-Tax Deductions", "amount_post"],
]);

export var incomeInputTypeMap = new Map<string, string>([
  ["Date", "date"],
  ["Gross Earnings", "number"],
  ["Pre-Tax Deductions", "number"],
  ["Taxes", "number"],
  ["Post-Tax Deductions", "number"],
]);
