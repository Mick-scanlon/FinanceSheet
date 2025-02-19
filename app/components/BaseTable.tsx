import BaseRow from "./BaseRow";

export default function BaseTable(props: {
  content: object[];
  headers: any[];
  type: string;
}) {
  return props.content == null ? (
    <table className="w-[300px]">
      <tr key="row1">
        {props.headers.map((header) => (
          <th className="align-middle">{header}</th>
        ))}
        <th className="text-center">View</th>
      </tr>
      {props.content.map((content) => (
        <BaseRow content={content} key={content} type={props.type} />
      ))}
    </table>
  ) : (
    <></>
  );
}
