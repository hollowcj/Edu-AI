"use client";
import Image from "next/image";
import { MessageInput } from "@/app/api/messages/route";
import { useAllMessages } from "@/modules/messages/hooks/use-all-messages/use-all-messages";
import { getMessageById } from "@/modules/messages/lib/get-messages-by-id/get-messages-by-id";
import { Box, Stack, Link, Button, Typography } from "@mui/material";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalculator,
  faHome,
  faMessage,
  faMusic,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import "./dashboard.css";

const emptyMessage: MessageInput = {
  content: "",
};
export default function HomePage() {
  const [nmessage, setMessage] = useState<MessageInput>(emptyMessage);
  const { data, mutate } = useAllMessages();
  const messages = data || [];
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  console.log("@@ messages: ", messages);

  return (
    //<div className="gap-filling"></div>//
    <Box className="body-box">
      <div className="bar">
        <Typography
          variant="h4"
          style={{
            color: "#fff",
            textAlign: "center",
            fontFamily: "Kalam",
          }}
        >
          Dashboard Page
        </Typography>
      </div>
      <body className="dashboard-page">
        {!isSidebarVisible && (
          <div className="control">
            <FontAwesomeIcon
              className="slide"
              onClick={toggleSidebar}
              icon={faBars}
            />
          </div>
        )}
        <div
          className={`dashboard-user-settings ${
            isSidebarVisible ? "open" : "closed"
          }`}
        >
          <FontAwesomeIcon
            className="arrow"
            onClick={toggleSidebar}
            icon={faArrowLeft}
          />
          <Link href="./">
            <FontAwesomeIcon className="home" icon={faHome} />
          </Link>
          <div className="user-icon">
            <FontAwesomeIcon className="user-itself" icon={faUser} />
          </div>
          <Link href="../chat">
            <FontAwesomeIcon
              className="user-itself"
              onClick={toggleSidebar}
              icon={faMessage}
            />
          </Link>
          <Link href="">
            <FontAwesomeIcon
              className="user-itself"
              onClick={toggleSidebar}
              icon={faCalculator}
            />
          </Link>
          <Link href="">
            <FontAwesomeIcon
              className="user-itself"
              onClick={toggleSidebar}
              icon={faMusic}
            />
          </Link>
        </div>
        <div className="display">
          <div className={`chatbot ${isSidebarVisible ? "reduced-width" : ""}`}>
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
                  setMessage((prev) => ({ ...prev, content: e.target.value }))
                }
                type="search"
                placeholder="search"
                id="search"
                name="search"
              ></input>
            </form>
          </div>
        </div>
      </body>
    </Box>
  );
}
