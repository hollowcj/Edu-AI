"use client";

import React, { useEffect, useState } from "react";
import Pusher from "pusher-js";
import { Button, Stack } from "@mui/material";
import "@/app/index.css";
import Link from "next/link";
import Image from "next/image";
import send from "../icons/paper-plane-solid.svg";

interface MessageData {
  message: string;
  timestamp: Date;
}

const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
  cluster: "eu",
});

export default function Chat() {
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState<string>("");

  useEffect(() => {
    const channel = pusher.subscribe("chat");

    channel.bind("message", (data: MessageData) => {
      console.log("@@ message: ", data);
      const messageWithTimestamp = {
        ...data,
        timestamp: data.timestamp || new Date(),
      };
      setMessages((prevMessages) => [...prevMessages, messageWithTimestamp]);
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, []);

  return (
    <body className="chatpage">
      <main>
        <div className="chat-chat">
          <div className="chat-input">
            {messages.map((message, index) => (
              <p key={index}>
                {message.message}{" "}
                <span style={{ fontSize: "0.8em", color: "gray" }}>
                  ({message.timestamp.toLocaleString()})
                </span>
              </p>
            ))}
            <input
              className="input"
              placeholder="Message"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              style={{
                borderRadius: 10,
                width: "100%",
                height: 51,
                border: "none",
                outline: "none",
                alignItems: "bottom",
                justifyContent: "bottom",
                background: "silver",
              }}
            />
            <Button
              className="send"
              onClick={() => {
                fetch("/api/chat", {
                  method: "POST",
                  body: JSON.stringify({
                    message: input,
                  }),
                });
                setInput("");
              }}
            >
              {" "}
              <Image
                draggable="false"
                alt="send"
                src={send}
                width={20}
                height={20}
              ></Image>
            </Button>
          </div>
        </div>
      </main>
    </body>
  );
}
