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
          "linear-gradient(rgba(104, 71, 141,0.9),rgba(104, 71, 141,0.9)),url('/login.png')",
      }}
    >
      <form onSubmit={handleSubmit}>
        <Stack
          spacing={7}
          style={{
            backgroundColor: "#fff",
            padding: 50,
            borderRadius: 20,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography style={{ color: "#000" }} variant="h5">
            Sign in to your account
          </Typography>
          <TextField
            label="E-mail"
            style={{
              width: 300,
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
            style={{
              borderRadius: 50,
              width: 200,
            }}
            sx={{
              bgcolor: "#000",
              color: "#fff",
              transition: "background-color 0.3s ease, transform 0.3s ease",
              ":hover": {
                bgcolor: "#fff",
                color: "#000",
                transform: "translateY(-2px) scale(1.25)",
              },
            }}
          >
            Login
          </Button>
        </Stack>
      </form>
    </Box>
  );
}
