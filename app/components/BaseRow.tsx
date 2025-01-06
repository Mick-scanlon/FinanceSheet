export default function BaseRow(props: { content: any[] }) {
  // content will be in KVPs [id, value]
  const data = props.content.map((content) => {
    var newValue;
    switch (content[0]) {
      case "id":
      case "user_id":
      case "recurring":
        newValue = content[1] ? "Yes" : "No";
        break;
      case "date":
      case "paid_date":
        newValue = new Date(content[1]).toLocaleString("en-us", {
          year: "numeric",
          month: "numeric",
          day: "numeric",
        });
        break;
      case "amount":
        newValue = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(content[1]);
        break;
      default:
        newValue = content[1];
        break;
    }
    return newValue ?? "";
  });

  return (
    <tr>
      {data.map((data) => (
        <td>{data}</td>
      ))}
    </tr>
  );
}
