"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import Pusher from "pusher-js";
import { Button, Stack, TextField } from "@mui/material";
import "@/app/index.css";
import Link from "next/link";
import Image from "next/image";
import send from "../icons/paper-plane-solid.svg";
import home from "../icons/house-solid.svg";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useAllChatMessages } from "@/modules/chat/hooks/use-all-chat-messages/use-all-chat-messages";
import { getAllChatMessages } from "@/modules/chat/lib/get-all-chat-messages/get-all-chat-messages";
import { getServerSession } from "@/modules/auth/lib/get-server-session/get-server-session";
import { GetAllMessagesResponse } from "../api/messages/route";
import { GetAllChatMessagesResponse } from "../api/chat/route";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useCurrentUser } from "@/modules/user/hook/use-current-user/use-current-user";

interface MessageData {
  message: string;
  createdAt: Date;
  username: string;
  email: string;
}

const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
  cluster: "eu",
});

export default function Chat() {
  const session = useSession();
  const [messages, setMessages] = useState<
    GetAllChatMessagesResponse["messages"]
  >([]);
  const [input, setInput] = useState<string>("");
  const router = useRouter();
  const [menuVisible, setMenuVisible] = useState(false);
  const [profiledata, setProfileData] = useState(false);
  const [username, setUsername] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  // const generator = `${Math.floor(Math.random() * 10000)}`;
  const user = useCurrentUser()?.data;

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };
  const changePic = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("image", selectedFile);

    await fetch("/api/pfps", {
      method: "POST",
      body: formData,
    });

    // Handle success or error
  };

  const change = useCallback(
    (e: any) => {
      e.preventDefault();
      fetch("/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username || `user${Math.floor(Math.random() * 2)}`,
        }),
      });
      setUsername("");
    },
    [username],
  );

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const toggleProfile = () => {
    setProfileData(!profiledata);
  };

  const { data: databaseChatMessages } = useAllChatMessages();

  console.log("@@ databaseChatMessages", databaseChatMessages);

  useEffect(() => {
    if (session.status === "unauthenticated") {
      router.push("/auth/login");
    }
  }, [router, session.status]);

  useEffect(() => {
    const channel = pusher.subscribe("chat");

    channel.bind(
      "message",
      (data: GetAllChatMessagesResponse["messages"][number]) => {
        console.log("@@ message: ", data);
        setMessages((prevMessages) => [...prevMessages, data]);
      },
    );

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, []);
  useEffect(() => {
    async function Update() {
      if (!session.data?.user) {
        return;
      }
      const response = await fetch("/api/user");
      const user = await response.json();
      console.log("@@ user: ", user);
      setUsername(user.user.username || "user");
    }
    Update();
  }, [session.data?.user]);

  return (
    <body className="chatpage">
      <div className="chat-home">
        <Link href="./">
          <Image
            draggable="false"
            src={home}
            alt="home-icon"
            width={30}
            height={30}
          />
        </Link>
      </div>
      <main>
        <div className="user-settings">
          <div className="user-icon">
            <FontAwesomeIcon
              className="user-itself"
              icon={faUser}
              onClick={toggleMenu}
            />
          </div>
        </div>
        <div className="chat-chat">
          {menuVisible && (
            <div className="user-menu">
              <div className="user-options">
                <div>
                  <Button className="user-profile" onClick={toggleProfile}>
                    Account
                  </Button>
                </div>
                <div>
                  <Button className="user-display" onClick={toggleProfile}>
                    Display
                  </Button>
                </div>
              </div>
              {profiledata && (
                <div className="user-pages">
                  <div className="user-profile-page">
                    <div className="user-profile-page-picture"></div>
                    <p>
                      Username: <b>{user?.username}</b>
                    </p>
                    <p>
                      E-mail: <b>{session.data?.user?.email}</b>
                    </p>
                  </div>
                  <div className="user-page-profile-picture-upload">
                    <form onSubmit={changePic}>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                      />
                      <button type="submit">Upload</button>
                    </form>
                  </div>
                  <div className="user-page-profile-name-change">
                    <h2>Change Username</h2>
                    <form action="" onSubmit={change}>
                      <TextField
                        label="Change Username"
                        id="change"
                        value={username}
                        onChange={(r) => setUsername(r.target.value)}
                      ></TextField>
                      <Button type="submit" variant="contained" id="clicker">
                        Change
                      </Button>
                    </form>
                  </div>
                </div>
              )}
            </div>
          )}
          <div className="chat-display">
            {[...(databaseChatMessages || []), ...messages].map(
              (message, index) => (
                <p key={index}>
                  <b>
                    {message.owner?.username
                      ? message.owner?.username
                      : session.data?.user?.email}
                  </b>
                  {message.message && session.data?.user?.email && (
                    <span style={{ fontSize: "10px", color: "gray" }}>
                      ({new Date(message.createdAt).toLocaleString()})
                    </span>
                  )}
                  :{message.message}
                </p>
              ),
            )}
          </div>

          <div className="chat-input">
            <input
              className="input"
              placeholder="Message"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              style={{
                borderRadius: 10,
                width: "100%",
                height: 40,
                border: "none",
                outline: "none",
                background: "silver",
                marginBottom: 20,
                alignItems: "center",
                justifyContent: "center",
              }}
            />
            <Button
              className="send"
              onClick={() => {
                fetch("/api/chat", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    message: input,
                    email: session.data?.user?.email || "cjxfs2007@gmail.com",
                    username:
                      username || `user${Math.floor(Math.random() * 2)}`,
                  }),
                });
                setInput("");
              }}
            >
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
