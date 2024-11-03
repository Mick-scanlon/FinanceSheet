import ExpenseRow from "./ExpenseRow";

export default function ExpenseTable(props: { expenses: any[] }) {
  console.log(props.expenses);
  return (
    <table>
      <tr>
        <th>Date</th>
        <th>Category</th>
        <th>Cost</th>
        <th>Description</th>
        <th>Shared?</th>
      </tr>
      {props.expenses.map((expense, index) => (
        <ExpenseRow expense={expense} />
      ))}
    </table>
  );
}
