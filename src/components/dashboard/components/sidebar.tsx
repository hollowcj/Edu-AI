import Image from "next/image";
import { MessageInput } from "@/app/api/messages/route";
import { useAllMessages } from "@/modules/messages/hooks/use-all-messages/use-all-messages";
import { getMessageById } from "@/modules/messages/lib/get-messages-by-id/get-messages-by-id";
import Dashboard from "@/app/dashboard/page";
import Chat from "@/app/chat/page";
import {
  Box,
  Stack,
  Link,
  Button,
  Typography,
  CircularProgress,
  Tooltip,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  SwipeableDrawer,
  Avatar,
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
import { userAgent } from "next/server";
import { useCurrentUser } from "@/modules/user/hook/use-current-user/use-current-user";
import { useSession } from "next-auth/react";
import ListItemButtonHover from "@/components/props/Listitembuttonhover";

export default function Bar() {
  const session = useSession();
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const user = useCurrentUser()?.data;
  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };
  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleSidebar}>
      <List
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-evenly",
        }}
      >
        <ListItem>
          <ListItemIcon
            sx={{
              transition: "background-color 0.3s ease, transform 0.3s ease",
              ":hover": {
                transform: "translateY(-2px) scale(1.25)",
              },
            }}
          >
            <ListItemButton style={{ borderRadius: 50 }}>
              <FontAwesomeIcon
                style={{
                  width: 30,
                  height: 30,
                  color: "#68478D",
                }}
                className="arrow"
                onClick={toggleSidebar}
                icon={faArrowLeft}
              />
            </ListItemButton>
          </ListItemIcon>
        </ListItem>
        <Stack
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ListItem>
            <ListItemIcon>
              <Avatar
                sx={{
                  width: 100,
                  height: 100,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: 2,
                  fontSize: 40,
                  color: "#333333",
                }}
                src=""
              >
                {session.data?.user?.email
                  ? session.data.user.email.charAt(0).toUpperCase()
                  : ""}
              </Avatar>
            </ListItemIcon>
          </ListItem>
        </Stack>
      </List>
      <Divider variant="middle" style={{ backgroundColor: "#68478D" }} />
      <List style={{ fontFamily: "Anta" }}>
        <ListItem>
          <ListItemButtonHover>
            <Link
              href="./"
              style={{
                display: "flex",
                flexDirection: "row",
                textDecoration: "none",
              }}
            >
              <ListItemIcon>
                <FontAwesomeIcon
                  className="icon"
                  style={{ width: 30, height: 30, color: "#808080" }}
                  icon={faHome}
                />
              </ListItemIcon>
              <ListItemText>
                <Typography
                  style={{
                    fontFamily: "IndieFlower",
                    fontSize: 20,
                    color: "#000",
                  }}
                >
                  Home
                </Typography>
              </ListItemText>
            </Link>
          </ListItemButtonHover>
        </ListItem>
        <ListItem>
          <ListItemButtonHover>
            <ListItemIcon>
              <FontAwesomeIcon
                style={{ width: 30, height: 30, color: "#808080" }}
                icon={faUser}
              />
            </ListItemIcon>
            <ListItemText>
              <Typography
                style={{
                  fontFamily: "IndieFlower",
                  fontSize: 20,
                  color: "#000",
                }}
              >
                User
              </Typography>
            </ListItemText>
          </ListItemButtonHover>
        </ListItem>

        <ListItem>
          <ListItemButtonHover>
            <ListItemIcon>
              <FontAwesomeIcon
                style={{ width: 30, height: 30, color: "#808080" }}
                icon={faDashboard}
              />
            </ListItemIcon>
            <ListItemText style={{ fontFamily: "Anta" }}>
              <Typography
                style={{
                  fontFamily: "IndieFlower",
                  fontSize: 20,
                  color: "#000",
                }}
              >
                Dashboard
              </Typography>
            </ListItemText>
          </ListItemButtonHover>
        </ListItem>
        <ListItem>
          <ListItemButtonHover>
            <ListItemIcon>
              <FontAwesomeIcon
                style={{ width: 30, height: 30, color: "#808080" }}
                icon={faMessage}
              />
            </ListItemIcon>
            <ListItemText style={{ fontFamily: "Anta" }}>
              <Typography
                style={{
                  fontFamily: "IndieFlower",
                  fontSize: 20,
                  color: "#000",
                }}
              >
                Messages
              </Typography>
            </ListItemText>
          </ListItemButtonHover>
        </ListItem>
        <ListItem>
          <ListItemButtonHover>
            <ListItemIcon>
              <FontAwesomeIcon
                style={{ width: 30, height: 30, color: "#808080" }}
                icon={faRobot}
              />
            </ListItemIcon>
            <ListItemText style={{ fontFamily: "Anta" }}>
              <Typography
                style={{
                  fontFamily: "IndieFlower",
                  fontSize: 20,
                  color: "#000",
                }}
              >
                Chatbot
              </Typography>
            </ListItemText>
          </ListItemButtonHover>
        </ListItem>
        <ListItem>
          <ListItemButtonHover>
            <ListItemIcon>
              <FontAwesomeIcon
                style={{ width: 30, height: 30, color: "#808080" }}
                icon={faMusic}
              />
            </ListItemIcon>
            <ListItemText style={{ fontFamily: "Anta" }}>
              <Typography
                style={{
                  fontFamily: "IndieFlower",
                  fontSize: 20,
                  color: "#000",
                }}
              >
                Music
              </Typography>
            </ListItemText>
          </ListItemButtonHover>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <body>
      <Stack
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          padding: 5,
          backgroundColor: "#68478D", //#9013FE
          borderColor: "#000",
        }}
      >
        {!isSidebarVisible && (
          <Stack
            sx={{
              transition: "background-color 0.3s ease, transform 0.3s ease",
              ":hover": {
                transform: "translateY(-2px) scale(1.25)",
              },
            }}
          >
            <FontAwesomeIcon
              style={{ color: "#fff", width: 40, height: 40, paddingLeft: 20 }}
              className="slide"
              onClick={toggleSidebar}
              icon={faBars}
            />
          </Stack>
        )}
        <Image
          style={{ zIndex: "999px", position: "relative", right: 0 }}
          draggable="false"
          alt="our logo"
          src="/eduai.png"
          width="130"
          height="100"
        />
      </Stack>

      <SwipeableDrawer
        anchor="left"
        open={isSidebarVisible}
        onClose={() => setIsSidebarVisible(false)}
        onOpen={() => setIsSidebarVisible(true)}
      >
        {DrawerList}
      </SwipeableDrawer>
    </body>
  );
}
