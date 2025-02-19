import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable, createCookieSessionStorage, redirect } from "@remix-run/node";
import { RemixServer, Outlet, Meta, Links, ScrollRestoration, Scripts, useNavigate, useLoaderData, Form } from "@remix-run/react";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { PrismaClient } from "@prisma/client";
import { zfd } from "zod-form-data";
import { z } from "zod";
const ABORT_DELAY = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, remixContext, loadContext) {
  return isbot(request.headers.get("user-agent") || "") ? handleBotRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  ) : handleBrowserRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  );
}
function handleBotRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(
        RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        }
      ),
      {
        onAllReady() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}
function handleBrowserRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(
        RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        }
      ),
      {
        onShellReady() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest
}, Symbol.toStringTag, { value: "Module" }));
const links = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous"
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
  }
];
function Layout({ children }) {
  return /* @__PURE__ */ jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsxs("head", { children: [
      /* @__PURE__ */ jsx("meta", { charSet: "utf-8" }),
      /* @__PURE__ */ jsx("meta", { name: "viewport", content: "width=device-width, initial-scale=1" }),
      /* @__PURE__ */ jsx(Meta, {}),
      /* @__PURE__ */ jsx(Links, {})
    ] }),
    /* @__PURE__ */ jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsx(ScrollRestoration, {}),
      /* @__PURE__ */ jsx(Scripts, {})
    ] })
  ] });
}
function App() {
  return /* @__PURE__ */ jsx(Outlet, {});
}
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Layout,
  default: App,
  links
}, Symbol.toStringTag, { value: "Module" }));
const textInputCss = "shadow appearance-none border rounded py-2 px-3 text-grey-700 leading-tight focus:outline-none focus:shadow-outline";
const blueButtonCss = "bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded";
const redButtonCss = "bg-orange-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded";
const expenseTableHeaders = ["Date", "Category", "Cost", "Shared"];
var expenseEntryMap = /* @__PURE__ */ new Map([
  ["Date", "date"],
  ["Cost", "amount"],
  ["Category", "category"],
  ["Description", "description"],
  ["Payment Used", "payment_method"]
]);
var expenseInputTypeMap = /* @__PURE__ */ new Map([
  ["Date", "date"],
  ["Cost", "number"],
  ["Category", "text"],
  ["Description", "text"],
  ["Payment Used", "number"]
]);
const incomeTableHeaders = ["Date", "Gross Amount"];
var incomeEntryMap = /* @__PURE__ */ new Map([
  ["Date", "date"],
  ["Gross Earnings", "amount_gross"],
  ["Pre-Tax Deductions", "amount_pre"],
  ["Taxes", "amount_tax"],
  ["Post-Tax Deductions", "amount_post"]
]);
var incomeInputTypeMap = /* @__PURE__ */ new Map([
  ["Date", "date"],
  ["Gross Earnings", "number"],
  ["Pre-Tax Deductions", "number"],
  ["Taxes", "number"],
  ["Post-Tax Deductions", "number"]
]);
function FormInput$2(props) {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("label", { children: props.label }),
    /* @__PURE__ */ jsx(
      "input",
      {
        min: "0",
        max: "99999",
        step: "0.01",
        className: textInputCss,
        name: props.nameMap.get(props.label),
        type: props.inputTypeMap.get(props.label),
        required: true
      }
    )
  ] });
}
function enterRecurringExpense() {
  useNavigate();
  let labels = [];
  for (let label of expenseEntryMap.keys()) {
    labels.push(label);
  }
  return /* @__PURE__ */ jsx("div", { className: "flex h-screen items-top justify-center", children: /* @__PURE__ */ jsx("div", { className: "flex flex-col gap-2 w-[200px]", children: /* @__PURE__ */ jsxs(
    "form",
    {
      method: "POST",
      className: "flex flex-col gap-2",
      name: "recurringExpenseForm",
      action: "/enterRecurring/expense",
      children: [
        /* @__PURE__ */ jsx("b", { className: "text-xl mt-6", children: "Add Recurring Expense" }),
        labels.map((label) => /* @__PURE__ */ jsx(
          FormInput$2,
          {
            label,
            nameMap: expenseEntryMap,
            inputTypeMap: expenseInputTypeMap
          }
        ))
      ]
    }
  ) }) });
}
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: enterRecurringExpense
}, Symbol.toStringTag, { value: "Module" }));
function enterRecurringIncome() {
  return /* @__PURE__ */ jsx("div", { className: "flex h-screen items-top justify-center", children: /* @__PURE__ */ jsx("div", { className: "flex flex-col gap-2 w-[200px]", children: /* @__PURE__ */ jsx(
    "form",
    {
      method: "POST",
      className: "flex flex-col gap-2",
      name: "recurringIncomeForm",
      action: "/enterRecurring/income"
    }
  ) }) });
}
const route2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: enterRecurringIncome
}, Symbol.toStringTag, { value: "Module" }));
const expenseSchema = zfd.formData({
  category: zfd.text(),
  description: zfd.text(),
  amount: zfd.numeric(),
  date: zfd.text(),
  paymentUsed: zfd.numeric(),
  recurring: zfd.text(z.coerce.boolean()),
  shared: zfd.text()
});
async function action$2({ request }) {
  const {
    category,
    description,
    amount,
    date,
    paymentUsed,
    recurring,
    shared
  } = expenseSchema.parse(await request.formData());
  const prisma = new PrismaClient();
  const user_id = 1;
  await prisma.expenses.create({
    data: {
      category,
      description,
      user_id,
      amount,
      date: new Date(date).toISOString(),
      payment_method: paymentUsed,
      recurring,
      shared
    }
  });
  return "";
}
function enterOneTimeExpense() {
  const navigate = useNavigate();
  let labels = [];
  for (let label of expenseEntryMap.keys()) {
    labels.push(label);
  }
  return /* @__PURE__ */ jsx("div", { className: "flex h-screen items-top justify-center", children: /* @__PURE__ */ jsx("div", { className: "flex flex-col items-left gap-16", children: /* @__PURE__ */ jsxs(
    "form",
    {
      method: "POST",
      className: "flex flex-col gap-2",
      name: "expenseForm",
      action: "/enterExpense",
      children: [
        /* @__PURE__ */ jsx("b", { className: "text-xl mt-6", children: "Add One Time Expense" }),
        labels.map((label) => /* @__PURE__ */ jsx(FormInput$1, { label })),
        /* @__PURE__ */ jsx("button", { type: "submit", className: blueButtonCss + " mt-6", children: "Submit" }),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => navigate("../homePage"),
            className: redButtonCss,
            children: "Cancel"
          }
        )
      ]
    }
  ) }) });
}
function FormInput$1(props) {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("label", { children: props.label }),
    /* @__PURE__ */ jsx(
      "input",
      {
        min: "0",
        max: "99999",
        step: "0.01",
        className: textInputCss,
        name: expenseEntryMap.get(props.label),
        type: expenseInputTypeMap.get(props.label),
        required: true
      }
    )
  ] });
}
const route3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  FormInput: FormInput$1,
  action: action$2,
  default: enterOneTimeExpense
}, Symbol.toStringTag, { value: "Module" }));
const incomeSchema = zfd.formData({
  amount_gross: zfd.numeric(),
  amount_tax: zfd.numeric(),
  amount_pre: zfd.numeric(),
  amount_post: zfd.numeric(),
  date: zfd.text()
});
async function action$1({ request }) {
  const { amount_gross, amount_pre, amount_tax, amount_post, date } = incomeSchema.parse(await request.formData());
  const prisma = new PrismaClient();
  const userId = 1;
  await prisma.income.create({
    data: {
      amount_gross,
      amount_tax,
      amount_pre,
      amount_post,
      paid_date: new Date(date).toISOString(),
      user_id: userId
    }
  });
  return "";
}
function enterOneTimeIncome() {
  const navigate = useNavigate();
  let labels = [];
  for (let label of incomeEntryMap.keys()) {
    labels.push(label);
  }
  return /* @__PURE__ */ jsx("div", { className: "flex h-screen items-top justify-center", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2 w-[200px]", children: [
    /* @__PURE__ */ jsxs(
      "form",
      {
        method: "POST",
        className: "flex flex-col gap-2",
        name: "oneTimeIncomeForm",
        action: "/enterOneTime/income",
        children: [
          /* @__PURE__ */ jsx("b", { className: "text-xl mt-6", children: "Add One-Time Income" }),
          labels.map((label) => /* @__PURE__ */ jsx(FormInput, { label })),
          /* @__PURE__ */ jsx("button", { type: "submit", className: blueButtonCss + " mt-6", children: "Submit" })
        ]
      }
    ),
    /* @__PURE__ */ jsx(
      "button",
      {
        onClick: () => navigate("../homePage"),
        className: redButtonCss,
        children: "Cancel"
      }
    )
  ] }) });
}
function FormInput(props) {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("label", { children: props.label }),
    /* @__PURE__ */ jsx(
      "input",
      {
        min: "0",
        max: "99999",
        step: "0.01",
        className: textInputCss,
        name: incomeEntryMap.get(props.label),
        type: incomeInputTypeMap.get(props.label),
        required: true
      }
    )
  ] });
}
const route4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  FormInput,
  action: action$1,
  default: enterOneTimeIncome
}, Symbol.toStringTag, { value: "Module" }));
function BaseRow(props) {
  let linkAddress = "/view/".concat(
    props.type,
    "/".concat(props.content.id)
  );
  const contentArray = props.type == "expense" ? expenseParser(Object.entries(props.content)) : incomeParser(Object.entries(props.content));
  const navigate = useNavigate();
  return /* @__PURE__ */ jsxs("tr", { children: [
    contentArray.map((data) => /* @__PURE__ */ jsx("td", { className: "text-center", children: data[1] })),
    /* @__PURE__ */ jsx("td", { className: "text-center", children: /* @__PURE__ */ jsx(
      "button",
      {
        onClick: () => navigate(linkAddress),
        className: "bg-gray-700 w-full",
        children: "View"
      }
    ) })
  ] });
}
function expenseParser(contentArray) {
  for (let i = 0; i < contentArray.length; i++) {
    switch (contentArray[i][0]) {
      case "id":
        contentArray.splice(i, 1);
        i--;
        break;
      case "user_id":
      case "recurring":
        contentArray[i][1] = contentArray[i][1] ? "Yes" : "No";
        break;
      case "date":
        contentArray[i][1] = new Date(contentArray[i][1]).toLocaleString(
          "en-us",
          {
            year: "numeric",
            month: "numeric",
            day: "numeric"
          }
        );
        break;
      case "amount":
        contentArray[i][1] = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD"
        }).format(contentArray[i][1]);
        break;
    }
  }
  return contentArray;
}
function incomeParser(contentArray) {
  for (let i = 0; i < contentArray.length; i++) {
    switch (contentArray[i][0]) {
      case "id":
        contentArray.splice(i, 1);
        i--;
        break;
      case "user_id":
      case "paid_date":
        contentArray[i][1] = new Date(contentArray[i][1]).toLocaleString(
          "en-us",
          {
            year: "numeric",
            month: "numeric",
            day: "numeric"
          }
        );
        break;
      case "amount_gross":
      case "amount_post":
      case "amount_pre":
      case "amount_tax":
        contentArray[i][1] = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD"
        }).format(contentArray[i][1]);
        break;
    }
  }
  return contentArray;
}
function BaseTable(props) {
  return /* @__PURE__ */ jsxs("table", { className: "w-[300px]", children: [
    /* @__PURE__ */ jsxs("tr", { children: [
      props.headers.map((header) => /* @__PURE__ */ jsx("th", { className: "align-middle", children: header })),
      /* @__PURE__ */ jsx("th", { className: "text-center", children: "View" })
    ] }),
    props.content.map((content) => /* @__PURE__ */ jsx(BaseRow, { content, type: props.type }, content))
  ] });
}
const loader = async () => {
  const prisma = new PrismaClient();
  const userId = 1;
  const expenses = await prisma.expenses.findMany({
    where: { user_id: userId },
    select: {
      id: true,
      date: true,
      category: true,
      amount: true,
      shared: true
    },
    take: 5
  });
  const income = await prisma.income.findMany({
    where: { user_id: userId },
    select: {
      id: true,
      paid_date: true,
      amount_gross: true
    },
    orderBy: { paid_date: "desc" },
    take: 3
  });
  return [expenses, income];
};
function homePage() {
  const navigate = useNavigate();
  const expenses = useLoaderData()[0];
  const income = useLoaderData()[1];
  return /* @__PURE__ */ jsx("div", { className: "flex h-screen items-top justify-center", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-5 w-[300px]", children: [
    /* @__PURE__ */ jsx("header", { className: "flex mt-5 flex-col items-center gap-9", children: /* @__PURE__ */ jsx("h1", { className: "leading text-2xl font-bold text-gray-800 dark:text-gray-100", children: "MyFinanceApp" }) }),
    /* @__PURE__ */ jsx("h1", { className: "text-xl", children: "Add One-Time" }),
    /* @__PURE__ */ jsxs("div", { className: "h-[44px] space-x-5", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => navigate("/enterOneTime/expense"),
          className: blueButtonCss + " float-left",
          children: "Expense"
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => navigate("/enterOneTime/income"),
          className: blueButtonCss + " float-right",
          children: "Income"
        }
      )
    ] }),
    /* @__PURE__ */ jsx("h1", { className: "text-xl", children: "Add Recurring" }),
    /* @__PURE__ */ jsxs("div", { className: "h-[44px] space-x-5", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => navigate("/enterRecurring/expense"),
          className: blueButtonCss + " float-left",
          children: "Expense"
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => navigate("/enterRecurring/income"),
          className: blueButtonCss + " float-right",
          children: "Income"
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center ", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-xl", children: "Expenses" }),
      /* @__PURE__ */ jsx(
        BaseTable,
        {
          content: expenses,
          headers: expenseTableHeaders,
          type: "expense"
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => navigate("/viewExpenses"),
          className: blueButtonCss + " mt-2",
          children: "View All Expenses"
        }
      ),
      /* @__PURE__ */ jsx("h1", { className: "text-xl mt-4", children: "Income" }),
      /* @__PURE__ */ jsx(
        BaseTable,
        {
          content: income,
          headers: incomeTableHeaders,
          type: "income"
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => navigate("/viewIncome"),
          className: blueButtonCss + " mt-2",
          children: "View All Income"
        }
      )
    ] }),
    /* @__PURE__ */ jsx(
      "button",
      {
        onClick: () => navigate("/"),
        className: redButtonCss + " mt-5",
        children: "Logout"
      }
    )
  ] }) });
}
const route5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: homePage,
  loader
}, Symbol.toStringTag, { value: "Module" }));
const meta = () => {
  return [
    { title: "MyFinances" },
    { name: "description", content: "Welcome to Remix!" }
  ];
};
function Index() {
  const navigate = useNavigate();
  return /* @__PURE__ */ jsx("div", { className: "flex h-screen items-center justify-center", children: /* @__PURE__ */ jsx(
    "button",
    {
      onClick: () => navigate("homePage"),
      className: "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded float-left",
      children: "Login"
    }
  ) });
}
const route6 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Index,
  meta
}, Symbol.toStringTag, { value: "Module" }));
const USER_SESSION_KEY = "userId";
const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "__session",
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    secrets: ["process.env.SESSION_SECRET"],
    secure: process.env.NODE_ENV === "production"
  }
});
async function getSession(request) {
  const cookie = request.headers.get("Cookie");
  return sessionStorage.getSession(cookie);
}
async function createUserSession({
  request,
  userId
}) {
  const session = await getSession(request);
  session.set(USER_SESSION_KEY, userId);
  return redirect("/", {
    headers: {
      "Set-Cookie": await sessionStorage.commitSession(session, {
        maxAge: 60 * 60 * 24 * 7
        // 7 days,
      })
    }
  });
}
function verifyLogin(email, password) {
  var result = { id: 1 };
  return result;
}
async function action({ request }) {
  const formData = await request.formData();
  formData.get("email");
  formData.get("password");
  const user = await verifyLogin();
  return createUserSession({
    request,
    userId: user.id
  });
}
function LoginPage() {
  return /* @__PURE__ */ jsxs(Form, { method: "post", children: [
    /* @__PURE__ */ jsx("label", { htmlFor: "email", children: "Email address" }),
    /* @__PURE__ */ jsx(
      "input",
      {
        id: "email",
        required: true,
        name: "email",
        type: "email",
        autoComplete: "email"
      }
    ),
    /* @__PURE__ */ jsx("label", { htmlFor: "password", children: "Password" }),
    /* @__PURE__ */ jsx(
      "input",
      {
        id: "password",
        name: "password",
        type: "password",
        autoComplete: "current-password"
      }
    ),
    /* @__PURE__ */ jsx("button", { type: "submit", children: "Log in" })
  ] });
}
const route7 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action,
  default: LoginPage
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-BMPSNI6X.js", "imports": ["/assets/jsx-runtime-56DGgGmo.js", "/assets/components-EurMw082.js", "/assets/index-C1cPRAqT.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/root-B3UQFTW8.js", "imports": ["/assets/jsx-runtime-56DGgGmo.js", "/assets/components-EurMw082.js", "/assets/index-C1cPRAqT.js"], "css": ["/assets/root-Dx5MHpWB.css"] }, "routes/enterRecurring.expense": { "id": "routes/enterRecurring.expense", "parentId": "root", "path": "enterRecurring/expense", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/enterRecurring.expense-ChG7xJ0y.js", "imports": ["/assets/jsx-runtime-56DGgGmo.js", "/assets/constants-CiydV2gG.js", "/assets/index-C1cPRAqT.js"], "css": [] }, "routes/enterRecurring.income": { "id": "routes/enterRecurring.income", "parentId": "root", "path": "enterRecurring/income", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/enterRecurring.income-D7nEyohl.js", "imports": ["/assets/jsx-runtime-56DGgGmo.js"], "css": [] }, "routes/enterOneTime.expense": { "id": "routes/enterOneTime.expense", "parentId": "root", "path": "enterOneTime/expense", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/enterOneTime.expense-BBbzfl7n.js", "imports": ["/assets/jsx-runtime-56DGgGmo.js", "/assets/constants-CiydV2gG.js", "/assets/index-C1cPRAqT.js"], "css": [] }, "routes/enterOneTime.income": { "id": "routes/enterOneTime.income", "parentId": "root", "path": "enterOneTime/income", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/enterOneTime.income-D1WFBA2H.js", "imports": ["/assets/jsx-runtime-56DGgGmo.js", "/assets/constants-CiydV2gG.js", "/assets/index-C1cPRAqT.js"], "css": [] }, "routes/homePage": { "id": "routes/homePage", "parentId": "root", "path": "homePage", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/homePage-BG8VTQM0.js", "imports": ["/assets/jsx-runtime-56DGgGmo.js", "/assets/constants-CiydV2gG.js", "/assets/index-C1cPRAqT.js", "/assets/components-EurMw082.js"], "css": [] }, "routes/_index": { "id": "routes/_index", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/_index-CeEY-iG1.js", "imports": ["/assets/jsx-runtime-56DGgGmo.js", "/assets/index-C1cPRAqT.js"], "css": [] }, "routes/login": { "id": "routes/login", "parentId": "root", "path": "login", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/login-C_FJT1nn.js", "imports": ["/assets/jsx-runtime-56DGgGmo.js", "/assets/components-EurMw082.js", "/assets/index-C1cPRAqT.js"], "css": [] } }, "url": "/assets/manifest-04183320.js", "version": "04183320" };
const mode = "production";
const assetsBuildDirectory = "build\\client";
const basename = "/";
const future = { "v3_fetcherPersist": false, "v3_relativeSplatPath": false, "v3_throwAbortReason": false, "v3_singleFetch": false, "v3_lazyRouteDiscovery": false, "unstable_optimizeDeps": false };
const isSpaMode = false;
const publicPath = "/";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "routes/enterRecurring.expense": {
    id: "routes/enterRecurring.expense",
    parentId: "root",
    path: "enterRecurring/expense",
    index: void 0,
    caseSensitive: void 0,
    module: route1
  },
  "routes/enterRecurring.income": {
    id: "routes/enterRecurring.income",
    parentId: "root",
    path: "enterRecurring/income",
    index: void 0,
    caseSensitive: void 0,
    module: route2
  },
  "routes/enterOneTime.expense": {
    id: "routes/enterOneTime.expense",
    parentId: "root",
    path: "enterOneTime/expense",
    index: void 0,
    caseSensitive: void 0,
    module: route3
  },
  "routes/enterOneTime.income": {
    id: "routes/enterOneTime.income",
    parentId: "root",
    path: "enterOneTime/income",
    index: void 0,
    caseSensitive: void 0,
    module: route4
  },
  "routes/homePage": {
    id: "routes/homePage",
    parentId: "root",
    path: "homePage",
    index: void 0,
    caseSensitive: void 0,
    module: route5
  },
  "routes/_index": {
    id: "routes/_index",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route6
  },
  "routes/login": {
    id: "routes/login",
    parentId: "root",
    path: "login",
    index: void 0,
    caseSensitive: void 0,
    module: route7
  }
};
export {
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  mode,
  publicPath,
  routes
};
