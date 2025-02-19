import { useNavigate } from "@remix-run/react";
import { blueButtonCss, redButtonCss } from "../constants";

export default function FormFooter() {
  const navigate = useNavigate();

  return (
    <>
      <button type="submit" className={blueButtonCss + " mt-6"}>
        Submit
      </button>
      <button
        type="button"
        onClick={() => navigate("../homePage")}
        className={redButtonCss}
      >
        Cancel/Back
      </button>
    </>
  );
}
