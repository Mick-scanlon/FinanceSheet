import { PrismaClient } from "@prisma/client";
import { getFirstDayCurrMonth, getFirstDayLastMonth } from "./DateTimeService";
import { getSumExpenses, getSumNetIncome } from "./ExtractValueService";

export const DetermineLeftToSpend = async (): Promise<number> => {
  // need shared percent
  // need estimated recurring and expected
  let result = 0;
  const currMonthExpenses = await getCurrentMonthExpenses();
  const currExpensesTotal = await getSumExpenses(currMonthExpenses);

  const lastMonthIncome = await getLastMonthIncome();
  const lastMonthNetIncome = await getSumNetIncome(lastMonthIncome);
  return lastMonthNetIncome - currExpensesTotal;
};

export const getCurrentMonthExpenses = async () => {
  const prisma = new PrismaClient();
  const userId = 1; // replace with session stuff once implemented
  const firstDayCurrMonth = getFirstDayCurrMonth();

  return await prisma.expenses.findMany({
    where: {
      AND: {
        user_id: userId,
        date: { gte: firstDayCurrMonth },
      },
    },
    select: {
      id: true,
      amount: true,
      date: true,
      category: true,
      description: true,
      user_id: true,
      payment_method: true,
      recurring: true,
      shared: true,
    },
    orderBy: { date: "desc" },
  });
};

export const getCurrentMonthIncome = async () => {
  const prisma = new PrismaClient();
  const userId = 1; // replace with session stuff once implemented
  const firstDayCurrMonth = getFirstDayCurrMonth();

  return await prisma.income.findMany({
    where: {
      AND: {
        user_id: userId,
        paid_date: { gte: firstDayCurrMonth },
      },
    },
    select: {
      id: true,
      user_id: true,
      paid_date: true,
      amount_gross: true,
      amount_post: true,
      amount_pre: true,
      amount_tax: true,
    },
    orderBy: { paid_date: "desc" },
  });
};

export const getLastMonthExpenses = async () => {
  const prisma = new PrismaClient();
  const userId = 1; // replace with session stuff once implemented
  const firstDayCurrMonth = getFirstDayCurrMonth();
  const firstDayLastMonth = getFirstDayLastMonth();

  return await prisma.expenses.findMany({
    where: {
      AND: {
        user_id: userId,
        date: { lt: firstDayCurrMonth, gte: firstDayLastMonth },
      },
    },
    select: {
      id: true,
      amount: true,
      date: true,
      category: true,
      description: true,
      user_id: true,
      payment_method: true,
      recurring: true,
      shared: true,
    },
    orderBy: { date: "desc" },
  });
};

export const getLastMonthIncome = async () => {
  const prisma = new PrismaClient();
  const userId = 1; // replace with session stuff once implemented
  const firstDayCurrMonth = getFirstDayCurrMonth();
  const firstDayLastMonth = getFirstDayLastMonth();

  return await prisma.income.findMany({
    where: {
      AND: {
        user_id: userId,
        paid_date: { lt: firstDayCurrMonth, gte: firstDayLastMonth },
      },
    },
    select: {
      id: true,
      user_id: true,
      paid_date: true,
      amount_gross: true,
      amount_post: true,
      amount_pre: true,
      amount_tax: true,
    },
    orderBy: { paid_date: "desc" },
  });
};
