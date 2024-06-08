import { responsiveFontSizes } from "@mui/material";
import { User } from "@prisma/client";

export async function getCurrentUser() {
  const response = await fetch("api/user");
  const user: User = await response.json();
  return user;
}
