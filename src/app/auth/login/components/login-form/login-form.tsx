"use client";

import { Box, Stack, Typography, TextField, Button } from "@mui/material";
import email from "next-auth/providers/email";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Background from "/public/Background.png";
import Link from "next/link";
import { useState } from "react";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const generateUsername = () => {
    return email.split("@")[0];
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!username) {
      setUsername(generateUsername());
      console.log(username);
    }
    signIn("email", { email: email, username: username });
    setSubmitted(true);
  };
  return (
    <Box
      width="100%"
      minHeight="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      style={{
        backgroundImage:
          "linear-gradient(rgba(0,0,0,0.9),rgba(0,0,0,0.9)),url('/login.png')",
      }}
    >
      <form onSubmit={handleSubmit}>
        <Stack
          spacing={5}
          style={{ backgroundColor: "#0000", padding: 50, borderRadius: 20 }}
        >
          <Typography style={{ color: "#fff" }} variant="h6">
            Sign in to your account
          </Typography>
          <TextField
            label="E-mail"
            style={{
              width: 220,
              color: "#fff",
              backgroundColor: "#fff",
              borderRadius: 10,
            }}
            name="email"
            value={email}
            onChange={(o) => setEmail(o.target.value)}
            required
          ></TextField>
          <Button
            type="submit"
            style={{ backgroundColor: "#fff", color: "#000", borderRadius: 50 }}
          >
            Login
          </Button>
        </Stack>
      </form>
    </Box>
  );
}
