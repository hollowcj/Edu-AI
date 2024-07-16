"use client";
import { MessageInput } from "@/app/api/messages/route";
import { useAllMessages } from "@/modules/messages/hooks/use-all-messages/use-all-messages";
import { getMessageById } from "@/modules/messages/lib/get-messages-by-id/get-messages-by-id";
import { useState } from "react";
import Bar from "@/components/dashboard/components/sidebar";
import "./chat.css";
import Image from "next/image";
import Dashboard from "@/app/dashboard/page";
import {
  Box,
  Stack,
  Link,
  Button,
  Typography,
  CircularProgress,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalculator,
  faDashboard,
  faHome,
  faMessage,
  faMusic,
  faRobot,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";

const emptyMessage: MessageInput = {
  content: "",
};
export default function HomePage() {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const router = useRouter();

  const [nmessage, setMessage] = useState<MessageInput>(emptyMessage);
  const { data, mutate } = useAllMessages();
  const messages = data || [];

  console.log("@@ messages: ", messages);

  return (
    <Stack className="dashboard-page">
      <Bar />

      <div className="display">
        <div className="chatbot">
          {messages.map((n) => (
            <Box key={n.id} width="100%" p={2}>
              <p>{n.content}</p>
            </Box>
          ))}
        </div>
        <div className="search">
          <form
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
              className="searchbar"
              onChange={(e) =>
                setMessage((prev) => ({
                  ...prev,
                  content: e.target.value,
                }))
              }
              type="search"
              placeholder="search"
              id="search"
              name="search"
            />
          </form>
        </div>
      </div>
    </Stack>
  );
}
