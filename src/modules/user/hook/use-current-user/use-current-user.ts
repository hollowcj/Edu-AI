import useSWR from "swr";
import { getCurrentUser } from "../../lib/get-current-user/get-current-user";

export function useCurrentUser() {
  return useSWR("/api/user", getCurrentUser);
}
