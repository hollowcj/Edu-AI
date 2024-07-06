import { Typography } from "@mui/material";
import "./home.css";

export function Home() {
  return (
    <div className="main">
      <main>
        <div className="imagineaplace">
          <p>EDU-AI</p>
          <p className="description">...the future of learning</p>
        </div>
      </main>
      <div className="not-supported">
        <Typography variant="h6" style={{ color: "#000" }}>
          Sorry, we don&apos;t support this device.
          <br />
          <Typography variant="body1">
            Use a Laptop or a Tablet instead
          </Typography>
        </Typography>
      </div>
    </div>
  );
}
