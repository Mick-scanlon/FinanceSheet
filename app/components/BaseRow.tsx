import { useNavigate } from "@remix-run/react";
import { object } from "zod";
import { ISOToMDY } from "../services/DateTimeService";

export default function BaseRow(props: { content: any[]; type: string }) {
  // Content will be an Object
  // TODO
  // Add explicit object structures
  let linkAddress: string = "/view/".concat(
    props.type,
    //@ts-ignore
    "/".concat(props.content.id)
  );

  const contentArray =
    props.type == "expense"
      ? expenseParser(Object.entries(props.content))
      : incomeParser(Object.entries(props.content));

  const navigate = useNavigate();

  return (
    <tr>
      {contentArray.map((data) => (
        <td className="text-center">{data[1]}</td>
      ))}
      <td className="text-center">
        <button
          onClick={() => navigate(linkAddress)}
          className="bg-gray-700 w-full"
        >
          View
        </button>
      </td>
    </tr>
  );
}

function expenseParser(contentArray: any[]) {
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
        contentArray[i][1] = ISOToMDY(contentArray[i][1]);
        break;
      case "amount":
        contentArray[i][1] = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(contentArray[i][1]);
        break;
      default:
        break;
    }
  }
  return contentArray;
}

function incomeParser(contentArray: any[]) {
  for (let i = 0; i < contentArray.length; i++) {
    switch (contentArray[i][0]) {
      case "id":
        contentArray.splice(i, 1);
        i--;
        break;
      case "user_id":
      case "paid_date":
        contentArray[i][1] = ISOToMDY(contentArray[i][1]);
        break;
      case "amount_gross":
      case "amount_post":
      case "amount_pre":
      case "amount_tax":
        contentArray[i][1] = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(contentArray[i][1]);
        break;
      default:
        break;
    }
  }
  return contentArray;
}
