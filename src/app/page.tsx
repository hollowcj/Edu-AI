import { Stack, Typography, Box, TextField, Button } from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import "./index.css";

export default function Home() {
  return (
    <body>
      <nav>
        <div className="links">
          <div className="mylogo">
            <Image
              draggable="false"
              alt="logo2"
              src="/logo2.png"
              width="60"
              height="55"
            ></Image>
          </div>
          <a href={"/support"}>
            <p>Support</p>
          </a>
          <a href={"/contact-us"}>
            <p>Contact Us</p>
          </a>
          <a href={"/about-us"}>
            <p>About Us</p>
          </a>
          <div className="login">
            <Button
              style={{
                textDecoration: "none",
                color: "#000",
                fontFamily: "HappyMonkey",
              }}
              href={"/auth/login"}
            >
              Login
            </Button>
          </div>
        </div>
      </nav>
      <div className="main">
        <main>
          <div className="imagineaplace">
            <p>EDU-AI</p>
            <p className="description">...the future of learning</p>
          </div>
        </main>
      </div>
    </body>
  );
}
