import React from "react";
import { ListItemButton } from "@mui/material";

interface Props {
  children?: React.ReactNode;
}

const ListItemButtonHover: React.FC<Props> = ({ children, ...props }) => (
  <ListItemButton
    {...props}
    style={{ display: "flex", flexDirection: "row", borderRadius: 50 }}
    sx={{
      bgcolor: "#fff",
      color: "#000",
      transition: "background-color 0.3s ease, transform 0.3s ease",
      ":hover": {
        bgcolor: "#68478D",
        color: "#fff",
        transform: "translateY(-2px) scale(1.1)",
      },
    }}
  >
    {children}
  </ListItemButton>
);

export default ListItemButtonHover;
