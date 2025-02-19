interface props {
  sillyNumber: number;
}

export default function LeftToSpend({ sillyNumber }: props) {
  return <h1>${sillyNumber}</h1>;
}
