import { Form } from "@remix-run/react";
import { createUserSession } from "../session.server";
import { verifyLogin } from "../models/user.server";
import { ActionFunctionArgs } from "@remix-run/node";

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");

  // Perform form validation
  // For example, check the email is a valid email
  // Return the errors if there are any

  const user = await verifyLogin(email, password);

  // If no user is returned, return the error

  return createUserSession({
    request,
    userId: user.id,
  });
}

export default function LoginPage() {
  return (
    <Form method="post">
      <label htmlFor="email">Email address</label>
      <input
        id="email"
        required
        name="email"
        type="email"
        autoComplete="email"
      />

      <label htmlFor="password">Password</label>
      <input
        id="password"
        name="password"
        type="password"
        autoComplete="current-password"
      />

      <button type="submit">Log in</button>
    </Form>
  );
}
