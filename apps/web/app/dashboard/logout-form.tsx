import { Button } from "../../components/button";
import { logoutAction } from "../actions/auth";

export function LogoutForm() {
  return (
    <form action={logoutAction}>
      <Button
        className="w-full bg-gray-900 hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-950 dark:hover:bg-gray-200"
        type="submit"
      >
        Odhlásit se
      </Button>
    </form>
  );
}
