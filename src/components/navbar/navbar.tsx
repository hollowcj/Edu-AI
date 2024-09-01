import { Button } from "@mui/material";
import Image from "next/image";
import "./nav.css";

export function Navbar() {
  return (
    <div className="link-container">
      <div className="mylogo">
        <Image
          draggable="false"
          alt="our logo"
          src="/eduai.png"
          width="130"
          height="100"
        />
      </div>
      <div className="links">
        <a href={"/support"}>
          <p>Support</p>
        </a>
        <a href={"/contact-us"}>
          <p>Contact Us</p>
        </a>
        <a href={"/about-us"}>
          <p>About Us</p>
        </a>
      </div>
      <div className="login">
        <Button
          variant="outlined"
          sx={{
            bgcolor: "#fff",
            color: "#000",
            transition: "background-color 0.3s ease, transform 0.3s ease",
            ":hover": {
              bgcolor: "#68478D",
              color: "#fff",
              transform: "translateY(-2px) scale(1.25)",
            },
          }}
          style={{
            borderColor: "#fff",
            textDecoration: "none",
            fontFamily: "HappyMonkey",
            paddingTop: 5,
            paddingBottom: 5,
            paddingLeft: 20,
            paddingRight: 20,
            borderRadius: 50,
          }}
          href={"/auth/login"}
        >
          Login
        </Button>
      </div>
    </div>
  );
}
