"use client";
import { Box, Stack, Typography } from "@mui/material";
import Bar from "@/components/dashboard/components/sidebar";
import { useSession } from "next-auth/react";

export default function Dashboard() {
  const session = useSession();
  return (
    <Box>
      <Bar />
      <Stack
        style={{
          display: "flex",
          position: "absolute",
          right: 100,
          top: 200,
          textAlign: "center",
        }}
      >
        <Typography variant="h3" style={{ fontFamily: "IndieFlower" }}>
          Hi!
          <Typography style={{ fontSize: 30, fontFamily: "Anta" }}>
            {session.data?.user?.email}
          </Typography>
        </Typography>
      </Stack>
      <Stack
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {" "}
        <Typography
          sx={{
            fontFamily: "IndieFlower",
            fontSize: 40,
            color: "#000",
            textAlign: "center",
            gap: 5,
          }}
        >
          {new Date().getHours()}:{new Date().getMinutes()}
          <br />
          {new Date().getDate()}{" "}
          {new Date().toLocaleString("default", { month: "long" })}{" "}
          {new Date().getFullYear()}
        </Typography>
      </Stack>
    </Box>
  );
}
