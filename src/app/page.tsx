"use client";
import { Stack, Typography, Box, TextField, Button } from "@mui/material";
import { Home } from "../components/home/home";
import { Navbar } from "../components/navbar/navbar";

export default function Homepage() {
  return (
    <Stack direction="column">
      <Navbar />
      <Home />
    </Stack>
  );
}
