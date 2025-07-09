// src/pages/ResetPasswordSuccess.jsx
import { useEffect, useState } from "react";

export default function ResetPasswordSuccess() {
  const [message, setMessage] = useState("Processing...");

  useEffect(() => {
    setTimeout(() => {
      setMessage("✅ Your password has been reset successfully. You can now log in.");
    }, 2000);
  }, []);

  return (
    <div style={styles.container}>
      <h2>Password Reset</h2>
      <p>{message}</p>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "400px",
    margin: "100px auto",
    textAlign: "center",
    fontFamily: "Arial, sans-serif",
  },
};
