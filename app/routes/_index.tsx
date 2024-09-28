import type { MetaFunction } from "@remix-run/node";
import { useNavigate } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "MyFinances" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  const navigate = useNavigate();
  return (
    <div className="flex h-screen items-center justify-center">
      <button
        onClick={() => navigate("homePage")}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded float-left"
      >
        Login
      </button>
    </div>
  );
}
