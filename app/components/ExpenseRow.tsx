export default function ExpenseRow(props: any) {
  const date = new Date(props.expense.date).toLocaleString("en-us", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });
  const amount = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(props.expense.amount);
  return (
    <tr>
      <td>{date}</td>
      <td>{props.expense.category}</td>
      <td>{amount}</td>
      <td>{props.expense.description}</td>
      <td>{props.expense.shared}</td>
    </tr>
  );
}
