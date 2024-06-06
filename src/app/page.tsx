import { Stack, Typography, Box, TextField } from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import "./index.css";

export default function Home() {
  return (
    <body>
      <div className="Top">
        <nav>
          <div className="links">
            <div className="mylogo">
              <Image
                alt="logo2"
                src="/logo2.png"
                width="60"
                height="55"
              ></Image>
            </div>
            <a
              style={{
                textDecoration: "none",
                color: "#fff",
                fontFamily: "Kavoon",
              }}
              href={"/support"}
            >
              <p>Support</p>
            </a>
            <a
              style={{
                textDecoration: "none",
                color: "#fff",
                fontFamily: "Kavoon",
              }}
              href={"/contact-us"}
            >
              <p>Contact Us</p>
            </a>
            <a
              style={{
                textDecoration: "none",
                color: "#fff",
                fontFamily: "Kavoon",
              }}
              href={"/about-us"}
            >
              <p>About Us</p>
            </a>
            <div className="login">
              <a
                style={{
                  textDecoration: "none",
                  color: "#000",
                  fontFamily: "HappyMonkey",
                }}
                href={"/auth/login"}
              >
                <p>Login</p>
              </a>
            </div>
          </div>
        </nav>
      </div>
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
