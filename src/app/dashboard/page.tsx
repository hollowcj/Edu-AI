"use client";
import Image from "next/image";
import { MessageInput } from "@/app/api/messages/route";
import { useAllMessages } from "@/modules/messages/hooks/use-all-messages/use-all-messages";
import { getMessageById } from "@/modules/messages/lib/get-messages-by-id/get-messages-by-id";
import { Box, Stack, Link, Button } from "@mui/material";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import "../index.css";

const emptyMessage: MessageInput = {
  content: "",
};
export default function HomePage() {
  const [nmessage, setMessage] = useState<MessageInput>(emptyMessage);
  const { data, mutate } = useAllMessages();
  const messages = data || [];

  console.log("@@ messages: ", messages);

  return (
    <Box>
      <body className="dashboard-page">
        <div className="dashboard-user-settings">
          <h2 className="dashboard-user-logo"></h2>
          <div className="user-icon">
            <FontAwesomeIcon className="user-itself" icon={faUser} />
          </div>
          <Link href="../chat">Chat</Link>
          <Link href="">Other</Link>
          <div className="gap-filling"></div>
          <div className="gap-filling"></div>
          <div className="gap-filling"></div>
          <div className="gap-filling"></div>
          <div className="gap-filling"></div>
        </div>

        <div className="chatbot">
          {messages.map((n) => (
            <Box key={n.id} width="100%" p={2}>
              <Link
                href={`/dashboard/message/${n.id}`}
                onClick={async (e) => {
                  e.preventDefault();
                  const result = await getMessageById(n.id);
                  console.log("@@result ", result);
                }}
              >
                {n.content}
              </Link>
            </Box>
          ))}
        </div>
        <Stack
          width={500}
          marginTop={-38}
          style={{
            height: 2,
            alignItems: "center",
            justifyContent: "center",
            marginLeft: 450,
            borderRadius: 50,
          }}
        >
          <form
            style={{
              position: "relative",
              width: 500,
              marginTop: 600,
              backgroundColor: "silver",
              borderRadius: 20,
              alignItems: "center",
              justifyContent: "center",
              display: "flex",
            }}
            onSubmit={async (e) => {
              e.preventDefault();
              const response = await fetch("/api/messages", {
                method: "POST",
                body: JSON.stringify(nmessage),
              });
              console.log("response: ", response);
              await mutate();
            }}
          >
            <input
              onChange={(e) =>
                setMessage((prev) => ({ ...prev, content: e.target.value }))
              }
              type="search"
              placeholder="search"
              id="search"
              name="search"
              style={{
                borderRadius: 10,
                width: "95%",
                height: 51,
                border: "none",
                outline: "none",
                alignItems: "bottom",
                justifyContent: "bottom",
                background: "silver",
              }}
            ></input>
          </form>
        </Stack>
      </body>
    </Box>
  );
}
