import ExpenseRow from "./BaseRow";

export default function BaseTable(props: { content: any[]; headers: any[] }) {
  return (
    <table>
      <tr>
        {props.headers.map((header) => (
          <th>{header}</th>
        ))}
      </tr>
      {props.content.map((content) => (
        <ExpenseRow content={content} />
      ))}
    </table>
  );
}
