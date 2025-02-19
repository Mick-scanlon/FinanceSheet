import { textInputCss } from "../constants";

export default function FormInput(props: {
  label: string;
  inputTypeMap: Map<string, string>;
  nameMap: Map<string, string>;
}) {
  return (
    <>
      <label>{props.label}</label>
      <input
        min="0"
        max="99999"
        step="0.01"
        className={textInputCss}
        name={props.nameMap.get(props.label)}
        type={props.inputTypeMap.get(props.label)}
        required
      ></input>
    </>
  );
}
