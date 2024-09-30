import { useNavigate } from "@remix-run/react";
import { redButtonCss, blueButtonCss, textInputCss } from "../constants";

export default function enterExpense() {
  const navigate = useNavigate();
  return (
    <div className="flex h-screen items-top justify-center">
      <div className="flex flex-col items-left gap-16">
        <form className="flex flex-col items-left gap-10" id="expenseForm">
          <label>
            Date
            <input
              className={textInputCss}
              alt="Expense Date"
              id="date"
              type="text"
            ></input>
          </label>
          <label>
            Cost
            <input
              className={textInputCss}
              alt="Expense Date"
              id="cost"
              type="text"
            ></input>
          </label>
          <label>
            Category
            <input
              className={textInputCss}
              alt="Expense Category"
              id="category"
              type="text"
            ></input>
          </label>
          <label>
            Description
            <input
              className={textInputCss}
              alt="Expense Description"
              id="description "
              type="text"
            ></input>
          </label>
          <label>
            Payment Used
            <input
              className=""
              alt="Expense Payment Used"
              id="paymentUsed"
              type="text"
            ></input>
          </label>
          <label>
            Split
            <input
              className=""
              alt="Expense Split"
              id="split"
              type="radio"
            ></input>
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
