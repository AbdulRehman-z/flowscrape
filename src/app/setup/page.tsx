import { setupUserAction } from "@/actions/setup/setup-user-action";

export default async function Page() {
  return await setupUserAction()
}
