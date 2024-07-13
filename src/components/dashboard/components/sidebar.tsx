import Image from "next/image";
import { MessageInput } from "@/app/api/messages/route";
import { useAllMessages } from "@/modules/messages/hooks/use-all-messages/use-all-messages";
import { getMessageById } from "@/modules/messages/lib/get-messages-by-id/get-messages-by-id";
import Dashboard from "@/app/dashboard/page";
import {
  Box,
  Stack,
  Link,
  Button,
  Typography,
  CircularProgress,
  Tooltip,
} from "@mui/material";
import { useState } from "react";
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
import "./bar.css";
import { useRouter } from "next/navigation";

export default function Bar() {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [content, setContent] = useState("EDU-AI");
  const router = useRouter();
  const dash = () => {
    var holder = document.getElementById("holder") as HTMLDivElement;
    holder.style.display = "flex";
    setTimeout(() => {
      router.replace("/dashboard");
    }, 10000);
    setContent("Dashboard");
  };
  const bot = () => {
    var holder = document.getElementById("holder") as HTMLDivElement;
    holder.style.display = "flex";
    setTimeout(() => {
      router.replace("/chatbot");
    }, 10000);
    setContent("Chatbot");
  };
  const chat = () => {
    var holder = document.getElementById("holder") as HTMLDivElement;
    holder.style.display = "flex";
    setTimeout(() => {
      router.replace("/chat");
    }, 10000);
    setContent("Chat");
  };
  const music = () => {
    var holder = document.getElementById("holder") as HTMLDivElement;
    holder.style.display = "flex";
    setTimeout(() => {
      router.replace("/music");
    }, 10000);
    setContent("Music");
  };

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  return (
    //<div className="gap-filling"></div>//
    <Box className="body-box">
      <div className="bar">
        <Image
          draggable="false"
          alt="our logo"
          src="/eduai.png"
          width="130"
          height="100"
        />
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
            <Tooltip title="Home" placement="right">
              <FontAwesomeIcon className="home" icon={faHome} />
            </Tooltip>
          </Link>
          <div className="user-icon">
            <Tooltip title="User" placement="right">
              <FontAwesomeIcon className="user-itself" icon={faUser} />
            </Tooltip>
          </div>
          <Button>
            <Tooltip title="Dashboard" placement="right">
              <FontAwesomeIcon
                className="user-itself"
                onClick={dash}
                icon={faDashboard}
              />
            </Tooltip>
          </Button>
          <Button>
            <Tooltip title="Messages" placement="right">
              <FontAwesomeIcon
                className="user-itself"
                onClick={chat}
                icon={faMessage}
              />
            </Tooltip>
          </Button>
          <Button>
            <Tooltip title="Chatbot" placement="right">
              <FontAwesomeIcon
                className="user-itself"
                icon={faRobot}
                onClick={bot}
              />
            </Tooltip>
          </Button>
          <Button>
            <Tooltip title="Calculator" placement="right">
              <FontAwesomeIcon className="user-itself" icon={faCalculator} />
            </Tooltip>
          </Button>
          <Button>
            <Tooltip title="Music" placement="right">
              <FontAwesomeIcon
                className="user-itself"
                icon={faMusic}
                onClick={music}
              />
            </Tooltip>
          </Button>
        </div>
        <Stack className="holder" id="holder">
          <Stack className="circular">
            <Typography variant="body2" className="loadText">
              Loading...
            </Typography>
            <CircularProgress color="warning" variant="indeterminate" />
          </Stack>
        </Stack>
      </body>
    </Box>
  );
}
